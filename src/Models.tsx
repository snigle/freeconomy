import {AsyncStorage} from "react-native"
import {Collection, Login, Transaction, TransactionInput, TransactionDefault, Wallet, WalletInput, WalletDefault, Category, CategoryDefault} from "./Types"
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
  ).then((wallets) =>
      AsyncStorage.setItem("wallets", JSON.stringify(wallets)).then(() => wallets)
  )
}

export async function DeleteWallet(walletUUID : string):Promise<Wallet[]> {
    return GetAllTransactions()
    .then(transactions => ([transactions.filter(t => t.WalletUUID !== walletUUID), transactions.filter(t => t.WalletUUID === walletUUID)]))
    .then(([toKeep, toDelete]) => SaveTransactions(toKeep).then(() => toDelete))
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
          const promise : Promise<void> = Promise.resolve();
          transactions.forEach(t => {
            if (!mapWalletYear[t.WalletUUID]) {
              mapWalletYear[t.WalletUUID] = {};
            }
            const year = new Date(t.Date).getFullYear();
            if (!mapWalletYear[t.WalletUUID][year]) {
              promise.then(() => RefreshTotalWallet(t.WalletUUID, year))
            }
            mapWalletYear[t.WalletUUID][year]  = true;
          })
          return promise;
        })
        .then(() => transactions)
  )
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
      .then((transactions : Transaction[]) => markAsDeleted(transactionUUID).then(() => transactions))
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
      calculateTotal(wallet, transactions,year);
      return  AsyncStorage.setItem("wallets", JSON.stringify(wallets))
    })
  })
}

function calculateTotal(wallet : Wallet, inputTransactions : Transaction[], year : number): Wallet {
  const transactions = inputTransactions.filter(t => t.WalletUUID === wallet.UUID && new Date(t.Date).getFullYear() === year)
  let total = wallet.TotalPerYear.find(y => y.Year === year)
  if (!total) {
    total = {Year : year, Total : 0}
    wallet.TotalPerYear.push(total);
  }
  total.Total = transactions.reduce((agg,transaction) => agg+transaction.Price, 0);
  wallet.LastUpdate = new Date();
  return wallet;
}

export async function RefreshAllTotalWallet(transactions : Transaction[]):Promise<Wallet[]> {
    return GetWallets().then(wallets => {
      wallets.forEach(w => w.TotalPerYear.forEach( y =>
        calculateTotal(w, transactions.filter(t => t.WalletUUID == w.UUID && new Date(t.Date).getFullYear() === y.Year), y.Year)))
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

export async function SaveCategories(...categories : Category[]):Promise<Category[]> {
    return GetCategories().then(result => result.concat(categories))
    .then(result => AsyncStorage.setItem("categories", JSON.stringify(result)).then(() => result))
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
