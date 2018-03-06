import {AsyncStorage} from "react-native"

interface TotalYear {
  Year : number,
  Total : number,
}

export interface Wallet {
  Name: string,
  Description: string,
  TotalPerYear : TotalYear[],
}

export async function GetWallets():Promise<Wallet[]> {
    return AsyncStorage.getItem("wallets").then(raw => {
      let result: Wallet[] = JSON.parse(raw);
      return result || [];
    });
}
