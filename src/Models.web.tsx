import {AsyncStorage} from "react-native"
import {Wallet} from "./Models"

export async function GetWallets():Promise<Wallet[]> {
    return new Promise<Wallet[]>((resolve:any) => resolve(JSON.parse(localStorage.getItem("wallets") || "") || []));
}
