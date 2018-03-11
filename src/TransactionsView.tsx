import * as React from "react"
import * as Models from "./Models"
import {Wallet, Transaction, displayPrice} from "./Types"
import Loading from "./Loading"
import TransactionListItem from "./TransactionListItem"
import AddWalletView from "./AddWalletView"
import {View, Button, Text} from "react-native"
import {MyLink} from "./Link"
import * as _ from "lodash"
//@ts-ignore
import { AppBar, Icon, Paper, Display1, FlatButton, connectTheme, Divider } from 'carbon-ui'

interface State {
  Transactions ?: Transaction[],
  Wallet ?: Wallet,
}

interface Props {
  WalletUUID : string,
}

class TransactionsView extends React.Component<Props,State>{

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
      Promise.all([
        Models.GetAllTransactions(this.props.WalletUUID),
        Models.GetWallet(this.props.WalletUUID),
      ])
      .then(([transactions, wallet]) => this.setState({ Transactions : transactions, Wallet : wallet }))
      .catch((err) => console.log("fail to load transactions, need to reset ?", err))


  }

  render() {
    let content: any
    if (!this.state.Transactions) {
     content = <Loading Message="Chargement des transactions" />;
   } else {

       const total: number = 0
       console.log("transactions", this.state.Transactions)
       content = <View>
         {
           this.state.Transactions.map((transaction) =>
            this.state.Wallet &&
             <TransactionListItem key={transaction.UUID} Transaction={transaction} Currency={this.state.Wallet.Currency}></TransactionListItem>
           )
         }
         <Divider />
         </View>

   }

    return <View>
    <AppBar title="Freeconomy">
      {
        <View>
        <MyLink to="/"><Icon name="arrow_back" /></MyLink>
        <MyLink to={`/Wallet/${this.props.WalletUUID}/AddTransactionView`}><Icon name="add" /></MyLink>
        </View>
      }
    </AppBar>
    {content}
    </View>
  }

}

export default TransactionsView;
