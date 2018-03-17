import * as React from "react"
import {View, Text} from "react-native"
import {RouteProps} from "react-router"
import * as queryString from "querystring"

interface Props extends RouteProps{

}

interface State {
  WalletUUID : string
}

export default class extends React.Component<RouteProps,State> {
  constructor(props : RouteProps) {
    super(props)
    console.log("props", props);
    if (props.location) {
      const toto = queryString.parse(props.location.search.replace("?",""))
      this.state = {WalletUUID : Array.isArray(toto.walletUUID) ? toto.walletUUID[0] : toto.walletUUID}
    } else {
      this.state = {WalletUUID : ""}
    }
  }

  render() {
    return <View>
      <Text>Import in wallet {this.state.WalletUUID} non disponible sur mobile</Text>
    </View>
  }
}
