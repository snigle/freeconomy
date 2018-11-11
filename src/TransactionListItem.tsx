// @ts-ignore
import { TouchableRipple } from "carbon-ui";
import { History } from "history";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { MyLink } from "./Link";
import * as Models from "./Models";
import { displayPrice, ICategory, ICurrency, ITransaction, IWallet } from "./Types";

interface IProps {
  UUID: string;
  WalletUUID: string;
  CurrentTotal: number;
  Currency: ICurrency;
  history: History;
  Description: string;
  Comment: string;
  Category: ICategory;
  EditRoute: string;
  onDelete: () => Promise<any>;
  Price: number;
  Wallet?: IWallet;
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
    const options = <View>
      <Button onPress={() => this.props.onDelete().then(() => this.setState({ deleted: true }))} title="Supprimer" />
    </View>;
    return <TouchableRipple
      onPress={() => this.props.history.push(this.props.EditRoute)}
      onLongPress={() => this.setState({ ...this.state, displayOption: true })}
      style={{ display: this.state.deleted ? "none" : undefined }}
    >
      <View>
        <View style={{ height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 50 }}>
            <Icon
              name={this.props.Category.Icon.Name}
              type={this.props.Category.Icon.Type}
              color={this.props.Category.Icon.Color}
              reverse />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={margins}>{this.props.Description}</Text>
            <Text style={{ ...margins, fontSize: 10 }}>
              {this.props.Comment}{this.props.Wallet ? `(${this.props.Wallet.Name})` : ""}
            </Text>
          </View>
          <View style={{ width: 150 }}>
            <Text
              style={{
                ...margins,
                textAlign: "right",
                fontSize: 18,
                color: this.props.Price > 0 ? "green" : "red",
              }}>
              {displayPrice(this.props.Price, this.props.Currency)}
            </Text>
            <Text
              style={{ ...margins, textAlign: "right", fontSize: 10 }}>
              {displayPrice(this.props.CurrentTotal, this.props.Currency)}
            </Text>
          </View>
        </View>
        {this.state.displayOption && options}
        <Divider />
      </View>
    </TouchableRipple>;
  }

}
