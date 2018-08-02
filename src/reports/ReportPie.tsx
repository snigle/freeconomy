import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
import * as React from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import { Header } from "react-native-elements";
import { RouteComponentProps } from "react-router";
import { v4 } from "uuid";
import { VictoryPie } from "victory-native";
import * as Models from "../Models";
import MoreActions from "../MoreActions";
import SideBar, { SideBarClass } from "../SideBar";
import t from "../translator";
import { displayPrice, ICategory, ICurrency, ITransaction } from "../Types";
import ReportByCategoryItem from "./ReportByCategoryItem";

interface Idata {
  y: number;
  label: string;
  x: string;
  Category: ICategory;
}
interface IState {
  datas: Idata[];
  Currency: ICurrency;
  displayOptions: boolean;
}

interface IFilters {
  begin: moment.Moment;
  end: moment.Moment;
  currencyCode?: string;
}

function rainbow(numOfSteps: number, step: number): string {
  // tslint:disable-next-line:max-line-length
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // tslint:disable-next-line:max-line-length
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r, g, b: number;
  const h = step / numOfSteps;
  // tslint:disable-next-line:no-bitwise
  const i = ~~(h * 6);
  const f = h * 6 - i;
  const q = 1 - f;
  const d = 0;
  const l = 1;
  switch (i % 6) {
    case 0: r = l; g = f; b = d; break;
    case 1: r = q; g = l; b = d; break;
    case 2: r = d; g = l; b = f; break;
    case 3: r = d; g = q; b = l; break;
    case 4: r = f; g = d; b = l; break;
    case 5: r = l; g = d; b = q; break;
    default: r = d; g = d; b = d;
  }
  // tslint:disable-next-line:no-bitwise max-line-length
  const c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

export default class extends React.Component<RouteComponentProps<any>, IState> {
  private sidebar?: SideBarClass;

  constructor(props: RouteComponentProps<any>) {
    super(props);
    this.state = {
      datas: [],
      Currency: { Code: "", Symbol: "?" },
      displayOptions: false,
    };

  }

  public parseFilters(props: RouteComponentProps<any>): IFilters {
    const queryParams = querystring.parse(props.location.search.replace("?", ""));
    let begin = moment().startOf("month");
    let end = moment();
    if (queryParams.begin) {
      begin = moment(queryParams.begin);
    }
    if (queryParams.end) {
      end = moment(queryParams.end);
    }
    return {
      begin, end,
      currencyCode: _.isArray(queryParams.currencyCode) ? _.first(queryParams.currencyCode) : queryParams.currencyCode,
    };
  }

  public componentDidUpdate(prevProps: RouteComponentProps<any>) {
    const prevFilters = this.parseFilters(prevProps);
    const filters = this.parseFilters(this.props);
    if (!_.isEqual(prevFilters, filters)) {
      this.componentDidMount();
    }
  }

  public componentDidMount() {
    const filters = this.parseFilters(this.props);
    console.log("did mount", filters);
    Promise.all([
      Models.GetAllTransactions(),
      Models.GetWallets(),
      Models.GetCategories(),
      filters.currencyCode ?
        Models.GetCurrency(filters.currencyCode) : Promise.resolve(this.state.Currency),
    ]).then(([transactions, wallets, categories, currency]) => {
      const categoriesByUUID: { [key: string]: ICategory } = _.mapValues(_.groupBy(categories, "UUID"), (c) => c[0]);
      wallets = wallets.filter((w) => w.Currency.Code === filters.currencyCode);
      transactions = transactions.filter((transaction) =>
        moment(transaction.Date).isAfter(filters.begin) &&
        moment(transaction.Date).isBefore(filters.end) &&
        wallets.find((w) => w.UUID === transaction.WalletUUID),
      );
      const transactionsByCategoryUUID = _.mapValues(
        _.groupBy(transactions, (transaction) => transaction.CategoryUUID),
        (groupedTransactions) =>
          _.reduce(groupedTransactions, (aggregate, transaction) => aggregate + transaction.Price, 0),
      );
      const defaultCategory: ICategory = {
        UUID: v4(),
        Name: "Unknown",
        Icon: { Name: "question", Type: "material", Color: "" },
        LastUpdate: new Date(),
      };
      const datas: Idata[] = _.values(_.mapValues(transactionsByCategoryUUID, (total, categoryUUID) =>
        ({ x: "", y: total, label: " ", Category: categoriesByUUID[categoryUUID] || defaultCategory })),
      );
      console.log("datas", datas);
      this.setState({
        ...this.state,
        datas: _.sortBy(_.filter(datas, (d) => d.y < 0).map((d) => ({ ...d, y: -d.y })), (d) => - d.y),
        Currency: currency,
      });
    });
  }

  public render() {
    const total = this.state.datas.reduce((agg, d) => (agg + d.y), 0);
    const totalMax = this.state.datas.length ? this.state.datas[0].y : 0;
    const filters = this.parseFilters(this.props);
    let options = <View></View>;
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        {
          title: t.t("reportPie.thisMonth"), onPress: () =>
            this.props.history.replace("/ReportPie?" + querystring.stringify({
              currencyCode: filters.currencyCode,
            })),
        },
        {
          title: t.t("reportPie.lastMonth"), onPress: () =>
            this.props.history.replace("/ReportPie?" + querystring.stringify({
              begin: moment().add(-1, "month").startOf("month").toISOString(),
              end: moment().startOf("month").toISOString(),
              currencyCode: filters.currencyCode,
            })),
        },
        {
          title: t.t("reportPie.thisYear"), onPress: () =>
            this.props.history.replace("/ReportPie?" + querystring.stringify({
              begin: moment().startOf("year").toISOString(),
              end: moment().endOf("year").toISOString(),
              currencyCode: filters.currencyCode,
            })),
        },
        {
          title: t.t("reportPie.lastYear"), onPress: () =>
            this.props.history.replace("/ReportPie?" + querystring.stringify({
              begin: moment().add(-1, "year").startOf("year").toISOString(),
              end: moment().startOf("year").toISOString(),
              currencyCode: filters.currencyCode,
            })),
        },
        {
          title: t.t("reportPie.all"), onPress: () =>
            this.props.history.replace("/ReportPie?" + querystring.stringify({
              begin: moment().add(-100, "year").startOf("year").toISOString(),
              end: moment().toISOString(),
              currencyCode: filters.currencyCode,
            })),
        },
      ]} clicked={() => this.setState({ ...this.state, displayOptions: false })} />;
    }
    return <SideBar
      history={this.props.history}
      ref={(sidebar: any) => (this.sidebar = sidebar ? sidebar.getWrappedInstance() : null)}>
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: 60 }}
          leftComponent={{ icon: "menu", color: "#fff", onPress: () => this.sidebar && this.sidebar.openDrawer() }}
          centerComponent={{ text: t.t("reportPie.title"), style: { fontSize: 20, color: "#fff" } }}
          rightComponent={{
            icon: this.state.displayOptions ? "expand-less" : "more-vert",
            color: "#fff",
            onPress: () => this.setState({ ...this.state, displayOptions: !this.state.displayOptions }),
          }}
        />
        {options}
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignSelf: "center", height: 200 }}>
            <VictoryPie height={200}
              padding={5}
              innerRadius={70}
              data={this.state.datas}
              colorScale={this.state.datas.map((v, k) => rainbow(this.state.datas.length, k + 1))} />
          </View>
          <View style={{ position: "absolute", top: 60, alignSelf: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>Total :</Text>
            <Text style={{ textAlign: "center", fontSize: 30 }}>{displayPrice(total, this.state.Currency)}</Text>
          </View>
          <View>
            {this.state.datas.map((d, i) =>
              <TouchableHighlight
                key={i}
                onPress={() => this.props.history.push(
                  `TransactionsByBeneficiary?` +
                  querystring.stringify({
                    categoryName: d.Category.Name,
                    begin: filters && filters.begin.toISOString(),
                    end: filters && filters.end.toISOString(),
                    currencyCode: filters && filters.currencyCode,
                  }),
                )}><View>
                  <ReportByCategoryItem
                    TotalMax={totalMax}
                    Category={d.Category}
                    TotalCategory={d.y}
                    Color={rainbow(this.state.datas.length, i)}
                    Currency={this.state.Currency}
                    history={this.props.history} />
                </View></TouchableHighlight>,
            )}
          </View>
        </ScrollView>
      </View>
    </SideBar>;
  }
}
