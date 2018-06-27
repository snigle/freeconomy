import * as queryString from "querystring";
import * as React from "react";
import {Text, View} from "react-native";
import {RouteProps} from "react-router";

interface IState {
  WalletUUID: string;
}

export default class extends React.Component<RouteProps, IState> {
  constructor(props: RouteProps) {
    super(props);
    console.log("props", props);
    if (props.location) {
      const toto = queryString.parse(props.location.search.replace("?", ""));
      this.state = {WalletUUID : Array.isArray(toto.walletUUID) ? toto.walletUUID[0] : toto.walletUUID};
    } else {
      this.state = {WalletUUID : ""};
    }
  }

  public render() {
    return <View>
      <Text>Import in wallet {this.state.WalletUUID} non disponible sur mobile</Text>
    </View>;
  }
}
