import {AsyncStorage} from "react-native"
import {Transaction, TransactionInput, TransactionDefault, Wallet, WalletInput, WalletDefault, Category, CategoryDefault} from "./Types"
import {v4} from "uuid";

export async function GetWallets():Promise<Wallet[]> {
    return AsyncStorage.getItem("wallets").then(raw => {
      let result: Wallet[] | null = JSON.parse(raw);
      if (!result) {
        return [];
      }
      return result.map(WalletDefault);
    });
}

export async function CreateWallet(input : WalletInput):Promise<Wallet[]> {
    return GetWallets().then(wallets => wallets.concat([{
      UUID: v4(),
      TotalPerYear: [],
      LastUpdate: new Date(),

      // Inputs
      Name : input.Name,
      Description: input.Description,
      Currency: input.Currency,
      Icon: input.Icon,
    }])
  ).then((wallets) =>
      AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets)
  )
}

export async function UpdateWallet(walletUUID : string, input : WalletInput):Promise<Wallet[]> {
    return GetWallets().then(wallets => {
      const wallet = wallets.find(w => w.UUID === walletUUID);
      if (!wallet) {
        throw("fail to find wallet");
      }
      Object.assign(wallet, {
          Name : input.Name,
          Description: input.Description,
          Currency: input.Currency,
          Icon: input.Icon,
      });
      return wallets;
    }
  ).then((wallets) =>
      AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets)
  )
}

export async function DeleteWallet(walletUUID : string):Promise<Wallet[]> {
    return GetAllTransactions()
    .then(transactions => transactions.filter(t => t.WalletUUID === walletUUID))
    .then(transactions => AsyncStorage.setItem("transactions", JSON.stringify(transactions)))
    .then(() => GetWallets())
    .then(walletsBefore => walletsBefore.filter(w => w.UUID !== walletUUID))
    .then((wallets) =>
      AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets)
    )
}

export async function CreateTransaction(input : TransactionInput):Promise<Transaction[]> {
    return GetAllTransactions().then(transactions => transactions.concat([{
      UUID: v4(),
      LastUpdate: new Date(),

      // Inputs
      Beneficiary : input.Beneficiary,
      CategoryUUID : input.CategoryUUID,
      Date : input.Date,
      Comment : input.Comment,
      Price : input.Price,
      WalletUUID: input.WalletUUID,
    }])
  ).then((transactions) =>
        AsyncStorage.setItem("transactions", JSON.stringify(transactions))
        .then(() => RefreshTotalWallet(input.WalletUUID, input.Date.getFullYear()))
        .then(() => transactions)
  )
}

export async function UpdateTransaction(transactionUUID : string, input : TransactionInput):Promise<Transaction[]> {
    return GetAllTransactions().then(transactions => {
      let transaction = transactions.find(t => t.UUID === transactionUUID)
      if (!transaction) {
        throw("transaction not found");
      }
      let old = {...transaction}
      Object.assign(transaction, {
        Beneficiary : input.Beneficiary,
        CategoryUUID : input.CategoryUUID,
        Date : input.Date,
        Comment : input.Comment,
        Price : input.Price,
        WalletUUID: input.WalletUUID,
      });
      return AsyncStorage.setItem("transactions", JSON.stringify(transactions))
      .then(() => RefreshTotalWallet(input.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
    }
  )
}

export async function DeleteTransaction(transactionUUID : string):Promise<Transaction[]> {
    return GetAllTransactions().then(transactions => {
      let transaction = transactions.find(t => t.UUID === transactionUUID)
      if (!transaction) {
        return transactions
      }
      const old : Transaction = transaction
      transactions = transactions.filter(t => t.UUID !== transactionUUID);
      return AsyncStorage.setItem("transactions", JSON.stringify(transactions))
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
    }
  )
}

async function RefreshTotalWallet(walletUUID : string, year : number):Promise<void> {
  GetAllTransactions(walletUUID).then(transactions => {
    GetWallets().then(wallets => {
      const wallet = wallets.find(w => w.UUID == walletUUID)
      if (!wallet) {
        return;
      }
      let total = wallet.TotalPerYear.find(y => y.Year === year)
      if (!total) {
        total = {Year : year, Total : 0}
        wallet.TotalPerYear.push(total);
      }
      total.Total = transactions.reduce((agg,transaction) => agg+transaction.Price, 0);
      return  AsyncStorage.setItem("wallets", JSON.stringify(wallets))
    })
  })
}

export async function GetAllTransactions(...walletUUIDs : string[]):Promise<Transaction[]> {
  return AsyncStorage.getItem("transactions").then(raw => {
    let result: Transaction[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.filter(t => !walletUUIDs.length || walletUUIDs.find(e => e==t.WalletUUID)).map(TransactionDefault);
  });
}

export async function GetTransaction(transactionUUID : string):Promise<Transaction> {
  return GetAllTransactions()
    .then(transactions => transactions.find(t => t.UUID === transactionUUID))
    .then(transaction => {
      if (!transaction) {
        throw("transaction not found")
      } else {
        return transaction
      }
    })
}

export async function GetWallet(walletUUID : string):Promise<Wallet> {
  return GetWallets().then(wallets => {
    console.log("wallets", wallets, walletUUID);
    return wallets.find(w => w.UUID == walletUUID)
  })
  .then(w => {
    if (!w) {
      throw "fail to get wallet"
    } else {
      return w;
    }
  })
}

export async function GetCategories():Promise<Category[]> {
    return AsyncStorage.getItem("categories").then(raw => {
      let result: Category[] | null = JSON.parse(raw);
      if (!result) {
        result = [
          { Icon : "shopping_cart", Name : "Shopping", UUID : v4(), LastUpdate : new Date()},
          { Icon : "shopping_cart", Name : "Other", UUID : v4(), LastUpdate : new Date()},
        ].map(CategoryDefault);
        return AsyncStorage.setItem("categories", JSON.stringify(result)).then(() => result || [])
      }
      return result.map(CategoryDefault);
    });
}
