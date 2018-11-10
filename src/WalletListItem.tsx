// @ts-ignore
import { Dialog, FlatButton, TouchableRipple as TouchableHighlight } from "carbon-ui";
import { History } from "history";
import * as React from "react";
import { Alert, Button, Picker, Text, ToastAndroid, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { MyLink } from "./Link";
import * as Models from "./Models";
import t from "./translator";
import { displayPrice, IWallet } from "./Types";

interface IProps {
  Wallet: IWallet;
  history: History;
  displayArchive: boolean;
  archive: (walletUUID: string) => Promise<any>;
}
interface IState {
  displayOption: boolean;
}

const margins = {};

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displayOption: false,
    };
  }

  public render() {
    let options: JSX.Element | null = null;
    if (this.state.displayOption) {
      options = <View>
        <Button
          onPress={() => this.props.history.push(`/AddWalletView/${this.props.Wallet.UUID}`)}
          title={t.t("walletListItem.modify")} />
        <Button
          onPress={() => this.props.archive(this.props.Wallet.UUID).then(() =>
            this.setState({ ...this.state, displayOption: false }))}
          title={this.props.Wallet.Archived ? t.t("walletListItem.restore") : t.t("walletListItem.archive")} />
        <Button
          onPress={() => this.props.history.push(
            `/DeleteWalletView/${this.props.Wallet.UUID}/${this.props.Wallet.Name}
            `)}
          title={t.t("walletListItem.delete")} />
      </View>;
    }
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.props.history.push(`/TransactionsView?walletUUID=${this.props.Wallet.UUID}`)}
          onLongPress={() => this.setState({ ...this.state, displayOption: true })}
        >
          <View style={{ height: 60, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 2 }}>
              <Icon
                reverse
                name={this.props.Wallet.Icon.Name}
                type={this.props.Wallet.Icon.Type}
                color={this.props.Wallet.Icon.Color}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={margins}>{this.props.Wallet.Name}</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ ...margins, textAlign: "right" }}>
                {displayPrice(
                  this.props.Wallet.TotalPerYear.reduce(
                    (aggregate, current) => aggregate += current.Total,
                    this.props.Wallet.Solde,
                  ),
                  this.props.Wallet.Currency,
                )}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.state.displayOption && options}
      </View>
    );
  }

}
