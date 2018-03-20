import * as React from "react";
import {Text, View, TextInput, Picker} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {Wallet, TransfertInput, Category, Transaction} from "./Types"
import DatePicker from "./DatePicker"
import {History} from "history"
import * as _ from "lodash"
//@ts-ignore
import { RaisedButton, TextField, AppBar, Icon } from 'carbon-ui'

interface State extends TransfertInput{
  Loading : boolean,
  PriceFrom : string,
  PriceTo : string,
  Taux : string,
  Wallets : Wallet[],
}

interface Props {
  WalletUUID : string,
  TransfertUUID? : string,
  history : History,
}

type numberKey = "PriceFrom" | "PriceTo" | "Taux"

class AddTransactionView extends React.Component<Props,State>{
  constructor(props: Props){
    super(props)
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

  async componentDidMount() {
    let getTransactionPromise : Promise<any>;
    if (this.props.TransfertUUID) {
      getTransactionPromise = Models.GetTransfert(this.props.TransfertUUID).then(transfert => {
        this.setState({...this.state,
          Comment : transfert.Comment,
          To : transfert.To,
          From : transfert.From,
          PriceFrom : ""+transfert.From.Price,
          PriceTo : ""+transfert.To.Price,
          Date: transfert.Date,
      })
      })
    } else {
      getTransactionPromise = Promise.resolve()
    }

    Promise.all([
      Models.GetWallets().then(c => _.sortBy(c, "Name")),
      getTransactionPromise,
    ]).then(([wallets]) => {
      this.setState({...this.state, Wallets : wallets, Loading : false})
    })
  }

  changeNumber(text : string, decimals : number) : {text : string, number : number} {
    const number = parseFloat(text)
    let result = "";
    if (text === "" || text === "-") {
      result = text
    } else if (number) {
      result = ""+(Math.round(number * Math.pow(10,decimals)) / Math.pow(10,decimals));
    }
    return {text : result, number : Math.abs(number)}
  }

  changeDate(date : Date) {
    this.setState({...this.state, Date : date});
  }
  changePriceFrom(text : string) {
    const result = this.changeNumber(text, 2)
    const priceTo = parseFloat(this.state.Taux) * result.number
    this.setState({...this.state, From : {...this.state.From, Price : result.number}, To : {...this.state.To, Price : priceTo }, PriceFrom : result.text, PriceTo: ""+priceTo});
  }
  changePriceTo(text : string) {
    const result = this.changeNumber(text, 2)
    const taux = Math.round( (this.state.From.Price / result.number) * 1000000) / 1000000
    this.setState({...this.state, To : {...this.state.To, Price : result.number}, PriceTo : result.text, Taux : ""+(taux||0)});
  }
  changeWalletUUIDFrom(text : string) {
    const result = this.changeNumber(text, 2)
    this.setState({...this.state, From : {...this.state.From, WalletUUID : text}});
  }
  changeWalletUUIDTo(text : string) {
    const result = this.changeNumber(text, 2)
    this.setState({...this.state, To : {...this.state.From, WalletUUID : text}});
  }
  changeComment(text : string) {
    this.setState({...this.state, Comment : text});
  }

  render() {
    let content : any;
    if (this.state.Loading) {
      content = <Text>Chargement des Comptes</Text>
    } else {
      console.log("display", this.state);
      content = <View>
      <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.From.WalletUUID}
              onValueChange={(itemValue, itemIndex) => this.changeWalletUUIDFrom(itemValue)}>
              {
                this.state.Wallets.map(w =>
                  <Picker.Item key={w.UUID} label={`${w.Name} (${w.Currency.Code})`} value={w.UUID} />
                )
              }
            </Picker>
            <TextField keyboardType="numeric" placeholder="Price" onChangeText={(v:string) => this.changePriceFrom(v)} value={this.state.PriceFrom}/>
          </View>
          <View style={{flex:1}}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.To.WalletUUID}
              onValueChange={(itemValue, itemIndex) => this.changeWalletUUIDTo(itemValue)}>
              {
                this.state.Wallets.map(w =>
                  <Picker.Item key={w.UUID} label={`${w.Name} (${w.Currency.Code})`} value={w.UUID} />
                )
              }
            </Picker>
            <TextField keyboardType="numeric" placeholder="Price" onChangeText={(v:string) => this.changePriceTo(v)} value={this.state.PriceTo}/>
          </View>
        </View>
        <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)}/>
        <TextField placeholder="Comment" onChangeText={(v:string) => this.changeComment(v)} value={this.state.Comment}/>
        <RaisedButton onPress={() => this.save()}>Save</RaisedButton>
      </View>
    }
    return (
      <View>
        <AppBar title="Add Transflert">
          {
            <MyLink to={`/Wallet/${this.props.WalletUUID}/TransactionsView`}><Icon name="arrow_back" /></MyLink>
          }
        </AppBar>
        {content}
      </View>
    )
  }

  save() {
    this.setState({...this.state, Loading : true })
    let savePromise : Promise<any>
    if (this.props.TransfertUUID) {
      savePromise = Models.UpdateTransfert(this.props.TransfertUUID, this.state);
    } else {
      savePromise = Models.CreateTransfert(this.state);
    }
    savePromise.then(() => {
      this.props.history.goBack();
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddTransactionView;
