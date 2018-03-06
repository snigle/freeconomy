import * as React from "react"
import {Text} from "react-native"
import {Wallet} from "./Models"
interface Props {
  Wallet : Wallet
}
export default function Loading(props: Props){
  return <Text>{props.Wallet.Description}</Text>;
}
