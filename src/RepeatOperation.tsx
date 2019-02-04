import * as _ from "lodash";
import moment from "moment";
import * as React from "react";
import { Button, Text, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { RouteComponentProps } from "react-router";
import { v4 } from "uuid";
import GroupTransactionsByDay from "./GroupTransactionsByDay";
import { MyLink } from "./Link";
import Loading from "./Loading";
import * as Models from "./Models";
import SideBar, { SideBarClass } from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";
import { ICategory, ITransaction, ITransactionInput, ITransfert, ITransfertInput, IWallet } from "./Types";

export interface IRepeatable {
    Transaction?: {
        New: ITransaction;
        From: ITransaction;
    };
    Transfert?: {
        New: ITransfert;
        From: ITransfert;
    };
    UUID: string;
}

export async function getRepeatOperations(): Promise<IRepeatable[]> {
    // Get all repeat transaction
    const transactions = await Models.GetAllTransactions().then(
        (trs) => trs.filter((tr) => tr.Repeat !== null),
    );
    const transferts = await Models.GetTransferts().then(
        (trs) => trs.filter((tr) => tr.Repeat !== null),
    );

    const results: IRepeatable[] = [];

    const repeatTreshold = moment().add(5, "days");
    _.forEach(transactions, (tr) => {
        if (!tr.Repeat) {
            return;
        }
        const repeatDate = moment(tr.Date).add(tr.Repeat.Duration, tr.Repeat.DurationType);
        if (tr.Repeat && tr.Repeat.MaxOccurrence !== 0 && repeatTreshold.isAfter(repeatDate)) {
            results.push({
                UUID: tr.UUID,
                Transaction: {
                    From: tr,
                    New: {
                        UUID: tr.UUID,
                        LastUpdate: tr.LastUpdate,
                        Beneficiary: tr.Beneficiary,
                        CategoryUUID: tr.CategoryUUID,
                        Comment: tr.Comment,
                        Date: repeatDate.toDate(),
                        Price: tr.Price,
                        Repeat: {
                            Duration: tr.Repeat.Duration,
                            DurationType: tr.Repeat.DurationType,
                            MaxOccurrence: (tr.Repeat.MaxOccurrence !== -1 ? tr.Repeat.MaxOccurrence - 1 : -1),
                        },
                        WalletUUID: tr.WalletUUID,
                    },
                },
            });
        }
    });

    _.forEach(transferts, (tr) => {
        if (!tr.Repeat) {
            return;
        }
        const repeatDate = moment(tr.Date).add(tr.Repeat.Duration, tr.Repeat.DurationType);
        if (tr.Repeat && tr.Repeat.MaxOccurrence !== 0 && repeatTreshold.isAfter(repeatDate)) {
            results.push({
                UUID: tr.UUID,
                Transfert: {
                    From: tr,
                    New: {
                        UUID: tr.UUID,
                        LastUpdate: tr.LastUpdate,
                        Comment: tr.Comment,
                        Date: repeatDate.toDate(),
                        Repeat: {
                            Duration: tr.Repeat.Duration,
                            DurationType: tr.Repeat.DurationType,
                            MaxOccurrence: (tr.Repeat.MaxOccurrence !== -1 ? tr.Repeat.MaxOccurrence - 1 : -1),
                        },
                        From: { ...tr.From },
                        To: { ...tr.To },
                    },
                },
            });
        }
    });

    console.log("repeatable", results);

    return results;
}

interface IState {
    Repeatables?: IRepeatable[];
    Categories: ICategory[];
    Wallets: IWallet[];
}

export default class extends React.PureComponent<RouteComponentProps<any>, IState> {
    private list: GroupTransactionsByDay | null;

    private sidebar: any;

    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.list = null;
        this.state = {
            Categories: [],
            Wallets: [],
        };
    }

    public componentDidMount() {
        Promise.all([
            getRepeatOperations(),
            Models.GetCategories(),
            Models.GetWallets(),
        ]).then(([repeatables, categories, wallets]) => this.setState({
            Repeatables: repeatables,
            Categories: categories,
            Wallets: wallets,
        }));
    }

    public render() {
        let content: JSX.Element;
        if (this.state.Repeatables === undefined) {
            content = <Loading Message={t.t("repeatOperation.loading")}></Loading>;
        } else if (this.state.Repeatables.length === 0) {
            content = <View><Text>{t.t("repeatOperation.empty")}</Text></View>;
        } else {
            content = <View style={{ flex: 1 }}>
                <GroupTransactionsByDay
                    ref={(gr) => { this.list = gr; }}
                    Categories={this.state.Categories}
                    Currency={{ Code: "", Symbol: "" }}
                    Filters={{}}
                    history={this.props.history}
                    Transactions={_.compact(this.state.Repeatables.map((r) => r.Transaction && r.Transaction.New))}
                    Transfert={_.compact(this.state.Repeatables.map((r) => r.Transfert && r.Transfert.New))}
                    Wallets={this.state.Wallets}
                ></GroupTransactionsByDay>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <Button title={t.t("repeatOperation.insertAll")} onPress={() =>
                            this.state.Repeatables && this.create(this.state.Repeatables)} />
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                        <Button title={t.t("repeatOperation.insertSelected")}
                            onPress={() => this.createSelected()} />
                    </View>
                </View>
            </View>;
        }

        return <SideBar
            history={this.props.history}
            ref={(sidebar: any) => (this.sidebar = sidebar)}>
            <View style={{ flex: 1 }}>
                <Header
                    containerStyle={{ height: 60 }}
                    leftComponent={
                        <MyLink to={`/`}>
                            <Icon name="arrow-back" />
                        </MyLink>
                    }
                    centerComponent={{
                        text: t.t("repeatOperation.title"),
                        style: { fontSize: 20, color: "#fff" },
                    }}
                />
                <SyncBar history={this.props.history} refresh={() => this.componentDidMount()} />
                {content}
            </View>
        </SideBar>;
    }

    public create(repeatables: IRepeatable[]) {
        console.log("import", repeatables);
        _.forEach(repeatables, (r) => {
            // Insert transfert/transaction and delete repeatable.
            if (r.Transaction) {
                const tr = r.Transaction;
                Models.CreateTransaction(r.Transaction.New).
                    then(() => Models.UpdateTransaction(tr.From.UUID,
                        _.omit({ ...tr.From, Repeat: null }, ["UUID"]))).
                    then(() => this.componentDidMount());
            } else if (r.Transfert) {
                const tr = r.Transfert;
                Models.CreateTransfert(r.Transfert.New).
                    then(() => Models.UpdateTransfert(tr.From.UUID, _.omit({ ...tr.From, Repeat: null }, ["UUID"]))).
                    then(() => this.componentDidMount());
            }
        });
    }

    public createSelected() {
        if (!this.state.Repeatables || !this.list) {
            return;
        }
        const selected = this.list.getSelected();
        this.create(this.state.Repeatables.filter((r) =>
            selected.find((s) => s.UUID === r.UUID)));
    }
}
