import { History } from "history";
import * as React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { Route, RouteComponentProps } from "react-router";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import Loading from "./Loading";
import * as Models from "./Models";
import MoreActions from "./MoreActions";
import SideBar, { SideBarClass } from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";
import { ICategory, ITransaction, ITransfert, IWallet } from "./Types";
import UpdateSoldeView from "./UpdateSoldeView";

interface IState {
  Transactions: ITransaction[];
  Wallet: IWallet;
  Categories: ICategory[];
  Wallets: IWallet[];
  Transfert: ITransfert[];
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
      Wallet: {
        Currency: {
          Code: "",
          Symbol: "",
        },
        Description: "",
        Icon: { Name: "", Color: "", Type: "material" },
        LastUpdate: new Date(),
        Name: "",
        TotalPerYear: [],
        UUID: "",
        Solde: 0,
      },
      Wallets: [],
      Transactions: [],
      Transfert: [],
      Categories: [],
      displayOptions: false,
      TransactionsView: <View></View>,
    };
  }

  public componentDidMount() {
    Promise.all([
      Models.GetAllTransactions().then((transactions) => transactions.filter((transaction) => {
        if (this.props.WalletUUID) {
          if (this.props.WalletUUID !== transaction.WalletUUID) {
            return false;
          }
        }
        if (this.props.Search) {
          if (!transaction.Beneficiary.match(this.props.Search) && !transaction.Comment.match(this.props.Search)) {
            return false;
          }
        }
        return true;
      })),
      Models.GetWallets(),
      Models.GetCategories(),
      Models.GetTransferts().then((transferts) => transferts.filter((transfert) => {
        if (this.props.WalletUUID) {
          if (this.props.WalletUUID !== transfert.From.WalletUUID &&
            this.props.WalletUUID !== transfert.To.WalletUUID) {
            return false;
          }
        }
        if (this.props.Search) {
          if (!transfert.Comment.match(this.props.Search)) {
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
          Transactions: transactions,
          Transfert: transfert,
          Wallet: wallet,
          Categories: categories,
          Wallets: wallets,
          TransactionsView: <GroupTransactionsByDay
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
          title: t.t("transactionsView.addTransaction"),
          onPress: () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransactionView`),
        },
        {
          title: t.t("transactionsView.addTransfert"),
          onPress: () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/AddTransfertView`),
        },
        {
          title: t.t("transactionsView.importFromCSV"),
          onPress: () => this.props.history.push(`/ImportTransactionsView?walletUUID=${this.props.WalletUUID}`),
        },
        {
          title: t.t("transactionsView.updateSolde"),
          onPress: () => this.props.history.push(`/Wallet/${this.props.WalletUUID}/TransactionsView/UpdateSoldeView`),
        },
      ]} clicked={() => this.setState({ ...this.state, displayOptions: false })} />;
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
        <View style={{ flex: 1 }}>
          <Header
            outerContainerStyles={{ height: 60 }}
            leftComponent={{ icon: "menu", color: "#fff", onPress: () => this.sidebar && this.sidebar.openDrawer() }}
            centerComponent={{
              text: this.state.Wallet.Name || t.t("common.title"),
              style: { fontSize: 20, color: "#fff" },
            }}
            rightComponent={{
              icon: this.state.displayOptions ? "expand-less" : "more-vert",
              color: "#fff",
              onPress: () => this.setState({ ...this.state, displayOptions: !this.state.displayOptions }),
            }}
          />
          <SyncBar history={this.props.history} refresh={() => this.componentDidMount()} />
          {options}
          {content}
          <Route
            path="/Wallet/:WalletUUID/TransactionsView/UpdateSoldeView"
            component={(props: RouteComponentProps<{ WalletUUID: string }>) =>
              <UpdateSoldeView
                WalletUUID={props.match.params.WalletUUID}
                history={props.history} />
            }
          />
        </View>
      </SideBar>);
  }

}

export default TransactionsView;
