import * as React from "react";
import {Text, View, TextInput, Picker, Button, TouchableOpacity, StyleSheet, TouchableHighlight} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {TransactionInput, Category, Transaction} from "./Types"
import DatePicker from "./DatePicker"
import {History} from "history"
import * as _ from "lodash"
import {Header, Icon} from "react-native-elements"
//@ts-ignore
import { TextField } from 'carbon-ui'
//@ts-ignore
import Autocomplete from "react-native-autocomplete-input"

interface State extends TransactionInput{
  Loading : boolean,
  PriceText : string,
  Categories : Category[],
  autocomplete : Autocomplete[],
}

interface Props {
  WalletUUID : string,
  TransactionUUID? : string,
  history : History,
}

interface AutoComplete {
  Beneficiary : string,
  CategoryUUID : string,
  Occurrencies : number,
}

function cleanTextToSearch(text :string) : string {
  return text.toLowerCase().replace(/( |'|-)/g,"");
}

class AddTransactionView extends React.Component<Props,State>{
  constructor(props: Props){
    super(props)
    const date = new Date();
    this.state = {
      Beneficiary : "",
      Comment : "",
      CategoryUUID : "",
      WalletUUID : props.WalletUUID,
      Price : 0,
      PriceText : "-0",
      Date : date,
      Categories : [],
      autocomplete : [],

      Loading : true,
    };
  }

  async componentDidMount() {
    let getTransactionPromise : Promise<any>;
    if (this.props.TransactionUUID) {
      getTransactionPromise = Models.GetTransaction(this.props.TransactionUUID).then(transaction => {
        this.setState({...this.state,
          Beneficiary : transaction.Beneficiary,
          CategoryUUID : transaction.CategoryUUID,
          Comment : transaction.Comment,
          Price : transaction.Price,
          PriceText : ""+transaction.Price,
          Date: transaction.Date,
          WalletUUID : transaction.WalletUUID,
      })
      })
    } else {
      getTransactionPromise = Promise.resolve()
    }

    Promise.all([
      Models.GetCategories().then(c => _.sortBy(_.uniqBy(c, c => c.Name), "Name")),
      Models.GetAllTransactions(this.props.WalletUUID),
      getTransactionPromise,
    ]).then(([categories, transactions]) => {
      let defaultCategory = categories[0];
      if (this.state.CategoryUUID) {
        defaultCategory = categories.find(c => c.UUID === this.state.CategoryUUID) || defaultCategory;
      }

      // Create map[beneficiary]categoryuuid to permits autocomplete beneficiary and category
      let autocomplete : Autocomplete[]= _.values(_.mapValues(_.groupBy<Transaction>(transactions, t => t.Beneficiary),
      (transactions, beneficiary) => {
        const result : AutoComplete = { Beneficiary : beneficiary, CategoryUUID : "", Occurrencies : 0};
        const last = _.last(transactions);
        if (last) {
          result.CategoryUUID = last.CategoryUUID
        }
        result.Occurrencies = transactions.length;
        return result;
      }
    )).sort((a,b) => b.Occurrencies - a.Occurrencies);
    console.log("autocomplete", autocomplete);
      this.setState({...this.state, Categories : categories, autocomplete : autocomplete, Loading : false})
    })
  }

  changeBenificiary(text : string) {
    this.setState({...this.state, Beneficiary : text});
  }
  autoCompleteClick(autocomplete : Autocomplete) {
    let categoryUUID = this.state.CategoryUUID
    if (_.find(this.state.Categories, c => c.UUID === autocomplete.CategoryUUID)) {
      categoryUUID = autocomplete.CategoryUUID;
    }
    this.setState({...this.state, Beneficiary : autocomplete.Beneficiary, CategoryUUID: categoryUUID});
  }
  changeComment(text : string) {
    this.setState({...this.state, Comment : text});
  }
  changeCategory(uuid : string) {
    console.log("change category", uuid);
    this.setState({...this.state, CategoryUUID : uuid})
  }
  changePrice(priceText : string) {
    const price = parseFloat(priceText)
    if (!price && priceText !== "-" && priceText !== "") {
      return
    }
    this.setState({...this.state, Price : price || 0, PriceText : priceText});
  }
  changeDate(date : Date) {
    this.setState({...this.state, Date : date});
  }
  toggleIsIncome() {
    const price = -this.state.Price;
    this.setState({...this.state, PriceText : `${price}`, Price : price});
  }

  render() {
    let content : any;
    if (this.state.Loading) {
      content = <Text>Chargement des categories</Text>
    } else {
      let autocomplete = _.filter(this.state.autocomplete, (auto) => cleanTextToSearch(auto.Beneficiary).match(cleanTextToSearch(this.state.Beneficiary))).slice(0,10);
      console.log("display", this.state);
      content = <View>
      <TextField placeholder="Benificiary" onChangeText={(v:string) => this.changeBenificiary(v)} value={this.state.Beneficiary}/>
          {(autocomplete.length === 1 && autocomplete[0].Beneficiary === this.state.Beneficiary)  || autocomplete.map((e) =>
            <TouchableHighlight onPress={() => this.autoCompleteClick(e)} style={{backgroundColor : "#2689dc0f", padding:2}}>
            <Text>{e.Beneficiary}</Text>
          </TouchableHighlight>)}
        <Picker
          style={{marginTop:10}}
          mode="dropdown"
          selectedValue={this.state.CategoryUUID}
          onValueChange={(itemValue, itemIndex) => this.changeCategory(itemValue)}>
          {
            this.state.Categories.map(category =>
              <Picker.Item key={category.UUID} label={category.Name} value={category.UUID} />
            )
          }
        </Picker>
        <View style={{marginTop:10}}>
        <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)}/>
        </View>
        <TextField keyboardType="numeric" placeholder="Price" onChangeText={(v:string) => this.changePrice(v)} value={this.state.PriceText}/>
        <Button title="Save" onPress={() => this.save()}/>
      </View>
    }
    return (
      <View>
      <Header
      outerContainerStyles={{height:60}}
        leftComponent={<MyLink to={`/Wallet/${this.state.WalletUUID}/TransactionsView`}><Icon name="arrow-back" /></MyLink>}
        centerComponent={{ text: 'Add Transaction', style: { fontSize: 20, color: '#fff' } }}
        rightComponent={this.props.TransactionUUID ? <View /> : <MyLink to={`AddTransfertView`}><Icon name="sync" /></MyLink>}
      />
        {content}
      </View>
    )
  }

  save() {
    this.setState({...this.state, Loading : true })
    let savePromise : Promise<any>
    if (this.props.TransactionUUID) {
      savePromise = Models.UpdateTransaction(this.props.TransactionUUID, this.state);
    } else {
      savePromise = Models.CreateTransaction(this.state);
    }
    savePromise.then(() => {
      this.props.history.goBack();
    }).catch((err: any) => console.log("error", err))
  }
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  }
});

export default AddTransactionView;
