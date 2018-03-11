import * as React from "react"
import {Text, View} from "react-native"
import {Transaction, displayPrice, Currency} from "./Types"
import {MyLink} from "./Link"
//@ts-ignore
import {Icon, TouchableRipple} from "carbon-ui"

interface Props {
  Transaction : Transaction,
  Currency : Currency
}

const margins = {marginLeft : 15, marginRight : 15}
export default (props: Props) =>
<MyLink to="/AddWalletView">
  <View style={{height: 60, flexDirection: "row", alignItems: "center"}}>
    <View style={{flex:1}}>
      <Icon name="account_balance_wallet" style={margins}/>
    </View>
    <View style={{flex:4}}>
      <Text style={margins}>{props.Transaction.Beneficiary}</Text>
    </View>
    <View style={{flex:2}}>
      <Text style={{...margins, textAlign: "right"}}>{displayPrice(props.Transaction.Price, props.Currency)}</Text>
    </View>
  </View>
</MyLink>
