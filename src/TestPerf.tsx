import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
import * as React from "react";
import { FlatList, Text, View } from "react-native";
import { Header, Icon, SearchBar } from "react-native-elements";
import { Route, RouteComponentProps } from "react-router";
// import { List } from "react-virtualized";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import { MyLink } from "./Link";
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
  displaySearch: boolean;
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

class TransactionsView extends React.Component<RouteComponentProps, IState> {
  private sidebar?: SideBarClass;
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      Title: t.t("common.title"),
      Wallets: [],
      Transactions: [],
      Transfert: [],
      Categories: [],
      displayOptions: false,
      TransactionsView: <View></View>,
      displaySearch: false,
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public parseFilters(props: RouteComponentProps): IFilters {
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

  // public componentDidUpdate(oldProps: RouteComponentProps<any>) {
  //   const oldFilters = this.parseFilters(oldProps);
  //   const filters = this.parseFilters(this.props);
  //   if (!_.isEqual(oldFilters, filters)) {
  //     this.fetchData();
  //   }
  // }

  public fetchData() {
    // const filters = this.parseFilters(this.props);
    Models.GetAllTransactions().then((tr) => this.setState({ ...this.state, Transactions: tr }))
      .catch((err) => console.log("fail to load transactions, need to reset ?", err));
  }

  public render() {
    return <View style={{ flex: 1 }}>
      <FlatList
        key="vd"
        renderItem={({ item }) => <Item item={item} />}
        data={this.state.Transactions}
      />
    </View>;
  }

}

// tslint:disable-next-line:max-classes-per-file
class Item extends React.PureComponent<{ item: ITransaction }> {
  public render() {
    return <View style={{ flexDirection: "row" }}>
      <Text style={{ height: 50 }}>{this.props.item.Beneficiary}</Text>
    </View>;
  }
}
export default TransactionsView;
