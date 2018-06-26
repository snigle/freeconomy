// @ts-ignore
import { TextField } from "carbon-ui";
import {History} from "history";
import * as _ from "lodash";
import * as React from "react";
import {Button, Picker, Text, View} from "react-native";
import {Header, Icon} from "react-native-elements";
import DatePicker from "./DatePicker";
import {MyLink} from "./Link";
import * as Models from "./Models";
import t from "./translator";
import {TransfertInput, Wallet} from "./Types";

interface IState extends TransfertInput {
  Loading: boolean;
  PriceFrom: string;
  PriceTo: string;
  Taux: string;
  Wallets: Wallet[];
}

interface IProps {
  WalletUUID: string;
  TransfertUUID?: string;
  history: History;
}

class AddTransactionView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const date = new Date();
    this.state = {
      Comment : "",
      From : {
        Price : 0,
        WalletUUID : props.WalletUUID,
      },
      To : {
        Price : 0,
        WalletUUID : props.WalletUUID,
      },
      PriceFrom : "0",
      PriceTo : "0",
      Taux : "1",
      Date : date,

      Wallets : [],

      Loading : true,
    };
  }

  public async componentDidMount() {
    let getTransactionPromise: Promise<any>;
    if (this.props.TransfertUUID) {
      getTransactionPromise = Models.GetTransfert(this.props.TransfertUUID).then((transfert) => {
        this.setState({...this.state,
                       Comment : transfert.Comment,
                       To : transfert.To,
                       From : transfert.From,
                       PriceFrom : "" + transfert.From.Price,
                       PriceTo : "" + transfert.To.Price,
                       Date: transfert.Date,
      });
      });
    } else {
      getTransactionPromise = Promise.resolve();
    }

    Promise.all([
      Models.GetWallets().then((c) => _.sortBy(c, "Name")),
      getTransactionPromise,
    ]).then(([wallets]) => {
      this.setState({...this.state, Wallets : wallets, Loading : false});
    });
  }

  public changeNumber(textValue: string, decimals: number): {text: string, number: number} {
    const numberValue = parseFloat(textValue);
    let result = "";
    if (textValue === "" || textValue === "-") {
      result = textValue;
    } else if (numberValue) {
      result = "" + (Math.round(numberValue * Math.pow(10, decimals)) / Math.pow(10, decimals));
    }
    return {text : result, number : Math.abs(numberValue)};
  }

  public changeDate(date: Date) {
    this.setState({...this.state, Date : date});
  }
  public changePriceFrom(text: string) {
    const result = this.changeNumber(text, 2);
    const priceTo = parseFloat(this.state.Taux) * result.number;
    this.setState({
      ...this.state,
      From : {...this.state.From, Price : result.number},
      To : {...this.state.To, Price : priceTo },
      PriceFrom : result.text,
      PriceTo: "" + priceTo,
    });
  }
  public changePriceTo(textValue: string) {
    const result = this.changeNumber(textValue, 2);
    const taux = Math.round((this.state.From.Price / result.number) * 1000000) / 1000000;
    this.setState({
      ...this.state,
      To : {...this.state.To, Price : result.number},
      PriceTo : result.text,
      Taux : "" + (taux || 0),
    });
  }
  public changeWalletUUIDFrom(textValue: string) {
    this.setState({...this.state, From : {...this.state.From, WalletUUID : textValue}});
  }
  public changeWalletUUIDTo(textValue: string) {
    this.setState({...this.state, To : {...this.state.From, WalletUUID : textValue}});
  }
  public changeComment(textValue: string) {
    this.setState({...this.state, Comment : textValue});
  }

  public render() {
    let content: any;
    if (this.state.Loading) {
      content = <Text>Chargement des Comptes</Text>;
    } else {
      console.log("display", this.state);
      content = <View>
      <View style={{flexDirection: "row"}}>
          <View style={{flex: 1}}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.From.WalletUUID}
              onValueChange={(itemValue, itemIndex) => this.changeWalletUUIDFrom(itemValue)}>
              {
                this.state.Wallets.map((w) =>
                  <Picker.Item key={w.UUID} label={`${w.Name} (${w.Currency.Code})`} value={w.UUID} />,
                )
              }
            </Picker>
            <TextField
              keyboardType="numeric"
              placeholder={t.t("common.price")}
              onChangeText={(v: string) => this.changePriceFrom(v)}
              value={this.state.PriceFrom}/>
          </View>
          <View style={{flex: 1}}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.To.WalletUUID}
              onValueChange={(itemValue, itemIndex) => this.changeWalletUUIDTo(itemValue)}>
              {
                this.state.Wallets.map((w) =>
                  <Picker.Item key={w.UUID} label={`${w.Name} (${w.Currency.Code})`} value={w.UUID} />,
                )
              }
            </Picker>
            <TextField
              keyboardType="numeric"
              placeholder={t.t("common.price")}
              onChangeText={(v: string) => this.changePriceTo(v)}
              value={this.state.PriceTo}/>
          </View>
        </View>
        <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)}/>
        <TextField
          placeholder={t.t("addTransactionView.comment")}
          onChangeText={(v: string) => this.changeComment(v)}
          value={this.state.Comment}/>
        <Button title={t.t("common.save")} onPress={() => this.save()}/>
      </View>;
    }
    return (
      <View>
      <Header
      outerContainerStyles={{height: 60}}
        leftComponent={
          <MyLink to={`/Wallet/${this.props.WalletUUID}/TransactionsView`}>
            <Icon name="arrow-back" />
          </MyLink>
        }
        centerComponent={{ text: t.t("transactionsView.addTransfert"), style: { fontSize: 20, color: "#fff" } }}
        rightComponent={
          this.props.TransfertUUID ? <View /> :
          <MyLink to={`AddTransactionView`} replace>
            <Icon name="insert-drive-file" />
          </MyLink>
        }
      />
        {content}
      </View>
    );
  }

  public save() {
    this.setState({...this.state, Loading : true });
    const savePromise: Promise<any> =
      this.props.TransfertUUID ?
        Models.UpdateTransfert(this.props.TransfertUUID, this.state) :
        Models.CreateTransfert(this.state);

    savePromise.then(() => {
      this.props.history.goBack();
    }).catch((err: any) => console.log("error", err));
  }
}

export default AddTransactionView;
