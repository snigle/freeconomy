import * as React from "react"
import * as Models from "./Models"
import {Wallet, Transaction, displayPrice} from "./Types"
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
  Transactions ?: Transaction[],
  Wallet : Wallet,
}

interface Props {
  WalletUUID : string,
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
        Icon : "",
        LastUpdate : new Date(),
        Name : "",
        TotalPerYear : [],
        UUID : "",
      }
    }
  }

  async componentDidMount() {
      Promise.all([
        Models.GetAllTransactions(this.props.WalletUUID),
        Models.GetWallet(this.props.WalletUUID),
      ])
      .then(([transactions, wallet]) => {
        this.setState({ Transactions : transactions, Wallet : wallet });
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
     console.log("transactions", this.state.Transactions)
       content =
       <GroupTransactionsByDay Transactions={this.state.Transactions} Currency={this.state.Wallet.Currency} history={this.props.history} />
   }

    return <View>
    <AppBar title={this.state.Wallet.Name || "Freeconomy"} >
      {
        <View style={{flexDirection:"row"}}>
        <MyLink to="/"><Icon name="arrow_back" /></MyLink>
        <MyLink to={`/Wallet/${this.props.WalletUUID}/AddTransactionView`}><Icon name="add" /></MyLink>
        <MyLink to={`/ImportTransactionsView?walletUUID=${this.props.WalletUUID}`}><Button onPress={() => (console.log("import"))} title="Import" /></MyLink>
        </View>
      }
    </AppBar>
    {content}
    </View>
  }

}

export default TransactionsView;
