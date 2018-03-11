import * as React from "react";
import {Text, View, TextInput, Picker} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {TransactionInput, Category} from "./Types"
import DatePicker from "./DatePicker"
import {History} from "history"
//@ts-ignore
import { RaisedButton, TextField, AppBar, Icon } from 'carbon-ui'

interface State extends TransactionInput{
  Loading : boolean,
  PriceText : string,
  Category? : Category,
  Categories : Category[],
}

interface Props {
  WalletUUID : string,
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
    Promise.all([
      Models.GetCategories(),
    ]).then(([categories]) => {
      this.setState({...this.state, Categories : categories, Category : categories[0], Loading : false})
    })
  }

  changeBenificiary(text : string) {
    this.setState({...this.state, Beneficiary : text});
  }
  changeComment(text : string) {
    this.setState({...this.state, Comment : text});
  }
  changeCategory(category : Category) {
    console.log("change category", category);
    this.setState({...this.state, CategoryUUID : category.UUID, Category : category})
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
      content = <View>
        <TextField placeholder="Benificiary" onChangeText={(v:string) => this.changeBenificiary(v)} value={this.state.Beneficiary}/>
        <Picker
          mode="dropdown"
          selectedValue={this.state.Category}
          onValueChange={(itemValue, itemIndex) => this.changeCategory(this.state.Categories[itemIndex])}>
          {
            this.state.Categories.map(category =>
              <Picker.Item key={category.UUID} label={category.Name} value={category} />
            )
          }
        </Picker>
        <DatePicker value={this.state.Date} callback={(date: Date) => this.changeDate(date)}/>
        <TextField keyboardType="numeric" placeholder="Price" onChangeText={(v:string) => this.changePrice(v)} value={this.state.PriceText}/>
        <RaisedButton onPress={() => this.save()}>Save</RaisedButton>
      </View>
    }
    return (
      <View>
        <AppBar title="Add Transaction">
          {
            <MyLink to={`/Wallet/${this.state.WalletUUID}/TransactionsView`}><Icon name="arrow_back" /></MyLink>
          }
        </AppBar>
        {content}
      </View>
    )
  }

  save() {
    this.setState({...this.state, Loading : true })
    Models.CreateTransaction(this.state).then(() => {
      this.props.history.goBack();
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddTransactionView;
