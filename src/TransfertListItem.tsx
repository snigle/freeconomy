// @ts-ignore
import { TouchableRipple } from "carbon-ui";
import { History } from "history";
import * as _ from "lodash";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { MyLink } from "./Link";
import * as Models from "./Models";
import { displayPrice, ICategory, ICurrency, ITransfert, IWallet } from "./Types";

interface IProps {
  Transfert: ITransfert;
  CurrentTotal: number;
  Currency: ICurrency;
  Wallets: IWallet[];
  history: History;
  income: boolean;
}

interface IState {
  displayOption: boolean;
  deleted: boolean;
}

const margins = { marginLeft: 15, marginRight: 15 };

export default class extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { displayOption: false, deleted: false };
  }

  public render() {
    let description = "";
    let price = 0;
    const walletFrom = _.find(this.props.Wallets, (w) => (w.UUID === this.props.Transfert.From.WalletUUID));
    const walletTo = _.find(this.props.Wallets, (w) => (w.UUID === this.props.Transfert.To.WalletUUID));
    if (!this.props.income) {
      description = `Transfert to ${walletTo ? walletTo.Name : "Wallet"}`;
      price = -this.props.Transfert.From.Price;
    } else {
      description = `Transfert from ${walletFrom ? walletFrom.Name : "Wallet"}`;
      price = this.props.Transfert.To.Price;
    }
    const options = <View>
      <Button onPress={() => this.delete()} title="Supprimer" />
    </View>;
    return <TouchableRipple
      onPress={() => this.props.history.push(
        `/Wallet/${this.props.Transfert.From.WalletUUID}/AddTransfertView/${this.props.Transfert.UUID}`,
      )}
      onLongPress={() => this.setState({ ...this.state, displayOption: true })}
      style={{ display: this.state.deleted ? "none" : undefined }}
    >
      <View>
        <View style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 50 }}>
            <Icon name="sync" reverse color={this.props.income ? "#00AA00" : "#EE0000"} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={margins}>{description}</Text>
          </View>
          <View style={{ width: 140 }}>
            <Text style={{ ...margins, textAlign: "right", fontSize: 18, color: price > 0 ? "green" : "red" }}>
              {displayPrice(price, this.props.Currency)}
            </Text>
            <Text style={{ ...margins, textAlign: "right", fontSize: 10 }}>
              {displayPrice(this.props.CurrentTotal, this.props.Currency)}
            </Text>
          </View>
        </View>
        {this.state.displayOption && options}
      </View>
    </TouchableRipple>;
  }

  public delete() {
    Models.DeleteTransfert(this.props.Transfert.UUID).then(() => this.setState({ deleted: true }));
  }
}
