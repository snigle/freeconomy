// @ts-ignore
import { connectTheme, Divider, FlatButton } from "carbon-ui";
import {History} from "history";
import * as React from "react";
import {View} from "react-native";
import {Header} from "react-native-elements";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import Loading from "./Loading";
import * as Models from "./Models";
import MoreActions from "./MoreActions";
import SideBar, {SideBarClass} from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";
import {Category, Transaction, Transfert, Wallet} from "./Types";

interface IState {
  Transactions: Transaction[];
  Wallet: Wallet;
  Categories: Category[];
  Wallets: Wallet[];
  Transfert: Transfert[];
  displayOptions: boolean;
  TransactionsView: JSX.Element;
}

interface IProps {
  WalletUUID: string;
  Search?: string;
  history: History;
}

class TransactionsView extends React.Component<IProps, IState> {
  private sidebar?: SideBarClass;
  constructor(props: IProps) {
    super(props);
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
      Transfert : [],
      Categories : [],
      displayOptions : false,
      TransactionsView : <View></View>,
    };
  }

  public componentDidMount() {
      Promise.all([
        Models.GetAllTransactions().then((transactions) => transactions.filter((t) => {
          if (this.props.WalletUUID) {
            if (this.props.WalletUUID !== t.WalletUUID) {
              return false;
            }
          }
          if (this.props.Search) {
            if (!t.Beneficiary.match(this.props.Search) && !t.Comment.match(this.props.Search)) {
              return false;
            }
          }
          return true;
        })),
        Models.GetWallets(),
        Models.GetCategories(),
        Models.GetTransferts().then((transfert) => transfert.filter((t) => {
          if (this.props.WalletUUID) {
            if (this.props.WalletUUID !== t.From.WalletUUID && this.props.WalletUUID !== t.To.WalletUUID) {
              return false;
            }
          }
          if (this.props.Search) {
            if (!t.Comment.match(this.props.Search)) {
              return false;
            }
          }
          return true;
          },
        )),
      ])
      .then(([transactions, wallets, categories, transfert]) => {
        const wallet = wallets.find((w) => w.UUID === this.props.WalletUUID);
        if (!wallet) {
          this.props.history.goBack();
          return;
        }
        this.setState({
          Transactions : transactions,
          Transfert : transfert,
          Wallet : wallet,
          Categories : categories,
          Wallets : wallets,
          TransactionsView : <GroupTransactionsByDay
            Transfert={transfert}
            WalletUUID={this.props.WalletUUID}
            Wallets={wallets}
            Categories={categories}
            Transactions={transactions}
            Currency={wallet.Currency}
            history={this.props.history} />,
        });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err));

  }

  public render() {
    let content: any;
    let options: JSX.Element = <View></View>;
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        {
          title : t.t("transactionsView.addTransaction"),
          onPress : () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransactionView`),
        },
        {
          title : t.t("transactionsView.addTransfert"),
          onPress : () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransfertView`),
        },
        {
          title: t.t("transactionsView.importFromCSV"),
          onPress : () => this.props.history.push(`/ImportTransactionsView?walletUUID=${this.props.WalletUUID}`),
        },
      ]} clicked={() => this.setState({...this.state, displayOptions : false})}/>;
    }

    if (!this.state.Transactions || !this.state.Wallet) {
     content = <Loading Message={t.t("transactionsView.loading")} />;
   } else {
     console.log("transactions", this.state.Transactions, this.state.Transfert);
     content = this.state.TransactionsView;
   }

    return (
    <SideBar
      history={this.props.history}
      ref={(sidebar: any) => (this.sidebar = sidebar ? sidebar.getWrappedInstance() : null)}>
    <View style={{flex: 1}}>
    <Header
    outerContainerStyles={{height: 60}}
      leftComponent={{ icon: "menu", color: "#fff", onPress : () => this.sidebar && this.sidebar.openDrawer() }}
      centerComponent={{ text: this.state.Wallet.Name || t.t("common.title"), style: { fontSize: 20, color: "#fff" } }}
      rightComponent={{
        icon: this.state.displayOptions ? "expand-less" : "more-vert",
        color : "#fff",
        onPress: () => this.setState({...this.state, displayOptions : !this.state.displayOptions}),
      }}
    />
    <SyncBar history={this.props.history} refresh={() => this.componentDidMount()}/>
    {options}
    {content}
    </View>
    </SideBar>);
  }

}

export default TransactionsView;
