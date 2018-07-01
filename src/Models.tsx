import * as _ from "lodash";
import { AsyncStorage } from "react-native";
import { v4 } from "uuid";
import { GoogleSync } from "./Sync";
import {
  CategoryDefault,
  ICategory,
  ICategoryInput,
  ICollection,
  ILogin,
  ITransaction,
  ITransactionInput,
  ITransfert,
  ITransfertInput,
  IWallet,
  IWalletInput,
  TransactionDefault,
  TransfertDefault,
  WalletDefault,
} from "./Types";

export function CleanAll(): Promise<void> {
  return AsyncStorage.getAllKeys().then((keys) =>
    Promise.all(keys.map((key) => AsyncStorage.removeItem(key))),
  ).then(() => { });
}

function autoSync() {
  AsyncStorage.getItem("autosync").then((value) => {
    console.log("autosync?", value);
    if (value) {
      GoogleSync();
    }
  }).catch(() => { });
}

export async function GetWallets(): Promise<IWallet[]> {
  return AsyncStorage.getItem("wallets").then((raw) => {
    const result: IWallet[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.map(WalletDefault);
  });
}

export async function CreateWallet(input: IWalletInput): Promise<IWallet[]> {
  return GetWallets().then((wallets) => wallets.concat([{
    UUID: v4(),
    TotalPerYear: [],
    LastUpdate: new Date(),

    // Inputs
    Name: input.Name,
    Description: input.Description,
    Currency: input.Currency,
    Icon: input.Icon,
  }]),
  ).then(SaveWallets);
}

export async function SaveWallets(wallets: IWallet[]): Promise<IWallet[]> {
  return AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets);
}

export async function UpdateWallet(walletUUID: string, input: IWalletInput): Promise<IWallet[]> {
  return GetWallets().then((wallets) => {
    const wallet = wallets.find((w) => w.UUID === walletUUID);
    if (!wallet) {
      throw new Error(("fail to find wallet"));
    }
    Object.assign(wallet, {
      Name: input.Name,
      Description: input.Description,
      Currency: input.Currency,
      Icon: input.Icon,
      LastUpdate: new Date(),
    });
    return wallets;
  },
  ).then(SaveWallets);
}

export async function DeleteWallet(walletUUID: string): Promise<IWallet[]> {
  return GetAllTransactions()
    .then((transactions) => ([
      transactions.filter((t) => t.WalletUUID !== walletUUID),
      transactions.filter((t) => t.WalletUUID === walletUUID),
    ]))
    .then(([toKeep, toDelete]) => SaveTransactions(toKeep).then(() => toDelete))
    .then((toDelete) =>
      GetAllDeleted().then((deleted) =>
        deleted.concat(toDelete.map((t): ICollection => ({ UUID: t.UUID, LastUpdate: t.LastUpdate }))),
      ),
  )
    .then(SaveDeleted)
    .then(() => GetTransferts())
    .then((transactions) => ([
      transactions.filter((t) => t.From.WalletUUID !== walletUUID && t.To.WalletUUID !== walletUUID),
      transactions.filter((t) => t.From.WalletUUID === walletUUID || t.To.WalletUUID === walletUUID),
    ]))
    .then(([toKeep, toDelete]) => SaveTransferts(toKeep).then(() => toDelete))
    .then((toDelete) =>
      GetAllDeleted().then((deleted) =>
        deleted.concat(toDelete.map((t): ICollection => ({ UUID: t.UUID, LastUpdate: t.LastUpdate }))),
      ),
  )
    .then(SaveDeleted)
    .then(() => GetWallets())
    .then((walletsBefore) => walletsBefore.filter((w) => w.UUID !== walletUUID))
    .then(SaveWallets)
    .then((w) => markAsDeleted(walletUUID).then(() => w));
}

export async function GetAllDeleted(): Promise<ICollection[]> {
  return AsyncStorage.getItem("deleted").then((raw: string) => {
    const result: ICollection[] | null = JSON.parse(raw);
    return (result && result.map((d) => ({ ...d, LastUpdate: new Date(d.LastUpdate) })).filter((d) => d.UUID)) || [];
  });
}

async function markAsDeleted(uuid: string): Promise<ICollection[]> {
  return GetAllDeleted()
    .then((deleted) => deleted.concat({ UUID: uuid, LastUpdate: new Date() }))
    .then(SaveDeleted);
}

export async function SaveDeleted(deleted: ICollection[]): Promise<ICollection[]> {
  console.log("save deleted", deleted);
  return AsyncStorage.setItem("deleted", JSON.stringify(deleted)).then(() => deleted);
}

export async function CleanDeleted(): Promise<ICollection[]> {
  const now = new Date();
  return GetAllDeleted().then((deleted) =>
    deleted.filter((d) => d.LastUpdate > new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())),
  ).then(SaveDeleted);
}

export async function CreateTransaction(...inputs: ITransactionInput[]): Promise<ITransaction[]> {
  return GetAllTransactions().then((transactions): ITransaction[] =>
    transactions.concat(inputs.map((input): ITransaction => ({
      UUID: v4(),
      LastUpdate: new Date(),

      // Inputs
      Beneficiary: input.Beneficiary,
      CategoryUUID: input.CategoryUUID,
      Date: input.Date,
      Comment: input.Comment,
      Price: input.Price,
      WalletUUID: input.WalletUUID,
    }))),
  ).then((transactions) =>
    SaveTransactions(transactions)
      .then(() => {
        const mapWalletYear: { [key: string]: { [key: number]: boolean } } = {};
        let promise: Promise<void> = Promise.resolve();
        inputs.forEach((t) => {
          if (!mapWalletYear[t.WalletUUID]) {
            mapWalletYear[t.WalletUUID] = {};
          }
          const year = new Date(t.Date).getFullYear();
          if (!mapWalletYear[t.WalletUUID][year]) {
            promise = promise.then(() => RefreshTotalWallet(t.WalletUUID, year));
          }
          mapWalletYear[t.WalletUUID][year] = true;
        });
        return promise;
      })
      .then(() => transactions),
  ).then((result) => autoSync() || result);
}

export async function CreateTransfert(...inputs: ITransfertInput[]): Promise<ITransfert[]> {
  return GetTransferts().then((transactions): ITransfert[] =>
    transactions.concat(inputs.map((input): ITransfert => ({
      UUID: v4(),
      LastUpdate: new Date(),

      // Inputs
      Date: input.Date,
      Comment: input.Comment || "",
      From: input.From,
      To: input.To,
    }))),
  ).then((transactions) =>
    SaveTransferts(transactions)
      .then(() => {
        const mapWalletYear: { [key: string]: { [key: number]: boolean } } = {};
        let promise: Promise<void> = Promise.resolve();
        transactions.forEach((t) => {
          if (!mapWalletYear[t.From.WalletUUID]) {
            mapWalletYear[t.From.WalletUUID] = {};
          }
          if (!mapWalletYear[t.To.WalletUUID]) {
            mapWalletYear[t.To.WalletUUID] = {};
          }
          const year = new Date(t.Date).getFullYear();
          if (!mapWalletYear[t.From.WalletUUID][year]) {
            promise = promise.then(() => RefreshTotalWallet(t.From.WalletUUID, year));
          }
          if (!mapWalletYear[t.To.WalletUUID][year]) {
            promise = promise.then(() => RefreshTotalWallet(t.To.WalletUUID, year));
          }
          mapWalletYear[t.From.WalletUUID][year] = true;
          mapWalletYear[t.To.WalletUUID][year] = true;
        });
        return promise;
      })
      .then(() => transactions),
  ).then((result) => autoSync() || result);
}
export async function SaveTransferts(transactions: ITransfert[]): Promise<ITransfert[]> {
  return AsyncStorage.setItem("transfert", JSON.stringify(
    transactions.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()),
  )).then(() => transactions);
}
export async function SaveTransactions(transactions: ITransaction[]): Promise<ITransaction[]> {
  return AsyncStorage.setItem("transactions", JSON.stringify(
    transactions.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()),
  )).then(() => transactions);
}
export async function UpdateTransaction(transactionUUID: string, input: ITransactionInput): Promise<ITransaction[]> {
  return GetAllTransactions().then((transactions) => {
    const transaction = transactions.find((t) => t.UUID === transactionUUID);
    if (!transaction) {
      throw new Error(("transaction not found"));
    }
    const old = { ...transaction };
    Object.assign(transaction, {
      Beneficiary: input.Beneficiary,
      CategoryUUID: input.CategoryUUID,
      Date: input.Date,
      Comment: input.Comment,
      Price: input.Price,
      WalletUUID: input.WalletUUID,
      LastUpdate: new Date(),
    });
    console.log("refresh wallet with date", input.Date.getFullYear(), new Date(old.Date).getFullYear());
    return AsyncStorage.setItem("transactions", JSON.stringify(transactions))
      .then(() => RefreshTotalWallet(input.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions);
  },
  ).then((result) => autoSync() || result);
}

export async function UpdateTransfert(transactionUUID: string, input: ITransfertInput): Promise<ITransfert[]> {
  return GetTransferts().then((transactions) => {
    const transaction = transactions.find((t) => t.UUID === transactionUUID);
    if (!transaction) {
      throw new Error(("transaction not found"));
    }
    const old: ITransfert = { ...transaction, To: { ...transaction.To }, From: { ...transaction.From } };
    Object.assign(transaction, {
      Date: input.Date,
      Comment: input.Comment,
      To: { ...input.To },
      From: { ...input.From },
      LastUpdate: new Date(),
    });
    return SaveTransferts(transactions)
      .then(() => RefreshTotalWallet(input.To.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(input.From.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(old.To.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => RefreshTotalWallet(old.From.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions);
  },
  ).then((result) => autoSync() || result);
}

export async function DeleteTransaction(transactionUUID: string): Promise<ITransaction[]> {
  return GetAllTransactions().then((transactions) => {
    const transaction = transactions.find((t) => t.UUID === transactionUUID);
    if (!transaction) {
      return transactions;
    }
    const old: ITransaction = transaction;
    transactions = transactions.filter((t) => t.UUID !== transactionUUID);
    return SaveTransactions(transactions)
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
      .then((tr: ITransaction[]) => markAsDeleted(transactionUUID).then(() => tr));
  },
  ).then((result) => autoSync() || result);
}

export async function DeleteTransfert(transactionUUID: string): Promise<ITransfert[]> {
  return GetTransferts().then((transactions) => {
    const transaction = transactions.find((t) => t.UUID === transactionUUID);
    if (!transaction) {
      return transactions;
    }
    const old: ITransfert = transaction;
    transactions = transactions.filter((t) => t.UUID !== transactionUUID);
    return SaveTransferts(transactions)
      .then(() => RefreshTotalWallet(old.From.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => RefreshTotalWallet(old.To.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
      .then((tr: ITransfert[]) => markAsDeleted(transactionUUID).then(() => tr));
  },
  ).then((result) => autoSync() || result);
}

async function RefreshTotalWallet(walletUUID: string, year: number): Promise<void> {
  return GetAllTransactions(walletUUID).then((transactions) =>
    GetTransferts(walletUUID).then((transfert) => {
      return GetWallets().then((wallets) => {
        const wallet = wallets.find((w) => w.UUID === walletUUID);
        if (!wallet) {
          return;
        }
        calculateTotal(wallet, transactions, transfert, year);
        console.log("refresh total wallet", wallet.TotalPerYear.find((t) => t.Year === year), walletUUID, wallet, year);
        return AsyncStorage.setItem("wallets", JSON.stringify(wallets));
      });
    }),
  );
}

function calculateTotal(
  wallet: IWallet,
  inputTransactions: ITransaction[],
  transfert: ITransfert[],
  year: number,
): IWallet {
  const transactions = inputTransactions.filter((t) =>
    t.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year,
  );
  const transfertsIn = transfert.filter((t) =>
    t.To.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year,
  );
  const transfertsOut = transfert.filter((t) =>
    t.From.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year,
  );
  let total = wallet.TotalPerYear.find((y) => y.Year === year);
  if (!total) {
    total = { Year: year, Total: 0 };
    wallet.TotalPerYear.push(total);
  }
  total.Total = transactions.reduce((agg, transaction) => agg + transaction.Price, 0);
  total.Total += transfertsIn.reduce((agg, transaction) => agg + transaction.To.Price, 0);
  total.Total -= transfertsOut.reduce((agg, transaction) => agg + transaction.From.Price, 0);
  wallet.LastUpdate = new Date();
  return wallet;
}

export async function RefreshAllTotalWallet(transactions: ITransaction[], transfert: ITransfert[]): Promise<IWallet[]> {
  return GetWallets().then((wallets) => {
    wallets.forEach((w) => w.TotalPerYear.forEach((y) =>
      calculateTotal(w, transactions, transfert, y.Year)));
    return SaveWallets(wallets);
  });
}

export async function GetAllTransactions(...walletUUIDs: string[]): Promise<ITransaction[]> {
  return AsyncStorage.getItem("transactions").then((raw) => {
    const result: ITransaction[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.filter((t) =>
      !walletUUIDs.length || walletUUIDs.find((e) => e === t.WalletUUID),
    ).map(TransactionDefault);
  });
}

export async function GetTransaction(transactionUUID: string): Promise<ITransaction> {
  return GetAllTransactions()
    .then((transactions) => transactions.find((t) => t.UUID === transactionUUID))
    .then((transaction) => {
      if (!transaction) {
        throw new Error(("transaction not found"));
      } else {
        return transaction;
      }
    });
}

export async function GetTransferts(...walletUUIDs: string[]): Promise<ITransfert[]> {
  return AsyncStorage.getItem("transfert").then((raw) => {
    const result: ITransfert[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.filter((t) =>
      !walletUUIDs.length || walletUUIDs.find((e) => e === t.From.WalletUUID || e === t.To.WalletUUID),
    ).map(TransfertDefault);
  });
}

export async function GetTransfert(UUID: string): Promise<ITransfert> {
  return GetTransferts()
    .then((list) => list.find((t) => t.UUID === UUID))
    .then((t) => {
      if (!t) {
        throw new Error(("transaction not found"));
      } else {
        return t;
      }
    });
}

export async function GetWallet(walletUUID: string): Promise<IWallet> {
  return GetWallets().then((wallets) => {
    console.log("wallets", wallets, walletUUID);
    return wallets.find((w) => w.UUID === walletUUID);
  })
    .then((w) => {
      if (!w) {
        throw new Error("fail to get wallet");
      } else {
        return w;
      }
    });
}

export async function GetCategories(): Promise<ICategory[]> {
  return AsyncStorage.getItem("categories").then((raw) => {
    const result: ICategory[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.map(CategoryDefault);
  });
}

export async function UpdateCategory(categoryUUID: string, input: ICategoryInput): Promise<ICategory[]> {
  return GetCategories().then((categories) => {
    const result = categories.find((c) => c.UUID === categoryUUID);
    if (!result) {
      throw new Error(("Category not found"));
    }
    Object.assign(result, input);
    result.LastUpdate = new Date();
    return SaveCategories(categories);
  });
}

export async function GetCategory(categoryUUID: string): Promise<ICategory> {
  return GetCategories().then((categories) => {
    const result = categories.find((c) => c.UUID === categoryUUID);
    if (!result) {
      throw new Error(("Category not found"));
    }
    return result;
  });
}

export async function CreateCategory(...categories: ICategoryInput[]): Promise<ICategory[]> {
  return GetCategories().then((result) => result.concat(
    // Remove already exists
    categories.filter((c) => !result.find((r) => r.Name === c.Name))
      .map((categoryInput) => ({
        UUID: v4(),
        LastUpdate: new Date(),

        Name: categoryInput.Name,
        Icon: categoryInput.Icon,
        ParentCategoryUUID: categoryInput.ParentCategoryUUID,
      })),
  ))
    .then(SaveCategories);
}

export async function DeleteCategory(categoryUUID: string): Promise<ICategory[]> {
  return GetCategories().then((categories) => {
    const category = categories.find((t) => t.UUID === categoryUUID);
    if (!category) {
      return categories;
    }
    categories = categories.filter((t) => t.UUID !== categoryUUID);
    return SaveCategories(categories)
      .then(() => markAsDeleted(categoryUUID))
      .then(() => categories);
  },
  );
}

export async function SaveCategories(categories: ICategory[]): Promise<ICategory[]> {
  return AsyncStorage.setItem("categories", JSON.stringify(_.sortBy(categories, "Name"))).then(() => categories);
}

export async function GetLogin(): Promise<ILogin> {
  return AsyncStorage.getItem("login").then((raw) => {
    const result: ILogin | null = JSON.parse(raw);
    if (!result) {
      throw new Error(("login not found"));
    }
    result.expires = new Date(result.expires);
    return result;
  });
}

export async function SaveLogin(login: ILogin): Promise<ILogin> {
  return AsyncStorage.setItem("login", JSON.stringify(login)).then(() => login);
}
