import * as React from "react"
import {View, ScrollView, Button, Text, FlatList, Platform} from "react-native"
import * as Models from "./Models"
import {Wallet, Currency, Transaction, displayPrice, Category, Transfert} from "./Types"
import Loading from "./Loading"
import TransactionListItem from "./TransactionListItem"
import TransfertListItem from "./TransfertListItem"
import AddWalletView from "./AddWalletView"
import {MyLink} from "./Link"
import {History} from "history"
import * as _ from "lodash"
import {Icon, Divider} from "react-native-elements"
//@ts-ignore
import { Paper, Display1, FlatButton } from 'carbon-ui'

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

function displayTransaction(transactionByDay : TransactionByDay, props : Props) : JSX.Element {
  const categories = _.mapValues(_.groupBy(props.Categories, "UUID"), t => t[0])
  const defaultCategory : Category = { Name : "Unknown", Icon : "help", LastUpdate : new Date(), UUID:"" }
   return (
    <View key={transactionByDay.day.toString()}>
    <Text style={{backgroundColor:"rgb(130, 130, 130)", color:"white"}}>{transactionByDay.day.toLocaleString()}</Text>
    {
    transactionByDay.transactions.map((transaction,i) => {
      let element : JSX.Element = <View></View>
      if (transaction.Transaction) {
        element = <TransactionListItem key={transaction.Transaction.UUID} Category={categories[transaction.Transaction.CategoryUUID] || defaultCategory} Transaction={transaction.Transaction} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total}></TransactionListItem>
      } else if (transaction.Transfert) {
        element= <TransfertListItem key={transaction.Transfert.UUID} Transfert={transaction.Transfert} Currency={props.Currency} history={props.history} CurrentTotal={transaction.Total} Wallets={props.Wallets} WalletUUID={props.WalletUUID}></TransfertListItem>
      }
      return <View key={element.key || i}>{element}<Divider/></View>
    })
    }
    </View>
  )
}

export default function
  render(props:Props) {
    let content: any
    const groupedTransactions : TransactionByDay[] = []
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
       content = <ScrollView>
         {
           groupedTransactions.slice(groupedTransactions.length-200,groupedTransactions.length).map(i => displayTransaction(i,props))
         }
         <View style={{height:100}} />
         </ScrollView>
     } else {
       // Margin bottom to fix missing element due to the appBar ...
       content = <FlatList style={{paddingBottom:100}}
       data={groupedTransactions.reverse()}
       keyExtractor={(item : TransactionByDay) => item.day.toISOString()}
       inverted
       renderItem={({item}) => displayTransaction(item,props) }
       />
     }


    return <View style={{flex:1}}>
    <Icon
    raised
    containerStyle={{position:"absolute", right:20,bottom:20}}
    name='add'
    color='#517fa4'
    onPress={() => props.history.push(`/Wallet/${props.WalletUUID}/AddTransactionView`)} />
    {content}
      </View>
  }
