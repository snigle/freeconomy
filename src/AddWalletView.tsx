// @ts-ignore
import { RaisedButton, TextField } from "carbon-ui";
// @ts-ignore
import * as colorsys from "colorsys";
import { History } from "history";
import * as React from "react";
import { ScrollView, View } from "react-native";
// @ts-ignore
import { ColorWheel } from "react-native-color-wheel";
import { Button, Header, Icon, Text } from "react-native-elements";
import * as Models from "./Models";
import t from "./translator";
import { IconType, IWalletInput } from "./Types";

interface IState extends IWalletInput {
  Loading: boolean;
}

interface IProps {
  WalletUUID?: string;
  history: History;
}

const icons: Array<{ name: string, type: IconType }> = [
  { name: "account-balance-wallet", type: "material" },
  { name: "attach-money", type: "material" },
  { name: "card-giftcard", type: "material" },
  { name: "card-travel", type: "material" },
  { name: "payment", type: "material" },
  { name: "toll", type: "material" },
  { name: "account-balance", type: "material" },
  // {name : "cc-paypal", type : "material"},
  // {name : "cc-visa", type : "material"},
  // {name : "cc-mastercard", type : "material"},
];
class AddWalletView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      Name: "",
      Description: "",
      Currency: { Code: "EUR", Symbol: "€" },
      Icon: { Name: "account-balance-wallet", Color: "#517fa4", Type: "material" },
      Loading: true,
    };
  }

  public async componentDidMount() {
    if (this.props.WalletUUID) {
      Models.GetWallet(this.props.WalletUUID).then((wallet) => {
        this.setState({
          ...this.state,
          Loading: false,
          Name: wallet.Name,
          Description: wallet.Description,
          Currency: wallet.Currency,
          Icon: wallet.Icon,
        });
      });
    } else {
      return Promise.resolve(this.setState({ ...this.state, Loading: false }));
    }
  }

  public changeName(text: string) {
    this.setState({ ...this.state, Name: text });
  }
  public changeDescription(text: string) {
    this.setState({ ...this.state, Description: text });
  }
  public changeCurrencyCode(text: string) {
    this.setState({ ...this.state, Currency: { ...this.state.Currency, Code: text } });
  }
  public changeCurrencySymbol(text: string) {
    this.setState({ ...this.state, Currency: { ...this.state.Currency, Symbol: text } });
  }
  public changeIconColor(text: string) {
    this.setState({ ...this.state, Icon: { ...this.state.Icon, Color: text } });
  }
  public changeIcon({ name, type }: { name: string, type: IconType }) {
    this.setState({ ...this.state, Icon: { ...this.state.Icon, Name: name, Type: type } });
  }

  public render() {
    let content: JSX.Element = <View><Text>{t.t("common.loading")}</Text></View>;
    if (!this.state.Loading) {
      content = <ScrollView style={{ flex: 1 }}>
        <TextField
          placeholder={t.t("common.name")}
          onChangeText={(v: string) => this.changeName(v)} value={this.state.Name} />
        <TextField
          placeholder={t.t("common.description")}
          onChangeText={(v: string) => this.changeDescription(v)}
          value={this.state.Description} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextField placeholder={t.t("addWalletView.currencyCode")}
              onChangeText={(v: string) => this.changeCurrencyCode(v)}
              value={this.state.Currency.Code} />
          </View>
          <View style={{ flex: 1 }}>
            <TextField
              placeholder={t.t("addWalletView.symbol")}
              onChangeText={(v: string) => this.changeCurrencySymbol(v)} value={this.state.Currency.Symbol} />
          </View>
        </View>
        <View style={{ height: 20 }} />
        <Text h4>{t.t("common.icon")} :</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <ColorWheel
              initialColor={this.state.Icon.Color}
              onColorChange={(color: any) => this.changeIconColor(colorsys.hsv2Hex(color))}
              style={{ marginLeft: 20, padding: 40, height: 100, width: 100, overflow: "visible" }} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
              {icons.map(({ name, type }: { name: string, type: IconType }) =>
                <Icon
                  onPress={() => this.changeIcon({ name, type })}
                  key={name}
                  name={name}
                  type={type}
                  reverse
                  color={this.state.Icon.Color} />,
              )}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 20 }} />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.save(true)}
              text={t.t("common.saveAndNew")}
              containerStyle={{ margin: 5 }}
              textStyle={{ flex: 1 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => this.save()}
              text={t.t("common.save")}
              containerStyle={{ margin: 5 }}
              textStyle={{ flex: 1 }} />
          </View>
        </View>
      </ScrollView>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: 60 }}
          leftComponent={{
            icon: "navigate-before",
            color: "#fff",
            onPress: () => this.props.history.replace("/"),
          }}
          centerComponent={{ text: t.t("walletsView.add"), style: { fontSize: 20, color: "#fff" } }}
        />
        {
          content
        }
      </View>
    );
  }

  public save(reload: boolean = false) {
    this.setState({ ...this.state, Loading: true });
    const savePromise: Promise<any> = this.props.WalletUUID ?
      Models.UpdateWallet(this.props.WalletUUID, this.state) :
      Models.CreateWallet(this.state);
    savePromise.then(() => {
      if (reload) {
        this.props.history.replace("/");
        this.props.history.replace("/AddWalletView");
      } else {
        this.props.history.replace("/");
      }
    }).catch((err: any) => console.log("error", err));
  }
}

export default AddWalletView;
