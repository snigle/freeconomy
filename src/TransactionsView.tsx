import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
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
  Categories: ICategory[];
  Wallets: IWallet[];
  Transfert: ITransfert[];
  displayOptions: boolean;
  TransactionsView: JSX.Element;
  Title: string;
}

interface IFilters {
  walletUUID?: string;
  beneficiary?: string;
  currencyCode?: string;
  search?: string;
  begin?: moment.Moment;
  end?: moment.Moment;
  category?: string;
  total?: number;
}

interface IProps {
  history: History;
}

class TransactionsView extends React.Component<RouteComponentProps<IProps>, IState> {
  private sidebar?: SideBarClass;
  constructor(props: RouteComponentProps<IProps>) {
    super(props);
    this.state = {
      Title: t.t("common.title"),
      Wallets: [],
      Transactions: [],
      Transfert: [],
      Categories: [],
      displayOptions: false,
      TransactionsView: <View></View>,
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public parseFilters(props: RouteComponentProps<IProps>): IFilters {
    const queryParams = querystring.parse(props.location.search.replace("?", ""));

    return {
      walletUUID: _.isArray(queryParams.walletUUID) ? _.first(queryParams.walletUUID) : queryParams.walletUUID,
      category: _.isArray(queryParams.category) ? _.first(queryParams.category) : queryParams.category,
      beneficiary: _.isArray(queryParams.beneficiary) ? _.first(queryParams.beneficiary) : queryParams.beneficiary,
      currencyCode: _.isArray(queryParams.currencyCode) ?
        _.first(queryParams.currencyCode) : queryParams.currencyCode,
      search: _.isArray(queryParams.search) ? _.first(queryParams.search) : queryParams.search,
      begin: queryParams.begin ? moment(queryParams.begin) : undefined,
      end: queryParams.end ? moment(queryParams.end) : undefined,
      total: (() => {
        const totalString = _.isArray(queryParams.total) ? _.first(queryParams.total) : queryParams.total;
        return totalString ? parseInt(totalString, 10) : undefined;
      })(),
    };
  }

  public componentDidUpdate(oldProps: RouteComponentProps<any>) {
    const oldFilters = this.parseFilters(oldProps);
    const filters = this.parseFilters(this.props);
    if (!_.isEqual(oldFilters, filters)) {
      this.fetchData();
    }
  }

  public fetchData() {
    const filters = this.parseFilters(this.props);
    Models.GetCategories().then((categories) =>
      Promise.all([
        Models.GetAllTransactions().then((transactions) => transactions.filter((transaction) => {
          if (filters.walletUUID) {
            if (filters.walletUUID !== transaction.WalletUUID) {
              return false;
            }
          }
          if (filters.search) {
            if (!transaction.Beneficiary.match(filters.search)
              && !transaction.Comment.match(filters.search)) {
              return false;
            }
          }
          if (filters.beneficiary && filters.beneficiary !== transaction.Beneficiary) {
            return false;
          }
          if (filters.begin && moment(filters.begin).isAfter(transaction.Date)) {
            return false;
          }
          if (filters.end && moment(filters.end).isBefore(transaction.Date)) {
            return false;
          }
          if (filters.total && filters.total !== transaction.Price) {
            return false;
          }
          const category =
            _.find(categories, (ca) => ca.UUID === transaction.CategoryUUID);
          if (category && filters.category && category.Name !== filters.category) {
            return false;
          }
          return true;
        })),
        Models.GetWallets(),
        Promise.resolve(categories),
        Models.GetTransferts().then((transferts) => transferts.filter((transfert) => {
          if (filters.walletUUID) {
            if (filters.walletUUID !== transfert.From.WalletUUID &&
              filters.walletUUID !== transfert.To.WalletUUID) {
              return false;
            }
          } else {
            return false;
          }
          if (filters.search) {
            if (!transfert.Comment.match(filters.search)) {
              return false;
            }
          }
          if (filters.total && filters.total !== transfert.To.Price && filters.total !== transfert.From.Price) {
            return false;
          }
          return true;
        },
        )),
        filters.currencyCode ?
          Models.GetCurrency(filters.currencyCode) : Promise.resolve(undefined),
      ]))
      .then(([transactions, wallets, categories, transfert, currency]) => {
        let title = this.state.Title;
        const wallet = wallets.find((w) => w.UUID === filters.walletUUID);
        if (wallet && wallet.Name) {
          title = wallet.Name;
        } else if (filters.beneficiary) {
          title = filters.beneficiary;
        }
        if (!currency && wallet) {
          currency = wallet.Currency;
        }
        if (!currency) {
          throw new Error("missing walletUUID or currencyCode params");
        }
        this.setState({
          Title: title,
          Transactions: transactions,
          Transfert: transfert,
          Categories: categories,
          Wallets: wallets,
          TransactionsView: <GroupTransactionsByDay
            Transfert={transfert}
            WalletUUID={filters.walletUUID}
            Wallets={wallets}
            Categories={categories}
            Transactions={transactions}
            Currency={currency}
            history={this.props.history} />,
        });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err));
  }

  public render() {
    let content: any;
    let options: JSX.Element = <View></View>;
    const filters = this.parseFilters(this.props);

    if (this.state.displayOptions && filters.walletUUID) {
      options = <MoreActions actions={[
        {
          title: t.t("transactionsView.addTransaction"),
          onPress: () => this.props.history.push(`/Wallet/${filters.walletUUID}/AddTransactionView`),
        },
        {
          title: t.t("transactionsView.addTransfert"),
          onPress: () => this.props.history.push(`/Wallet/${filters.walletUUID}/AddTransfertView`),
        },
        {
          title: t.t("transactionsView.importFromCSV"),
          onPress: () => this.props.history.push(`/ImportTransactionsView?walletUUID=${filters.walletUUID}`),
        },
        {
          title: t.t("transactionsView.updateSolde"),
          onPress: () =>
            this.props.history.push(`TransactionsView/UpdateSoldeView?walletUUID=${filters.walletUUID}`),
        },
      ]} clicked={() => this.setState({ ...this.state, displayOptions: false })} />;
    }

    if (!this.state.Transactions) {
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
              text: this.state.Title,
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
            path={`/TransactionsView/UpdateSoldeView`}
            component={(props: RouteComponentProps<{}>) => {
              const queryParams = querystring.parse(props.location.search.replace("?", ""));
              if (!queryParams) {
                return null;
              }
              const walletUUID = _.isArray(queryParams.walletUUID) ?
                _.first(queryParams.walletUUID) :
                queryParams.walletUUID;
              if (!walletUUID) {
                return null;
              }
              return <UpdateSoldeView
                WalletUUID={walletUUID}
                history={props.history} />;
            }}
          />
        </View>
      </SideBar>);
  }

}

export default TransactionsView;
