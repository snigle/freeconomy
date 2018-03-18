import {v4} from "uuid"

///////////////////////////////////////////////////////////
// Wallets

interface TotalYear {
  Year : number,
  Total : number,
}

export interface Currency {
  Symbol: string,
  Code: string,
}

export interface Wallet {
  // Calculated
  UUID: string,
  TotalPerYear : TotalYear[],
  LastUpdate: Date,

  // Inputs
  Name: string,
  Description: string,
  Currency: Currency,
  Icon: string,
}

export interface WalletInput {
  Name: string,
  Description: string,
  Currency: Currency,
  Icon: string,
}

export const WalletDefault = (w :Wallet):Wallet => ({
    UUID : w.UUID || v4(),
    TotalPerYear : w.TotalPerYear || [],
    LastUpdate: asDate(w.LastUpdate),
    Name : w.Name || "No Name",
    Description: w.Description || "",
    Currency : { Code : "EUR", Symbol: "€"},
    Icon: "account_balance_wallet",
  })

  export const displayPrice = (price : number, currency : Currency) : string =>
   `${Math.round(price*100)/100} ${currency.Symbol}`


///////////////////////////////////////////////////////////
// Category

export interface Category {
  UUID : string,
  Name : string,
  Icon : string,
}


///////////////////////////////////////////////////////////
// Operations
export interface Category {
  UUID : string,
  Name : string,
  ParentCategoryUUID? : string,
  Icon : string,
  LastUpdate : Date,
}

export const CategoryDefault = (w :Category):Category => ({
    UUID : w.UUID || v4(),
    ParentCategoryUUID : w.ParentCategoryUUID,
    LastUpdate: asDate(w.LastUpdate),
    Name : w.Name || "No category",
    Icon: w.Icon || "shopping_cart",
  })

export interface Transaction{
  UUID : string,
  WalletUUID : string,
  CategoryUUID : string,

  LastUpdate : Date,

  Beneficiary : string,
  Date : Date,
  Price : number,
  Comment: string,
}

export interface TransactionInput{
  WalletUUID : string,
  CategoryUUID : string,
  Beneficiary : string,
  Date : Date,
  Price : number,
  Comment: string,
}

function asDate(date? : Date) : Date {
  return (date && new Date(date)) || new Date()
}

export const TransactionDefault = (w :Transaction):Transaction => ({
    UUID : w.UUID || v4(),
    WalletUUID : w.WalletUUID || "",
    CategoryUUID : w.CategoryUUID || "",

    LastUpdate: asDate(w.LastUpdate),

    Beneficiary : w.Beneficiary || "Other",
    Date : asDate(w.Date),
    Price : w.Price || 0,
    Comment: w.Comment || "",
  })

interface TransfertDetail {
  WalletUUID : string,
  Price : number,
}

export interface Transfert{
  UUID : string,
  From : TransfertDetail,
  To : TransfertDetail,
  Comment : string,

  Date : Date,
  LastUpdate : Date,
}

export interface Login {
  id : string,
  token : string,
  expires : Date,
}

export interface Collection {
  UUID : string,
  LastUpdate : Date,
}
