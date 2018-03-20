import * as React from "react"
import {View, Button, Text, FlatList, Platform} from "react-native"
import * as Models from "./Models"
import {Wallet, Currency, Transaction, displayPrice, Category, Transfert} from "./Types"
import Loading from "./Loading"
import TransactionListItem from "./TransactionListItem"
import TransfertListItem from "./TransfertListItem"
import AddWalletView from "./AddWalletView"
import {MyLink} from "./Link"
import {History} from "history"
import * as _ from "lodash"
//@ts-ignore
import { AppBar, Icon, Paper, Display1, FlatButton, connectTheme, Divider } from 'carbon-ui'

type TransactionByDay = {day:Date, transactions : PricedTransaction[]}

interface PricedTransaction {
    Transaction? : Transaction,
    Transfert? : Transfert,
    Price : number,
    Total : number,
    Date : Date,
}

interface Props {
  Transactions : Transaction[],
  WalletUUID : string,
  Transfert : Transfert[],
  Currency : Currency,
  Categories : Category[],
  history : History,
  Wallets : Wallet[],
}

export default function
  render(props:Props) {
    let content: any
    const groupedTransactions : TransactionByDay[] = []
    const categories = _.mapValues(_.groupBy(props.Categories, "UUID"), t => t[0])
    const defaultCategory : Category = { Name : "Unknown", Icon : "help", LastUpdate : new Date(), UUID:"" }
    let pricedTransaction : PricedTransaction[] = props.Transactions.map(t => ({Transaction : t, Total : 0, Price : t.Price, Date : t.Date}))
    pricedTransaction = pricedTransaction.concat(props.Transfert.map(transfert => {
      let price = 0;
      if (transfert.From.WalletUUID == props.WalletUUID) {
        price = -transfert.From.Price;
      } else if (transfert.To.WalletUUID == props.WalletUUID) {
        price = transfert.To.Price;
      }
      return {Transfert : transfert, Total : 0, Price : price, Date : transfert.Date}
    }))
    pricedTransaction = _.sortBy(pricedTransaction, p => -p.Date.getTime())
    let total = 0;
    pricedTransaction.reverse().forEach(t => {
      total += t.Price
      t.Total = total;
    })

    const grouped = _.groupBy(pricedTransaction, t => new Date(t.Date.getFullYear(),t.Date.getMonth(), t.Date.getDate()).toString())
    _.forEach(grouped, (transactions, key) => {
      groupedTransactions.push({day : new Date(key), transactions : transactions})
    })
     if (Platform.OS === "web") {
       content = <View>
         {
           groupedTransactions.slice(groupedTransactions.length-200,groupedTransactions.length).map(transactionByDay =>
             <View>
             <Text>{transactionByDay.day.toLocaleString()}</Text>
             {
             transactionByDay.transactions.map(transaction => {
               if (transaction.Transaction) {
                 return <TransactionListItem key={transaction.Transaction.UUID} Category={categories[transaction.Transaction.CategoryUUID] || defaultCategory} Transaction={transaction.Transaction} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total}></TransactionListItem>
               } else if (transaction.Transfert) {
                 return <TransfertListItem key={transaction.Transfert.UUID} Transfert={transaction.Transfert} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total} Wallets={props.Wallets} WalletUUID={props.WalletUUID}></TransfertListItem>
               }
             })
             }
             </View>
           )
         }
         <Divider />
         </View>
     } else {
       // Margin bottom to fix missing element due to the appBar ...
       content = <FlatList style={{marginBottom:170}}
       data={groupedTransactions.reverse()}
       keyExtractor={(item : TransactionByDay) => item.day.toISOString()}
       inverted
       renderItem={({item}) =>
         <View>
         <Text>{item.day.toLocaleString()}</Text>
         {
         item.transactions.map((transaction : PricedTransaction) =>
         {
           if (transaction.Transaction) {
             return <TransactionListItem key={transaction.Transaction.UUID} Category={categories[transaction.Transaction.CategoryUUID] || defaultCategory} Transaction={transaction.Transaction} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total}></TransactionListItem>
           } else if (transaction.Transfert) {
             return <TransfertListItem key={transaction.Transfert.UUID} Transfert={transaction.Transfert} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total} Wallets={props.Wallets} WalletUUID={props.WalletUUID}></TransfertListItem>
           }
         }
          )
         }
         </View>
       }
       />
     }


    return content
  }
