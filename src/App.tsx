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
} from 'react-native';

import { Route } from 'react-router'
import {MyLink} from "./Link"

import WalletsView from "./WalletsView"
import AddWalletView from "./AddWalletView"
import TransactionsView from "./TransactionsView"
import AddTransactionView from "./AddTransactionView"
//@ts-ignore
import { AppBar, IconToggle, connectTheme, Icon } from 'carbon-ui'

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

const App = (props:any) =>
<View>
  <Route exact path="/" component={WalletsView}></Route>
  <Route path="/AddWalletView" component={AddWalletView}></Route>
  <Route path="/Wallet/:WalletUUID/TransactionsView" component={(props : any) => <TransactionsView WalletUUID={props.match.params.WalletUUID}/>}></Route>
  <Route path="/Wallet/:WalletUUID/AddTransactionView" component={(props : any) => <AddTransactionView WalletUUID={props.match.params.WalletUUID}/>} />
</View>

export default App;
// export default class App extends React.Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//         <Home></Home>
//       </View>
//     );
//   }
// }
//
