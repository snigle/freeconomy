// @ts-ignore
import { History } from "history";
import * as React from "react";
import { Button, Text, TouchableHighlight, View } from "react-native";
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
  onSelect: (uuid: string, price: number) => Promise<boolean>;
  Price: number;
  Wallet?: IWallet;
  repeat: boolean;
}

interface IState {
  displayOption: boolean;
  deleted: boolean;
  selected: boolean;
}

const margins = { marginLeft: 15, marginRight: 15 };

export default class extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { displayOption: false, deleted: false, selected: false };
  }

  public render() {
    const options = <View>
      <Button onPress={() => this.props.onDelete().then(() => this.setState({ deleted: true }))} title="Supprimer" />
    </View>;
    return <View
      style={{ display: this.state.deleted ? "none" : undefined }}
    >
      <View style={{
        height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center",
      }}>
        <View style={{ width: 60 }}>
          <TouchableHighlight
            onPress={() => this.props.onSelect(this.props.UUID, this.props.Price).then(
              (changed) => changed && this.setState({ ...this.state, selected: !this.state.selected }))}
          >
            <View>
              {
                !this.state.selected ? <Icon
                  name={this.props.Category.Icon.Name}
                  type={this.props.Category.Icon.Type}
                  color={this.props.Category.Icon.Color}
                  reverse /> :
                  <Icon
                    name={"check"}
                    type={"material"}
                    color={"rgb(181, 181, 181)"}
                    reverse />
              }
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            onPress={() => this.props.history.push(this.props.EditRoute)}
            onLongPress={() => this.setState({ ...this.state, displayOption: true })}
          >
            <View
              style={{
                display: this.state.deleted ? "none" : undefined,
                height: 60, paddingTop: 10,
              }}>
              <View style={{ flexDirection: "row" }}>
                <Text style={margins}>{this.props.Description}</Text>
                {this.props.repeat ?
                  <Icon name="loop" color="rgb(81, 127, 164)" size={13} />
                  : undefined}
              </View>
              <View>
                <Text style={{ ...margins, fontSize: 10 }}>
                  {this.props.Comment}{this.props.Wallet ? `(${this.props.Wallet.Name})` : ""}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
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
    </View>;
  }

}
