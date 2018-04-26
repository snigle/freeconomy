import * as React from "react";
import {Text, View, TextInput, Picker, Button} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {TransactionInput, Category, Transaction} from "./Types"
import DatePicker from "./DatePicker"
import {History} from "history"
import * as _ from "lodash"
import {Header, Icon} from "react-native-elements"
//@ts-ignore
import { TextField } from 'carbon-ui'

interface State extends TransactionInput{
  Loading : boolean,
  PriceText : string,
  Categories : Category[],
}

interface Props {
  WalletUUID : string,
  TransactionUUID? : string,
  history : History,
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
      getTransactionPromise,
    ]).then(([categories]) => {
      let defaultCategory = categories[0];
      if (this.state.CategoryUUID) {
        defaultCategory = categories.find(c => c.UUID === this.state.CategoryUUID) || defaultCategory;
      }
      this.setState({...this.state, Categories : categories, Loading : false})
    })
  }

  changeBenificiary(text : string) {
    this.setState({...this.state, Beneficiary : text});
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
      console.log("display", this.state);
      content = <View>
        <TextField placeholder="Benificiary" onChangeText={(v:string) => this.changeBenificiary(v)} value={this.state.Beneficiary}/>
        <Picker
          mode="dropdown"
          selectedValue={this.state.CategoryUUID}
          onValueChange={(itemValue, itemIndex) => this.changeCategory(itemValue)}>
          {
            this.state.Categories.map(category =>
              <Picker.Item key={category.UUID} label={category.Name} value={category.UUID} />
            )
          }
        </Picker>
        <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)}/>
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

export default AddTransactionView;
