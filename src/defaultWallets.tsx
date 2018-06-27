import {WalletInput} from "./Types";
import t from "./translator";

export const Money: WalletInput = {
  Name : t.t("defaultWallets.cash"),
  Description : t.t("defaultWallets.cashDescription"),
  Icon : {
    Name : "toll",
    Type : "material",
    Color : "#FF5E5B",
  },
  Currency : {
    Code : "EUR",
    Symbol : "€",
  },
};

export const Bank: WalletInput = {
  Name : t.t("defaultWallets.bank"),
  Description : t.t("defaultWallets.bankDescription"),
  Icon : {
    Name : "credit-card",
    Type : "material",
    Color : "#00A7E1",
  },
  Currency : {
    Code : "EUR",
    Symbol : "€",
  },
};
