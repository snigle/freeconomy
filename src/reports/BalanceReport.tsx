import _ from "lodash";
import moment from "moment";
import querystring from "querystring";
import * as React from "react";
import { ActivityIndicator, Platform, ScrollView, TouchableHighlight, View } from "react-native";
import { Header, Text } from "react-native-elements";
import { RouteComponentProps } from "react-router";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";
// tslint:disable
// @ts-ignore
import { VictoryCursorContainer } from "victory-native";
// tslint:enable
import * as Models from "../Models";
import SideBar, { SideBarClass } from "../SideBar";
import t from "../translator";
import { displayPrice, ICurrency } from "../Types";
import BalanceReportItem from "./BalanceReportItem";

interface IFilters {
    currencyCode?: string;
    begin?: moment.Moment;
    end?: moment.Moment;
}

interface IPoint {
    income: number;
    outcome: number;
    balance: number;
    key: number;
}

interface ICoordinate {
    month: number;
    y: number;
}

interface IState {
    balanceData: ICoordinate[];
    incomeData: ICoordinate[];
    outcomeData: ICoordinate[];
    loading: boolean;
    displayOptions: boolean;
    data: IPoint[];
    Currency: ICurrency;
}

export default class extends React.Component<RouteComponentProps<any>, IState> {
    private sidebar?: SideBarClass;

    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.state = {
            loading: true,
            displayOptions: false,
            incomeData: [],
            outcomeData: [],
            balanceData: [],
            data: [],
            Currency: { Code: "", Symbol: "" },
        };
    }

    public parseFilters(props: RouteComponentProps<any>): IFilters {
        const queryParams = querystring.parse(props.location.search.replace("?", ""));
        let begin;
        let end = moment();
        if (queryParams.begin) {
            begin = moment(queryParams.begin);
        }
        if (queryParams.end) {
            end = moment(queryParams.end);
        }
        return {
            begin, end,
            currencyCode: _.isArray(queryParams.currencyCode) ?
                _.first(queryParams.currencyCode) : queryParams.currencyCode,
        };
    }

    public componentDidUpdate(oldProps: RouteComponentProps<any>) {
        const oldFilters = this.parseFilters(oldProps);
        const filters = this.parseFilters(this.props);
        if (!_.isEqual(oldFilters, filters)) {
            this.fetchData();
        }
    }

    public async fetchData() {
        const filters = this.parseFilters(this.props);
        let wallets = await Models.GetWallets();
        if (wallets.length === 0) {
            return;
        }
        if (!filters.currencyCode) {
            filters.currencyCode = wallets[0].Currency.Code;
        }
        wallets = wallets.filter((w) => w.Currency.Code === filters.currencyCode);
        let transactions = await Models.GetAllTransactions();
        transactions = transactions.filter((tr) => wallets.find((w) => w.UUID === tr.WalletUUID));
        const transferts = await Models.GetTransferts(...wallets.map((w) => w.UUID));

        // Group data by month.
        let data: { [key: number]: IPoint } = {};
        _.forEach(transactions, (tr) => {
            const key = moment(tr.Date).startOf("month").unix();
            const point: IPoint = data[key] || {
                income: 0,
                outcome: 0,
                balance: 0,
                key,
            };
            if (tr.Price > 0) {
                point.income += tr.Price;
            } else {
                point.outcome -= tr.Price;
            }
            data[key] = point;
        });
        _.forEach(transferts, (tr) => {
            const key = moment(tr.Date).startOf("month").unix();
            const point: IPoint = data[key] || {
                income: 0,
                outcome: 0,
                balance: 0,
                key,
            };
            if (!wallets.find((w) => w.UUID === tr.To.WalletUUID)) {
                point.outcome += tr.From.Price;
            } else if (!wallets.find((w) => w.UUID === tr.From.WalletUUID)) {
                point.income += tr.To.Price;
            }
            data[key] = point;
        });

        // Calculate accumulated balance.
        let accumulatedTotal = _.sum(wallets.map((w) => w.Solde));
        _.forEach(_.values(data).map((d) => d.key).sort(), (key) => {
            const point = data[key];
            accumulatedTotal += point.income;
            accumulatedTotal -= point.outcome;
            point.balance = accumulatedTotal;
        });

        if (filters.begin) {
            const begin = filters.begin;
            data = _.filter(data, (point) => (
                point.key >= begin.unix()
            ));
        }

        // Add a first point to draw a line if only one point of data.
        if (_.keys(data).length === 1) {
            const key = moment().startOf("month").add(-1, "month").unix();
            data[key] = { key, income: 0, outcome: 0, balance: 0 };
        }
        console.log("data", data);
        this.setState({
            ...this.state,
            balanceData: _.values(_.mapValues(data, (p, key) => ({ month: p.key * 1000, y: p.balance }))),
            incomeData: _.values(_.mapValues(data, (p, key) => ({ month: p.key * 1000, y: p.income }))),
            outcomeData: _.values(_.mapValues(data, (p, key) => ({ month: p.key * 1000, y: p.outcome }))),
            loading: false,
            data: _.values(data),
            Currency: wallets[0].Currency,
        });
    }

    public componentDidMount() {
        this.fetchData();
    }

    public render() {
        console.log("balance", this.state.balanceData);
        const totalMax: number = _.max(this.state.data.map((p) => Math.abs(p.income - p.outcome))) || 0;
        return <SideBar
            history={this.props.history}
            ref={(sidebar: any) => (this.sidebar = sidebar ? sidebar.getWrappedInstance() : null)}>
            <View style={{ flex: 1 }}>
                <Header
                    outerContainerStyles={{ height: 60 }}
                    leftComponent={{
                        icon: "menu", color: "#fff",
                        onPress: () => this.sidebar && this.sidebar.openDrawer(),
                    }}
                    centerComponent={{ text: t.t("balanceReport.title"), style: { fontSize: 20, color: "#fff" } }}
                    rightComponent={{
                        icon: this.state.displayOptions ? "expand-less" : "more-vert",
                        color: "#fff",
                        onPress: () => this.setState({ ...this.state, displayOptions: !this.state.displayOptions }),
                    }}
                />
                {this.state.loading ?
                    <View><ActivityIndicator size="large" color="#0000ff" /></View>
                    :
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ height: 400 }}>
                            <VictoryChart
                                containerComponent={<VictoryCursorContainer
                                    cursorLabel={(d: any) => `${moment(d.x).format("YYYY-MM")}, ${Math.round(d.y)}`}
                                />}
                            >
                                <VictoryLine
                                    data={this.state.balanceData}
                                    x="month"
                                    style={{ data: { stroke: "blue" } }}
                                />
                                <VictoryLine
                                    data={this.state.incomeData}
                                    x="month"
                                    style={{ data: { stroke: "green" } }}
                                />
                                <VictoryLine
                                    data={this.state.outcomeData}
                                    x="month"
                                    style={{ data: { stroke: "red" } }}
                                />
                                <VictoryAxis
                                    scale={{ x: "time" }}
                                    standalone={false}
                                    //   style={styles.axisYears}
                                    tickValues={this.state.balanceData.map((d) => d.month)}
                                    tickFormat={
                                        (x: number) => {
                                            return moment.unix(x / 1000).format("YYYY-MM");
                                        }
                                    }
                                    orientation="bottom"
                                    tickCount={5}

                                />
                                <VictoryAxis
                                    standalone={false}
                                    tickFormat={
                                        (x: number) => (x > 1000 ? `${x / 1000}k` : x)
                                    }
                                    orientation="left"
                                    dependentAxis

                                />
                            </VictoryChart>
                            <View>
                                {
                                    this.state.data.reverse().map((month) => (
                                        <TouchableHighlight
                                            key={month.key}
                                            onPress={() => this.props.history.push(
                                                `ReportPie?` +
                                                querystring.stringify({
                                                    currencyCode: this.state.Currency.Code,
                                                    begin: moment.unix(month.key).toISOString(),
                                                    end: moment.unix(month.key).add(1, "month").toISOString(),
                                                }),
                                            )}>
                                            <View>
                                                <BalanceReportItem
                                                    Balance={month.balance}
                                                    Currency={this.state.Currency}
                                                    Name={moment.unix(month.key).format("YYYY-MM")}
                                                    Total={month.income - month.outcome}
                                                    TotalMax={totalMax}
                                                />
                                            </View>
                                        </TouchableHighlight>))
                                }
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
        </SideBar>;
    }

}
