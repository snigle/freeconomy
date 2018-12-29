import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as React from "react";
import { Platform, SectionList, SectionListData, Text, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import * as Models from "./Models";
import DisplayDay from "./pureComponents/DisplayDay";
import TransactionListItem from "./TransactionListItem";
import { IFilters } from "./TransactionsView";
import TransfertListItem from "./TransfertListItem";
import { displayPrice, ICategory, ICurrency, ITransaction, ITransfert, IWallet } from "./Types";

interface ITransactionByDay { day: Date; transactions: IPricedTransaction[]; }

interface IPricedTransaction {
  Transaction?: ITransaction;
  Transfert?: ITransfert;
  UUID: string;
  Price: number;
  Total: number;
  Date: Date;
  key: string;
}

interface IProps {
  Transactions: ITransaction[];
  WalletUUID?: string;
  Transfert: ITransfert[];
  Currency: ICurrency;
  Categories: ICategory[];
  history: History;
  Wallets: IWallet[];
  Filters: IFilters;
}

interface ISelected {
  UUID: string;
  Total: number;
}

interface IState {
  Selected: ISelected[];
}

export default class extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { Selected: [] };
  }

  public displayItem(transaction: IPricedTransaction, props: IProps): JSX.Element {
    const categories = _.mapValues(_.groupBy(props.Categories, "UUID"), (t) => t[0]);
    const defaultCategory: ICategory = {
      Icon: { Name: "help", Color: "#517fa4", Type: "material" },
      LastUpdate: new Date(),
      Name: "Unknown",
      UUID: "",
    };

    if (transaction.Transaction) {
      return <TransactionListItem
        EditRoute={`/Wallet/${transaction.Transaction.WalletUUID}/AddTransactionView/${transaction.Transaction.UUID}`}
        Category={categories[transaction.Transaction.CategoryUUID] || defaultCategory}
        Currency={props.Currency}
        history={props.history}
        CurrentTotal={transaction.Total}
        Comment={transaction.Transaction.Comment}
        Description={transaction.Transaction.Beneficiary}
        Price={transaction.Price}
        UUID={transaction.UUID}
        WalletUUID={transaction.Transaction.WalletUUID}
        onDelete={() => Models.DeleteTransaction(transaction.UUID)
        }
        onSelect={(uuid, total) => this.select(uuid, total)}
        repeat={transaction.Transaction.Repeat !== null}
        Wallet={!props.WalletUUID ?
          props.Wallets.find((w) => w.UUID === (transaction.Transaction && transaction.Transaction.WalletUUID)) :
          undefined
        } />;
    } else if (transaction.Transfert) {

      const walletFrom = props.Wallets.find((w) =>
        (!_.isUndefined(transaction.Transfert) && w.UUID === transaction.Transfert.From.WalletUUID));
      const walletTo = props.Wallets.find((w) =>
        (!_.isUndefined(transaction.Transfert) && w.UUID === transaction.Transfert.To.WalletUUID));
      const income = (props.WalletUUID === transaction.Transfert.To.WalletUUID);

      return <TransactionListItem
        EditRoute={`/Wallet/${transaction.Transfert.From.WalletUUID}/AddTransfertView/${transaction.UUID}`}
        Category={{
          Icon: { Color: transaction.Price > 0 ? "#00AA00" : "#EE0000", Name: "sync", Type: "material" },
          Name: "",
          UUID: "",
          LastUpdate: new Date(),
        }}
        Currency={props.Currency}
        history={props.history}
        CurrentTotal={transaction.Total}
        Comment={""}
        Description={income ? `Transfert from ${walletFrom ? walletFrom.Name : "Wallet"}`
          : `Transfert to ${walletTo ? walletTo.Name : "Wallet"}`}
        Price={transaction.Price}
        UUID={transaction.UUID}
        WalletUUID={transaction.Transfert.From.WalletUUID}
        onSelect={(uuid, total) => this.select(uuid, total)}
        onDelete={() => Models.DeleteTransfert(transaction.UUID)
        }
        repeat={transaction.Transfert.Repeat !== null}
        Wallet={!props.WalletUUID ?
          props.Wallets.find((w) => w.UUID === (transaction.Transfert && transaction.Transfert.From.WalletUUID)) :
          undefined
        }
      />;
    } else {
      return <View />;
    }

  }

  public getSelected(): ISelected[] {
    return this.state.Selected;
  }

  public render() {
    const props: IProps = this.props;
    // console.log("transactions : ", props.Transactions);
    const groupedTransactions: ITransactionByDay[] = [];
    let pricedTransaction: IPricedTransaction[] = props.Transactions.map((t) => ({
      Date: t.Date,
      Price: t.Price,
      Total: 0,
      Transaction: t,
      key: t.UUID,
      UUID: t.UUID,
    }));
    pricedTransaction = pricedTransaction.concat(props.Transfert.map((transfert) => {
      let price = -transfert.From.Price;
      if (transfert.To.WalletUUID === props.WalletUUID) {
        price = transfert.To.Price;
      }
      return {
        Transfert: transfert, Total: 0, Price: price, Date: transfert.Date, key: transfert.UUID, UUID: transfert.UUID,
      };
    }));
    pricedTransaction = _.sortBy(pricedTransaction, (p) => -p.Date.getTime());
    const wallet = _.find(props.Wallets, (w) => w.UUID === props.WalletUUID);
    let total = wallet && !props.Filters.search ? wallet.Solde : 0;

    const searchRegex = new RegExp(props.Filters.search || "", "i");
    pricedTransaction = pricedTransaction.filter((transaction) => {
      if (transaction.Transaction) {
        if (props.WalletUUID) {
          if (props.WalletUUID !== transaction.Transaction.WalletUUID) {
            return false;
          }
        }
        if (props.Filters.search) {
          if (!transaction.Transaction.Beneficiary.match(searchRegex)
            && !transaction.Transaction.Comment.match(searchRegex)) {
            return false;
          }
        }
        if (props.Filters.beneficiary && props.Filters.beneficiary !== transaction.Transaction.Beneficiary) {
          return false;
        }
        if (props.Filters.begin && moment(props.Filters.begin).isAfter(transaction.Date)) {
          return false;
        }
        if (props.Filters.end && moment(props.Filters.end).isBefore(transaction.Date)) {
          return false;
        }
        if (props.Filters.total && props.Filters.total !== transaction.Price) {
          return false;
        }
        const categoryUUID = transaction.Transaction.CategoryUUID;
        const category = _.find(props.Categories, (ca) => ca.UUID === categoryUUID);
        if (category && props.Filters.category && category.Name !== props.Filters.category) {
          return false;
        }
      } else if (transaction.Transfert) {
        if (props.Filters.walletUUID) {
          if (props.Filters.walletUUID !== transaction.Transfert.From.WalletUUID &&
            props.Filters.walletUUID !== transaction.Transfert.To.WalletUUID) {
            return false;
          }
        } else {
          return true;
        }
        if (props.Filters.search) {
          if (!transaction.Transfert.Comment.match(searchRegex)) {
            return false;
          }
        }
        if (props.Filters.total && props.Filters.total !== transaction.Transfert.To.Price
          && props.Filters.total !== transaction.Transfert.From.Price) {
          return false;
        }
        return true;
      }
      return true;
    });

    // Take older to newer to count the subtotal.
    pricedTransaction.reverse().forEach((t) => {
      total += t.Price;
      t.Total = total;
    });

    // Group by day
    const grouped = _.groupBy<IPricedTransaction>(pricedTransaction, (t) =>
      new Date(t.Date.getFullYear(), t.Date.getMonth(), t.Date.getDate()).toString(),
    );
    _.forEach(grouped, (transactions, key) => {
      groupedTransactions.push({ day: new Date(key), transactions });
    });

    const ListSections: Array<SectionListData<IPricedTransaction>> = _.map(grouped, (day, key) => ({
      key: _.upperFirst(moment(day[0].Date).format("dddd Do MMMM YYYY")),
      data: day.reverse(), // Reverse to keep the good order for subtotal
    }));
    const content = <SectionList
      sections={ListSections.reverse()}
      renderItem={({ item }) =>
        this.displayItem(item, props)
      }
      ListHeaderComponent={Platform.OS === "web" ? undefined :
        <View style={{ height: groupedTransactions.length ? 120 : 0 }} />}
      inverted={Platform.OS !== "web"}
      viewabilityConfig={{
        minimumViewTime: 1000,
        viewAreaCoveragePercentThreshold: 100,
        waitForInteraction: false,
      }}

      renderSectionFooter={Platform.OS === "web" ? undefined : displayDay}
      renderSectionHeader={Platform.OS === "web" ? displayDay : undefined}
      automaticallyAdjustContentInsets={true}
      onLayout={() => console.log("onLayout")}
      maxToRenderPerBatch={10}
      refreshing={false}
      disableVirtualization={false}
      initialNumToRender={20}
      removeClippedSubviews={true}
      windowSize={10}
      stickySectionHeadersEnabled={Platform.OS === "web"}
      onViewableItemsChanged={(e) => console.log("onviewabledchanged", "")}
    />;

    return <View style={Platform.OS === "web" ? { flex: 1 } : {}}>
      {this.state.Selected.length ?
        <View style={{ backgroundColor: "rgb(230,230, 230)", padding: 10 }}>
          <Text style={{
            textAlign: "center", fontSize: 16, fontWeight: "bold",
            color: _.sum(this.state.Selected.map((s) => s.Total)) > 0 ? "green" : "red",
          }}>
            {displayPrice(_.sum(this.state.Selected.map((s) => s.Total)), this.props.Currency)}
            &nbsp;&nbsp; ({this.state.Selected.length})
          </Text>
        </View>
        : undefined}
      {content}
    </View>;
  }

  public select(uuid: string, total: number): Promise<boolean> {
    if (_.find(this.state.Selected, (s) => s.UUID === uuid)) {
      this.setState({ ...this.state, Selected: this.state.Selected.filter((s) => s.UUID !== uuid) });
    } else {
      this.setState({ ...this.state, Selected: _.concat(this.state.Selected, { UUID: uuid, Total: total }) });
    }
    return Promise.resolve(true);
  }
}

const displayDay = ({ section }: { section: SectionListData<IPricedTransaction> }) =>
  <DisplayDay title={section.key || ""} />;
