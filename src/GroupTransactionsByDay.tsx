// @ts-ignore
import { Display1, FlatButton, Paper } from "carbon-ui";
import { History } from "history";
import * as _ from "lodash";
import * as React from "react";
import { FlatList, Platform, ScrollView, Text, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import TransactionListItem from "./TransactionListItem";
import TransfertListItem from "./TransfertListItem";
import { ICategory, ICurrency, ITransaction, ITransfert, IWallet } from "./Types";

interface ITransactionByDay { day: Date; transactions: IPricedTransaction[]; }

interface IPricedTransaction {
  Transaction?: ITransaction;
  Transfert?: ITransfert;
  Price: number;
  Total: number;
  Date: Date;
}

interface IProps {
  Transactions: ITransaction[];
  WalletUUID: string;
  Transfert: ITransfert[];
  Currency: ICurrency;
  Categories: ICategory[];
  history: History;
  Wallets: IWallet[];
}

function displayTransaction(transactionByDay: ITransactionByDay, props: IProps): JSX.Element {
  const categories = _.mapValues(_.groupBy(props.Categories, "UUID"), (t) => t[0]);
  const defaultCategory: ICategory = {
    Icon: { Name: "help", Color: "#517fa4", Type: "material" },
    LastUpdate: new Date(),
    Name: "Unknown",
    UUID: "",
  };
  return (
    <View key={transactionByDay.day.toString()}>
      <Text style={{ backgroundColor: "rgb(130, 130, 130)", color: "white" }}>
        {transactionByDay.day.toLocaleString()}
      </Text>
      {
        transactionByDay.transactions.map((transaction, i) => {
          let element: JSX.Element = <View></View>;
          if (transaction.Transaction) {
            element = <TransactionListItem
              key={transaction.Transaction.UUID}
              Category={categories[transaction.Transaction.CategoryUUID] || defaultCategory}
              Transaction={transaction.Transaction}
              Currency={props.Currency}
              history={props.history}
              CurrentTotal={transaction.Total} />;
          } else if (transaction.Transfert) {
            element = <TransfertListItem
              key={transaction.Transfert.UUID}
              Transfert={transaction.Transfert}
              Currency={props.Currency}
              history={props.history}
              CurrentTotal={transaction.Total}
              Wallets={props.Wallets}
              WalletUUID={props.WalletUUID} />;
          }
          return <View key={element.key || i}>{element}<Divider /></View>;
        })
      }
    </View>
  );
}

export default function
  render(props: IProps) {
  console.log("transactions : ", props.Transactions);
  let content: any;
  const groupedTransactions: ITransactionByDay[] = [];
  let pricedTransaction: IPricedTransaction[] = props.Transactions.map((t) => ({
    Date: t.Date,
    Price: t.Price,
    Total: 0,
    Transaction: t,
  }));
  pricedTransaction = pricedTransaction.concat(props.Transfert.map((transfert) => {
    let price = 0;
    if (transfert.From.WalletUUID === props.WalletUUID) {
      price = -transfert.From.Price;
    } else if (transfert.To.WalletUUID === props.WalletUUID) {
      price = transfert.To.Price;
    }
    return { Transfert: transfert, Total: 0, Price: price, Date: transfert.Date };
  }));
  pricedTransaction = _.sortBy(pricedTransaction, (p) => -p.Date.getTime());
  let total = 0;
  pricedTransaction.reverse().forEach((t) => {
    total += t.Price;
    t.Total = total;
  });

  const grouped = _.groupBy(pricedTransaction, (t) =>
    new Date(t.Date.getFullYear(), t.Date.getMonth(), t.Date.getDate()).toString(),
  );
  _.forEach(grouped, (transactions, key) => {
    groupedTransactions.push({ day: new Date(key), transactions });
  });
  if (Platform.OS === "web") {
    content = <ScrollView>
      {
        // Display only last 200 transactions as it slow to load
        // TODO find a way to display more transactions.
        _.takeRight(groupedTransactions, 100).map((i) => displayTransaction(i, props))
        // groupedTransactions.slice(groupedTransactions.length-200,groupedTransactions.length)
        // .map(i => displayTransaction(i,props))
      }
      <View style={{ height: 100 }} />
    </ScrollView>;
  } else {
    // Margin bottom to fix missing element due to the appBar ...
    content = <FlatList style={{ paddingBottom: 100 }}
      data={groupedTransactions.reverse()}
      keyExtractor={(item: ITransactionByDay) => item.day.toISOString()}
      inverted
      renderItem={({ item }) => displayTransaction(item, props)}
    />;
  }

  return <View style={{ flex: 1 }}>
    <Icon
      raised
      containerStyle={{ position: "absolute", zIndex: 999, right: 20, bottom: 20 }}
      name="add"
      color="#517fa4"
      onPress={() => props.history.push(`/Wallet/${props.WalletUUID}/AddTransactionView`)} />
    {content}
  </View>;
}
