import * as React from "react"
import * as Models from "./Models"
import {Transfert, Wallet, Transaction, displayPrice, Category} from "./Types"
import Loading from "./Loading"
import GroupTransactionsByDay from "./GroupTransactionsByDay"
import AddWalletView from "./AddWalletView"
import {View, Button, Text, FlatList, Platform} from "react-native"
import {MyLink} from "./Link"
import {History} from "history"
import * as _ from "lodash"
//@ts-ignore
import { AppBar, Icon, Paper, Display1, FlatButton, connectTheme, Divider } from 'carbon-ui'


interface State {
  Transactions : Transaction[],
  Wallet : Wallet,
  Categories : Category[],
  Wallets : Wallet[],
  Transfert : Transfert[],
}

interface Props {
  WalletUUID : string,
  Search? : string,
  history : History,
}

class TransactionsView extends React.Component<Props,State>{

  constructor(props: Props) {
    super(props)
    this.state = {
      Wallet : {
        Currency : {
          Code : "",
          Symbol : "",
        },
        Description : "",
        Icon : {Name : "", Color : "", Type : "material"},
        LastUpdate : new Date(),
        Name : "",
        TotalPerYear : [],
        UUID : "",
      },
      Wallets : [],
      Transactions : [],
      Transfert :[],
      Categories : [],
    }
  }

  async componentDidMount() {
      Promise.all([
        Models.GetAllTransactions().then(transactions => transactions.filter(t => {
          if (this.props.WalletUUID) {
            if (this.props.WalletUUID !== t.WalletUUID) {
              return false;
            }
          }
          if (this.props.Search) {
            if(!t.Beneficiary.match(this.props.Search) && !t.Comment.match(this.props.Search)) {
              return false;
            }
          }
          return true;
        })),
        Models.GetWallets(),
        Models.GetCategories(),
        Models.GetTransferts().then(transfert => transfert.filter(t => {
          if (this.props.WalletUUID) {
            if (this.props.WalletUUID !== t.From.WalletUUID && this.props.WalletUUID !== t.To.WalletUUID) {
              return false;
            }
          }
          if (this.props.Search) {
            if(!t.Comment.match(this.props.Search)) {
              return false;
            }
          }
          return true;
          }
        ))
      ])
      .then(([transactions, wallets, categories, transfert]) => {
        const wallet = wallets.find(w => w.UUID === this.props.WalletUUID)
        if (!wallet) {
          this.props.history.goBack();
          return;
        }
        this.setState({ Transactions : transactions, Transfert : transfert, Wallet : wallet, Categories : categories, Wallets : wallets });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err))


  }

  render() {
    let content: any
    if (!this.state.Transactions) {
     content = <Loading Message="Chargement des transactions" />;
   } else if (!this.state.Wallet){
     content = <Loading Message="Chargement du wallet" />;
   } else {
     console.log("transactions", this.state.Transactions, this.state.Transfert)
       content =
       <GroupTransactionsByDay Transfert={this.state.Transfert} WalletUUID={this.props.WalletUUID} Wallets={this.state.Wallets} Categories={this.state.Categories} Transactions={this.state.Transactions} Currency={this.state.Wallet.Currency} history={this.props.history} />
   }

    return <View>
    <AppBar title={this.state.Wallet.Name || "Freeconomy"} >
      {
        <View style={{flexDirection:"row"}}>
        <MyLink to="/"><Icon name="arrow_back" /></MyLink>
        <MyLink to={`/Wallet/${this.props.WalletUUID}/AddTransactionView`}><Icon name="add" /></MyLink>
        <MyLink to={`/Wallet/${this.props.WalletUUID}/AddTransfertView`}><Icon name="add" /></MyLink>
        <MyLink to={`/ImportTransactionsView?walletUUID=${this.props.WalletUUID}`}><Button onPress={() => (console.log("import"))} title="Import" /></MyLink>
        </View>
      }
    </AppBar>
    {content}
    </View>
  }

}

export default TransactionsView;
