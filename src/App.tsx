/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Route, match , RouteComponentProps} from 'react-router'
import {History} from "history"
import {MyLink} from "./Link"
import * as querystring from "querystring"

import WalletsView from "./WalletsView"
import AddWalletView from "./AddWalletView"
import DeleteWalletView from "./DeleteWalletView"
import DeleteCategoryView from "./DeleteCategoryView"
import TransactionsView from "./TransactionsView"
import AddTransactionView from "./AddTransactionView"
import AddTransfertView from "./AddTransfertView"
import GoogleSyncOAuthCallBack from "./GoogleSyncOAuthCallBack"
import ImportTransactionsView from "./ImportTransactionsView"
import CategoriesView from "./CategoriesView"
import AddCategoryView from "./AddCategoryView"
import SideBar from "./SideBar"
import ReportPie from "./ReportPie"

//@ts-ignore
import { AppBar, IconToggle, connectTheme, Icon } from 'carbon-ui'

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import {createLogger} from "redux-logger";
import reducer from "./reducer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

interface Props{
  match : match<any>
}

function queryString(search :string, key : string) : string {
  const value = querystring.parse(search.replace("?",""))[key]
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

const logger = createLogger();
const enhancer = compose(
  applyMiddleware(thunk, promise, logger)
);
export const store = createStore(reducer, {}, enhancer);


const App = (props:any) =>
  <Provider store={store}>
  <View style={{flex:1}}>
  <Route exact path="/" component={WalletsView}></Route>
  <Route exact path="/refresh" component={() => <View/>}></Route>
  <Route exact path="/CategoriesView" component={CategoriesView}></Route>
  <Route exact path="/ReportPie" component={ReportPie}></Route>
  <Route path="/AddCategoryView" exact component={({match, history} : { match : match<{CategoryUUID :string}>, history: History }) => <AddCategoryView CategoryUUID={match.params.CategoryUUID} history={history}/>}></Route>
  <Route path="/AddCategoryView/:CategoryUUID" component={({match, history} : { match : match<{CategoryUUID :string}>, history: History }) => <AddCategoryView CategoryUUID={match.params.CategoryUUID} history={history}/>}></Route>
  <Route path="/DeleteCategoryView/:CategoryUUID/:Name" component={({match, history} : { match : match<{CategoryUUID :string, Name : string}>, history: History }) => <DeleteCategoryView CategoryUUID={match.params.CategoryUUID} Name={match.params.Name} history={history}/>}></Route>
  <Route path="/AddWalletView" exact component={AddWalletView}></Route>
  <Route path="/AddWalletView/:WalletUUID" component={({match, history} : { match : match<{WalletUUID :string}>, history: History }) => <AddWalletView WalletUUID={match.params.WalletUUID} history={history}/>}></Route>
  <Route path="/DeleteWalletView/:WalletUUID/:Name" component={({match, history} : { match : match<{WalletUUID :string, Name : string}>, history: History }) => <DeleteWalletView WalletUUID={match.params.WalletUUID} Name={match.params.Name} history={history}/>}></Route>
  <Route path="/Wallet/:WalletUUID/TransactionsView" component={(props : RouteComponentProps<any>) => <TransactionsView WalletUUID={props.match.params.WalletUUID} history={props.history} Search={queryString(props.location.search,"search")}/>}></Route>
  <Route path="/Wallet/:WalletUUID/AddTransactionView" exact component={(props : any) => <AddTransactionView WalletUUID={props.match.params.WalletUUID} history={props.history}/>} />
  <Route path="/Wallet/:WalletUUID/AddTransactionView/:TransactionUUID" component={({match, history} : any) => <AddTransactionView WalletUUID={match.params.WalletUUID} TransactionUUID={match.params.TransactionUUID} history={history}/>} />
  <Route path="/Wallet/:WalletUUID/AddTransfertView" exact component={(props : RouteComponentProps<any>) => <AddTransfertView WalletUUID={props.match.params.WalletUUID} history={props.history}/>} />
  <Route path="/Wallet/:WalletUUID/AddTransfertView/:TransfertUUID" component={({match, history} : any) => <AddTransfertView WalletUUID={match.params.WalletUUID} TransfertUUID={match.params.TransfertUUID} history={history}/>} />
  <Route path="/oauthCallback" component={GoogleSyncOAuthCallBack} />
  <Route path="/ImportTransactionsView" component={ImportTransactionsView} />
  </View>
  </Provider>

export default App;
