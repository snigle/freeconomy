import * as React from "react"
import * as Models from "./Models"
import {Transfert, Wallet, Transaction, displayPrice, Category} from "./Types"
import Loading from "./Loading"
import GroupTransactionsByDay from "./GroupTransactionsByDay"
import AddWalletView from "./AddWalletView"
import {View, Button, Text, FlatList, Platform} from "react-native"
import {MyLink} from "./Link"
import {History} from "history"
import SideBar from "./SideBar"
import {Header, Icon} from "react-native-elements"
import * as _ from "lodash"
import MoreActions from "./MoreActions"
import SyncBar from "./SyncBar"
//@ts-ignore
import { FlatButton, connectTheme, Divider } from 'carbon-ui'


interface State {
  Transactions : Transaction[],
  Wallet : Wallet,
  Categories : Category[],
  Wallets : Wallet[],
  Transfert : Transfert[],
  displayOptions : boolean,
  TransactionsView : JSX.Element,
}

interface Props {
  WalletUUID : string,
  Search? : string,
  history : History,
}

class TransactionsView extends React.Component<Props,State>{
  private sidebar? : SideBar
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
      displayOptions : false,
      TransactionsView : <View></View>
    }
  }

  componentDidMount() {
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
        this.setState({ Transactions : transactions, Transfert : transfert, Wallet : wallet, Categories : categories, Wallets : wallets,
        TransactionsView : <GroupTransactionsByDay Transfert={transfert} WalletUUID={this.props.WalletUUID} Wallets={wallets} Categories={categories} Transactions={transactions} Currency={wallet.Currency} history={this.props.history} /> });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err))


  }

  render() {
    let content: any
    let options: JSX.Element = <View></View>
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        {title : "Add Transaction", onPress : () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransactionView`)},
        {title : "Add Transfert", onPress : () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransfertView`)},
        {title: "Import from csv", onPress : () => this.props.history.push(`/ImportTransactionsView?walletUUID=${this.props.WalletUUID}`)},
      ]} />
    }

    if (!this.state.Transactions) {
     content = <Loading Message="Chargement des transactions" />;
   } else if (!this.state.Wallet){
     content = <Loading Message="Chargement du wallet" />;
   } else {
     console.log("transactions", this.state.Transactions, this.state.Transfert)
       content = this.state.TransactionsView;
   }

    return (
    <SideBar history={this.props.history} ref={(sidebar: SideBar) => this.sidebar = sidebar}>
    <View style={{flex:1}}>
    <Header
    outerContainerStyles={{height:60}}
      leftComponent={{ icon: 'menu', color: '#fff', onPress : () => this.sidebar && this.sidebar.openDrawer() }}
      centerComponent={{ text: this.state.Wallet.Name || "Freeconomy", style: { fontSize: 20, color: '#fff' } }}
      rightComponent={{ icon:this.state.displayOptions ? "expand-less" : "more-vert", color : "#fff", onPress:() => this.setState({...this.state, displayOptions : !this.state.displayOptions})}}
    />
    <SyncBar history={this.props.history}/>
    {options}
    {content}
    </View>
    </SideBar>)
  }

}

export default TransactionsView;
