import { v4 } from "uuid";

///////////////////////////////////////////////////////////
// Wallets

interface ITotalYear {
  Year: number;
  Total: number;
}

export interface ICurrency {
  Symbol: string;
  Code: string;
}

export interface IWallet {
  // Calculated
  UUID: string;
  TotalPerYear: ITotalYear[];
  LastUpdate: Date;

  // Inputs
  Name: string;
  Description: string;
  Currency: ICurrency;
  Icon: IIcon;
  Solde: number;
  Archived: boolean;
}

export type IconType = "material" |
  "material-community" |
  "zocial" |
  "font-awesome" |
  "octicon" |
  "ionicon" |
  "foundation" |
  "evilicon" |
  "simple-line-icon" |
  "feather" |
  "entypo";

export interface IIcon {
  Name: string;
  Color: string;
  Type: IconType;
}

export interface IWalletInput {
  Name: string;
  Description: string;
  Currency: ICurrency;
  Icon: IIcon;
  Solde: number;
  Archived: boolean;
}

export const DefaultIcon = (i: IIcon): IIcon => ({
  Name: i.Name || "account-balance-wallet",
  Color: i.Color || "#517fa4",
  Type: i.Type || "material",
});

export const WalletDefault = (w: IWallet): IWallet => ({
  UUID: w.UUID || v4(),
  TotalPerYear: w.TotalPerYear || [],
  LastUpdate: asDate(w.LastUpdate),
  Name: w.Name || "No Name",
  Description: w.Description || "",
  Currency: w.Currency || { Code: "EUR", Symbol: "€" },
  Icon: DefaultIcon(w.Icon),
  Solde: w.Solde || 0,
  Archived: w.Archived || false,
});

export const displayPrice = (price: number, currency: ICurrency): string =>
  `${Math.round(price * 100) / 100} ${currency.Symbol}`;

///////////////////////////////////////////////////////////
// Category
export interface ICategory {
  UUID: string;
  Name: string;
  ParentCategoryUUID?: string;
  Icon: IIcon;
  LastUpdate: Date;
}

export interface ICategoryInput {
  Name: string;
  Icon: IIcon;
  ParentCategoryUUID?: string;
}

export const CategoryDefault = (w: ICategory): ICategory => ({
  UUID: w.UUID || v4(),
  ParentCategoryUUID: w.ParentCategoryUUID,
  LastUpdate: asDate(w.LastUpdate),
  Name: w.Name || "No category",
  Icon: DefaultIcon(w.Icon),
});

export interface ITransaction {
  UUID: string;
  WalletUUID: string;
  CategoryUUID: string;

  LastUpdate: Date;

  Beneficiary: string;
  Date: Date;
  Price: number;
  Comment: string;
}

export interface ITransactionInput {
  WalletUUID: string;
  CategoryUUID: string;
  Beneficiary: string;
  Date: Date;
  Price: number;
  Comment: string;
}

function asDate(date?: Date): Date {
  return (date && new Date(date)) || new Date();
}

export const TransactionDefault = (w: ITransaction): ITransaction => ({
  UUID: w.UUID || v4(),
  WalletUUID: w.WalletUUID || "",
  CategoryUUID: w.CategoryUUID || "",

  LastUpdate: asDate(w.LastUpdate),

  Beneficiary: w.Beneficiary || "Other",
  Date: asDate(w.Date),
  Price: w.Price || 0,
  Comment: w.Comment || "",
});

export const TransfertDefault = (w: ITransfert): ITransfert => ({
  UUID: w.UUID || v4(),
  To: w.To,
  From: w.From,
  LastUpdate: asDate(w.LastUpdate),
  Date: asDate(w.Date),
  Comment: w.Comment || "",
});

interface ITransfertDetail {
  WalletUUID: string;
  Price: number;
}

export interface ITransfert {
  UUID: string;
  From: ITransfertDetail;
  To: ITransfertDetail;
  Comment: string;

  Date: Date;
  LastUpdate: Date;
}

export interface ITransfertInput {
  From: ITransfertDetail;
  To: ITransfertDetail;
  Comment?: string;
  Date: Date;
}

export interface ILogin {
  id: string;
  token: string;
  expires: Date;
}

export interface ICollection {
  UUID: string;
  LastUpdate: Date;
}
