import {AsyncStorage} from "react-native"
import {DefaultIcon, TransfertDefault, CategoryInput, TransfertInput, Transfert, Collection, Login, Transaction, TransactionInput, TransactionDefault, Wallet, WalletInput, WalletDefault, Category, CategoryDefault} from "./Types"
import {v4} from "uuid";
import * as _ from "lodash"

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
  ).then(SaveWallets);
}

export async function SaveWallets(wallets : Wallet[]):Promise<Wallet[]> {
  return AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets)
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
          LastUpdate : new Date(),
      });
      return wallets;
    }
  ).then(SaveWallets)
}

export async function DeleteWallet(walletUUID : string):Promise<Wallet[]> {
    return GetAllTransactions()
    .then(transactions => ([transactions.filter(t => t.WalletUUID !== walletUUID), transactions.filter(t => t.WalletUUID === walletUUID)]))
    .then(([toKeep, toDelete]) => SaveTransactions(toKeep).then(() => toDelete))
    .then(toDelete => GetAllDeleted().then(deleted => deleted.concat(toDelete.map((t) : Collection => ({UUID : t.UUID, LastUpdate : t.LastUpdate})))))
    .then(SaveDeleted)
    .then(() => GetTransferts())
    .then(transactions => ([transactions.filter(t => t.From.WalletUUID !== walletUUID && t.To.WalletUUID !== walletUUID), transactions.filter(t => t.From.WalletUUID === walletUUID || t.To.WalletUUID === walletUUID)]))
    .then(([toKeep, toDelete]) => SaveTransferts(toKeep).then(() => toDelete))
    .then(toDelete => GetAllDeleted().then(deleted => deleted.concat(toDelete.map((t) : Collection => ({UUID : t.UUID, LastUpdate : t.LastUpdate})))))
    .then(SaveDeleted)
    .then(() => GetWallets())
    .then(walletsBefore => walletsBefore.filter(w => w.UUID !== walletUUID))
    .then(SaveWallets)
    .then(w => markAsDeleted(walletUUID).then(() => w))
}

export async function GetAllDeleted() : Promise<Collection[]> {
  return AsyncStorage.getItem("deleted").then((raw : string) => {
    let result: Collection[] | null = JSON.parse(raw);
    return (result && result.map(d => ({...d, LastUpdate : new Date(d.LastUpdate)})).filter(d => d.UUID)) || [];
  });
}

async function markAsDeleted(uuid : string) : Promise<Collection[]> {
  return GetAllDeleted()
    .then(deleted => deleted.concat({UUID : uuid, LastUpdate : new Date()}))
    .then(SaveDeleted);
}

export async function SaveDeleted(deleted : Collection[]) : Promise<Collection[]> {
  console.log("save deleted", deleted);
  return AsyncStorage.setItem("deleted", JSON.stringify(deleted)).then(() => deleted);
}

export async function CleanDeleted() : Promise<Collection[]>{
  const now = new Date();
  return GetAllDeleted().then(deleted =>
    deleted.filter(d => d.LastUpdate > new Date(now.getFullYear(), now.getMonth()-2, now.getDate()))
  ).then(SaveDeleted);
}

export async function CreateTransaction(...inputs : TransactionInput[]):Promise<Transaction[]> {
    return GetAllTransactions().then((transactions) : Transaction[] =>
      transactions.concat(inputs.map((input) : Transaction=>({
      UUID: v4(),
      LastUpdate: new Date(),

      // Inputs
      Beneficiary : input.Beneficiary,
      CategoryUUID : input.CategoryUUID,
      Date : input.Date,
      Comment : input.Comment,
      Price : input.Price,
      WalletUUID: input.WalletUUID,
    })))
  ).then((transactions) =>
        SaveTransactions(transactions)
        .then(() => {
          const mapWalletYear : { [key:string] : { [key:number] : boolean }}= {}
          let promise : Promise<void> = Promise.resolve();
          transactions.forEach(t => {
            if (!mapWalletYear[t.WalletUUID]) {
              mapWalletYear[t.WalletUUID] = {};
            }
            const year = new Date(t.Date).getFullYear();
            if (!mapWalletYear[t.WalletUUID][year]) {
              promise = promise.then(() => RefreshTotalWallet(t.WalletUUID, year))
            }
            mapWalletYear[t.WalletUUID][year]  = true;
          })
          return promise;
        })
        .then(() => transactions)
  )
}

export async function CreateTransfert(...inputs : TransfertInput[]):Promise<Transfert[]> {
    return GetTransferts().then((transactions) : Transfert[] =>
      transactions.concat(inputs.map((input) : Transfert=>({
      UUID: v4(),
      LastUpdate: new Date(),

      // Inputs
      Date : input.Date,
      Comment : input.Comment || "",
      From : input.From,
      To : input.To,
    })))
  ).then((transactions) =>
        SaveTransferts(transactions)
        .then(() => {
          const mapWalletYear : { [key:string] : { [key:number] : boolean }}= {}
          let promise : Promise<void> = Promise.resolve();
          transactions.forEach(t => {
            if (!mapWalletYear[t.From.WalletUUID]) {
              mapWalletYear[t.From.WalletUUID] = {};
            }
            if (!mapWalletYear[t.To.WalletUUID]) {
              mapWalletYear[t.To.WalletUUID] = {};
            }
            const year = new Date(t.Date).getFullYear();
            if (!mapWalletYear[t.From.WalletUUID][year]) {
              promise = promise.then(() => RefreshTotalWallet(t.From.WalletUUID, year))
            }
            if (!mapWalletYear[t.To.WalletUUID][year]) {
              promise = promise.then(() => RefreshTotalWallet(t.To.WalletUUID, year))
            }
            mapWalletYear[t.From.WalletUUID][year]  = true;
            mapWalletYear[t.To.WalletUUID][year]  = true;
          })
          return promise;
        })
        .then(() => transactions)
  )
}
export async function SaveTransferts(transactions : Transfert[]) : Promise<Transfert[]> {
  return AsyncStorage.setItem("transfert", JSON.stringify(transactions.sort((a,b)=> new Date(b.Date).getTime() - new Date(a.Date).getTime()))).then(() => transactions);
}
export async function SaveTransactions(transactions : Transaction[]) : Promise<Transaction[]> {
  return AsyncStorage.setItem("transactions", JSON.stringify(transactions.sort((a,b)=> new Date(b.Date).getTime() - new Date(a.Date).getTime()))).then(() => transactions);
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
        LastUpdate : new Date(),
      });
      return AsyncStorage.setItem("transactions", JSON.stringify(transactions))
      .then(() => RefreshTotalWallet(input.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
    }
  )
}

export async function UpdateTransfert(transactionUUID : string, input : TransfertInput):Promise<Transfert[]> {
    return GetTransferts().then(transactions => {
      let transaction = transactions.find(t => t.UUID === transactionUUID)
      if (!transaction) {
        throw("transaction not found");
      }
      let old :Transfert = {...transaction, To : {...transaction.To}, From : {...transaction.From}}
      Object.assign(transaction, {
        Date : input.Date,
        Comment : input.Comment,
        To : {... input.To},
        From : {...input.From},
        LastUpdate : new Date(),
      });
      return SaveTransferts(transactions)
      .then(() => RefreshTotalWallet(input.To.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(input.From.WalletUUID, input.Date.getFullYear()))
      .then(() => RefreshTotalWallet(old.To.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => RefreshTotalWallet(old.From.WalletUUID, new Date(old.Date).getFullYear()))
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
      return SaveTransactions(transactions)
      .then(() => RefreshTotalWallet(old.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
      .then((transactions : Transaction[]) => markAsDeleted(transactionUUID).then(() => transactions))
    }
  )
}

export async function DeleteTransfert(transactionUUID : string):Promise<Transfert[]> {
    return GetTransferts().then(transactions => {
      let transaction = transactions.find(t => t.UUID === transactionUUID)
      if (!transaction) {
        return transactions
      }
      const old : Transfert = transaction
      transactions = transactions.filter(t => t.UUID !== transactionUUID);
      return SaveTransferts(transactions)
      .then(() => RefreshTotalWallet(old.From.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => RefreshTotalWallet(old.To.WalletUUID, new Date(old.Date).getFullYear()))
      .then(() => transactions)
      .then((transactions : Transfert[]) => markAsDeleted(transactionUUID).then(() => transactions))
    }
  )
}

async function RefreshTotalWallet(walletUUID : string, year : number):Promise<void> {
  GetAllTransactions(walletUUID).then(transactions =>
    GetTransferts(walletUUID).then((transfert) => {
    return GetWallets().then(wallets => {
      const wallet = wallets.find(w => w.UUID == walletUUID)
      if (!wallet) {
        return;
      }
      calculateTotal(wallet, transactions, transfert, year);
      console.log("refresh total wallet", wallet.TotalPerYear.find(t => t.Year === year), walletUUID, wallet, year)
      return  AsyncStorage.setItem("wallets", JSON.stringify(wallets))
    })
  })
  )
}

function calculateTotal(wallet : Wallet, inputTransactions : Transaction[], transfert : Transfert[], year : number): Wallet {
  const transactions = inputTransactions.filter(t => t.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year)
  const transfertsIn = transfert.filter(t => t.To.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year)
  const transfertsOut = transfert.filter(t => t.From.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year)
  let total = wallet.TotalPerYear.find(y => y.Year === year)
  if (!total) {
    total = {Year : year, Total : 0}
    wallet.TotalPerYear.push(total);
  }
  total.Total = transactions.reduce((agg,transaction) => agg+transaction.Price, 0);
    total.Total += transfertsIn.reduce((agg,transaction) => agg+transaction.To.Price, 0);
  total.Total -= transfertsOut.reduce((agg,transaction) => agg+transaction.From.Price, 0);
  wallet.LastUpdate = new Date();
  return wallet;
}

export async function RefreshAllTotalWallet(transactions : Transaction[], transfert : Transfert[]):Promise<Wallet[]> {
    return GetWallets().then(wallets => {
      wallets.forEach(w => w.TotalPerYear.forEach( y =>
        calculateTotal(w, transactions, transfert, y.Year)))
      return SaveWallets(wallets);
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

export async function GetTransferts(...walletUUIDs : string[]):Promise<Transfert[]> {
  return AsyncStorage.getItem("transfert").then(raw => {
    let result: Transfert[] | null = JSON.parse(raw);
    if (!result) {
      return [];
    }
    return result.filter(t => !walletUUIDs.length || walletUUIDs.find(e => e===t.From.WalletUUID || e===t.To.WalletUUID)).map(TransfertDefault);
  });
}

export async function GetTransfert(UUID : string):Promise<Transfert> {
  return GetTransferts()
    .then(list => list.find(t => t.UUID === UUID))
    .then(t => {
      if (!t) {
        throw("transaction not found")
      } else {
        return t
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
          { Icon : DefaultIcon({Name : "shopping-cart", Color : "#517fa4", Type : "material"}), Name : "Shopping", UUID : v4(), LastUpdate : new Date()},
          { Icon : DefaultIcon({Name : "shopping-cart", Color : "#517fa4", Type : "material"}), Name : "Other", UUID : v4(), LastUpdate : new Date()},
        ].map(CategoryDefault);
        return AsyncStorage.setItem("categories", JSON.stringify(result)).then(() => result || [])
      }
      return result.map(CategoryDefault);
    });
}

export async function UpdateCategory(categoryUUID : string, input : CategoryInput):Promise<Category[]> {
    return GetCategories().then(categories => {
      let result = categories.find(c => c.UUID === categoryUUID)
      if (!result) {
        throw("Category not found")
      }
      Object.assign(result, input);
      return SaveCategories(categories);
    })
}

export async function GetCategory(categoryUUID : string):Promise<Category> {
    return GetCategories().then(categories => {
      let result = categories.find(c => c.UUID === categoryUUID)
      if (!result) {
        throw("Category not found")
      }
      return result;
    })
}

export async function CreateCategory(...categories : CategoryInput[]):Promise<Category[]> {
  return GetCategories().then(result => result.concat(
    // Remove already exists
    categories.filter(c => !result.find(r => r.Name === c.Name))
    .map(categoryInput => ({
      UUID : v4(),
      LastUpdate: new Date(),

      Name : categoryInput.Name,
      Icon : categoryInput.Icon,
      ParentCategoryUUID : categoryInput.ParentCategoryUUID,
    }))
  ))
  .then(SaveCategories)
}

export async function SaveCategories(categories : Category[]):Promise<Category[]> {
    return AsyncStorage.setItem("categories", JSON.stringify(_.sortBy(categories, "Name"))).then(() => categories)
}

export async function GetLogin():Promise<Login> {
  return AsyncStorage.getItem("login").then(raw => {
    let result : Login | null = JSON.parse(raw);
    if (!result) {
      throw("login not found");
    }
    result.expires = new Date(result.expires);
    return result;
  })
}

export async function SaveLogin(login : Login):Promise<Login> {
  return AsyncStorage.setItem("login", JSON.stringify(login)).then(() => login)
}
