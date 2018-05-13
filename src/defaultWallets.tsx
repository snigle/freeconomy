import {WalletInput} from "./Types"

export const Money : WalletInput = {
  Name : "Money",
  Description : "Wallet",
  Icon : {
    Name : "toll",
    Type : "material",
    Color : "#FF5E5B"
  },
  Currency : {
    Code : "EUR",
    Symbol : "€",
  }
}

export const Bank : WalletInput = {
  Name : "Bank Account",
  Description : "Bank with credit card",
  Icon : {
    Name : "bank",
    Type : "material",
    Color : "#00A7E1"
  },
  Currency : {
    Code : "EUR",
    Symbol : "€",
  }
}
