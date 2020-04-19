import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
import * as React from "react";
import { View } from "react-native";
import { Header, Icon, SearchBar } from "react-native-elements";
import { Route, RouteComponentProps } from "react-router";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import Loading from "./Loading";
import * as Models from "./Models";
import MoreActions from "./MoreActions";
import SideBar, { SideBarClass } from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";
import { ICategory, ICurrency, ITransaction, ITransfert, IWallet } from "./Types";
import UpdateSoldeView from "./UpdateSoldeView";

interface IState {
  Transactions: ITransaction[];
  Categories: ICategory[];
  Wallets: IWallet[];
  Transfert: ITransfert[];
  displayOptions: boolean;
  Title: string;
  Currency: ICurrency;
}

export interface IFilters {
  walletUUID?: string;
  beneficiary?: string;
  currencyCode?: string;
  search?: string;
  begin?: moment.Moment;
  end?: moment.Moment;
  category?: string;
  total?: number;
}

interface IProps extends RouteComponentProps {
  history: History;
}

class TransactionsView extends React.Component<IProps, IState> {
  private sidebar?: SideBarClass;
  constructor(props: IProps) {
    super(props);
    this.state = {
      Title: t.t("common.title"),
      Wallets: [],
      Transactions: [],
      Transfert: [],
      Categories: [],
      displayOptions: false,
      Currency: { Code: "", Symbol: "?" },
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public parseFilters(props: IProps): IFilters {
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
  }

  public fetchData() {
    const filters = this.parseFilters(this.props);
    Models.GetCategories().then((categories) =>
      Promise.all([
        Models.GetAllTransactions(),
        Models.GetWallets(),
        Promise.resolve(categories),
        Models.GetTransferts(),
        filters.currencyCode ?
          Models.GetCurrency(filters.currencyCode) : Promise.resolve(undefined),
      ]))
      .then(([transactions, wallets, categories, transfert, currency]) => {
        let title = this.state.Title;
        // Promise.All add | undefined on every types returned.. Should be patched in next typescript release.
        if (_.isUndefined(wallets) || _.isUndefined(transfert) || _.isUndefined(transactions) || _.isUndefined(categories)) {
          throw "internal error, promise.all should not return undefined values"
        }
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
          Currency: currency,
        });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err));
  }

  public render() {
    let content: any;
    let options: JSX.Element = <View></View>;
    let search: JSX.Element = <View></View>;
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

    if (!_.isUndefined(filters.search)) {
      search = <SearchBar
        searchIcon={false}
        lightTheme={true}
        containerStyle={{ marginTop: -1 }}
        round
        value={filters.search}
        onChangeText={(text: string) => {
          this.props.history.replace("/TransactionsView?" + querystring.stringify(
            {
              ...querystring.parse(this.props.location.search.replace("?", "")),
              currencyCode: this.state.Wallets[0].Currency.Code,
              walletUUID: filters.walletUUID,
              search: text,
            },
          ));
        }}
        placeholder="Type Here..." />;
    }

    if (!this.state.Transactions) {
      content = <Loading Message={t.t("transactionsView.loading")} />;
    } else {
      // console.log("transactions", this.state.Transactions, this.state.Transfert);
      content = <GroupTransactionsByDay
        Filters={filters}
        Transfert={this.state.Transfert}
        WalletUUID={filters.walletUUID}
        Wallets={this.state.Wallets}
        Categories={this.state.Categories}
        Transactions={this.state.Transactions}
        Currency={this.state.Currency}
        history={this.props.history} />;
    }
    return (
      <SideBar
        history={this.props.history}
        ref={(sidebar: any) => (this.sidebar = sidebar)}>
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={{ height: 60 }}
            leftComponent={{ icon: "menu", color: "#fff", onPress: () => this.sidebar && this.sidebar.openDrawer() }}
            centerComponent={{
              text: this.state.Title,
              style: { fontSize: 20, color: "#fff" },
            }}
            rightComponent={<View style={{ flexDirection: "row" }}>
              <Icon
                name="search"
                color="#fff"
                onPress={() => this.props.history.push("/TransactionsView?" +
                  (!_.isUndefined(filters.search) ?
                    querystring.stringify(_.omit(
                      querystring.parse(this.props.location.search.replace("?", "")), "search")) :
                    querystring.stringify({
                      ...querystring.parse(this.props.location.search.replace("?", "")),
                      search: "",
                    })))}
                containerStyle={{ marginRight: 10 }} />
              <Icon
                name={this.state.displayOptions ? "expand-less" : "more-vert"}
                color="#fff"
                onPress={() => this.setState({ ...this.state, displayOptions: !this.state.displayOptions })} />
            </View>}
          />
          <SyncBar history={this.props.history} refresh={() => this.componentDidMount()} />
          {options}
          {search}
          {content}
          {!filters.walletUUID ? undefined :
            <Icon
              raised
              containerStyle={{ position: "absolute", zIndex: 999, right: 5, bottom: 0 }}
              name="add"
              color="#517fa4"
              onPress={() => this.props.history.push(`/Wallet/${filters.walletUUID}/AddTransactionView`)} />}
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
