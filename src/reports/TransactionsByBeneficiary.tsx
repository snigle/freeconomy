import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
import * as React from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";
import { Header, Text } from "react-native-elements";
import { Route, RouteComponentProps } from "react-router";
import GroupTransactionsByDay from "../GroupTransactionsByDay";
import Loading from "../Loading";
import * as Models from "../Models";
import MoreActions from "../MoreActions";
import SideBar, { SideBarClass } from "../SideBar";
import SyncBar from "../SyncBar";
import TransactionListItem from "../TransactionListItem";
import t from "../translator";
import { ICategory, ICurrency, ITransaction, ITransfert, IWallet } from "../Types";
import UpdateSoldeView from "../UpdateSoldeView";
import ReportByCategoryItem from "./ReportByCategoryItem";

interface IFilters {
  begin?: moment.Moment;
  end?: moment.Moment;
  categoryName?: string;
  currencyCode: string;
}

interface IState {
  Transactions: ITransaction[];
  Categories: ICategory[];
  Wallets: IWallet[];
  Beneficiaries: ITransaction[];
  displayOptions: boolean;
  Currency: ICurrency;
  filters: IFilters;
}

class TransactionsView extends React.Component<RouteComponentProps<any>, IState> {
  private sidebar?: SideBarClass;
  constructor(props: RouteComponentProps<any>) {
    super(props);
    const queryParams = querystring.parse(props.location.search.replace("?", ""));
    this.state = {
      Wallets: [],
      Transactions: [],
      Beneficiaries: [],
      Categories: [],
      displayOptions: false,
      Currency: { Code: "", Symbol: "" },
      filters: {
        begin: queryParams.begin ? moment(queryParams.begin) : undefined,
        end: queryParams.end ? moment(queryParams.end) : undefined,
        categoryName: _.isArray(queryParams.categoryName) ?
          _.first(queryParams.categoryName) : queryParams.categoryName,
        currencyCode: _.isArray(queryParams.currencyCode) ? queryParams.currencyCode[0] : queryParams.currencyCode,
      },
    };
  }

  public componentDidMount() {
    Promise.all([
      Models.GetAllTransactions(),
      Models.GetWallets().then((wallets) =>
        _.filter(wallets, (w) => w.Currency.Code === this.state.filters.currencyCode),
      ),
      Models.GetCategories(),
      Models.GetCurrency(this.state.filters.currencyCode),
    ])
      .then(([transactions, wallets, categories, currency]) =>
        ({
          transactions: transactions.filter((transaction) => {
            if (this.state.filters.begin && this.state.filters.begin.isAfter(moment(transaction.Date))) {
              return false;
            }
            if (this.state.filters.end && this.state.filters.end.isBefore(moment(transaction.Date))) {
              return false;
            }
            const category = _.find(categories, (c) => c.UUID === transaction.CategoryUUID);
            if (this.state.filters.categoryName && category && this.state.filters.categoryName !== category.Name) {
              return false;
            }
            if (!_.find(wallets, (w) => w.UUID === transaction.WalletUUID)) {
              return false;
            }
            return true;
          }),
          wallets,
          categories,
          currency,
        }))
      .then(({ transactions, wallets, categories, currency }) => {
        this.setState({
          ...this.state,
          Transactions: transactions,
          Categories: categories,
          Wallets: wallets,
          Currency: currency,
          Beneficiaries: _.values(_.groupBy(transactions, "Beneficiary")).map((values) => ({
            ...values[0],
            Price: Math.abs(_.reduce(values, (agg, tr) => tr.Price + agg, 0)),
          })).sort((a, b) => b.Price - a.Price),
        });
      })
      .catch((err) => console.log("fail to load transactions, need to reset ?", err));

  }

  public render() {
    let content: any;
    let options: JSX.Element = <View></View>;
    if (this.state.displayOptions) {
      options = <MoreActions actions={[

      ]} clicked={() => this.setState({ ...this.state, displayOptions: false })} />;
    }

    if (!this.state.Transactions) {
      content = <Loading Message={t.t("transactionsView.loading")} />;
    } else {
      console.log("transactions", this.state.Transactions);
      const total =
        content = <ScrollView style={{ flex: 1 }}>
          {this.state.Beneficiaries.map((b) => {
            const category =
              _.find(this.state.Categories, (ca) => ca.UUID === b.CategoryUUID) || this.state.Categories[0];
            return <TouchableHighlight
              key={b.Beneficiary}
              onPress={() => this.props.history.push(
                `TransactionsView?` +
                querystring.stringify({
                  begin: this.state.filters.begin ? this.state.filters.begin.toISOString() : undefined,
                  end: this.state.filters.end ? this.state.filters.end.toISOString() : undefined,
                  currencyCode: this.state.filters.currencyCode,
                  beneficiary: b.Beneficiary,
                  category: category.Name,
                }),
              )}><View><ReportByCategoryItem
                Category={{ ...category, Name: b.Beneficiary }}
                Color={category.Icon.Color}
                Currency={this.state.Currency}
                history={this.props.history}
                TotalCategory={b.Price}
                TotalMax={300}
              /></View></TouchableHighlight>;
          },
          )}
        </ScrollView>;
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
              text: this.state.filters.categoryName || t.t("common.title"),
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
