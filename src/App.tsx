/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import {
  AsyncStorage,
  Text,
  View,
} from "react-native";

import * as querystring from "querystring";
import { match, Route, RouteComponentProps } from "react-router";
import { withRouter } from "react-router-native";

import AddCategoryView from "./AddCategoryView";
import AddTransactionView from "./AddTransactionView";
import AddTransfertView from "./AddTransfertView";
import AddWalletView from "./AddWalletView";
import CategoriesView from "./CategoriesView";
import DeleteCategoryView from "./DeleteCategoryView";
import DeleteWalletView from "./DeleteWalletView";
import GoogleSyncOAuthCallBack from "./GoogleSyncOAuthCallBack";
import ImportTransactionsView from "./ImportTransactionsView";
import ReportPie from "./reports/ReportPie";
import TransactionsByBeneficiary from "./reports/TransactionsByBeneficiary";
import TransactionsView from "./TransactionsView";
import t from "./translator";
import WalletsView from "./WalletsView";

// @ts-ignore
import { AppBar, connectTheme, Icon, IconToggle } from "carbon-ui";

// Redux
import { connect, Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";
import Loading from "./Loading";
import LoginView from "./LoginView";
import reducer from "./reducer";
import { setLogged } from "./reducer/login";

interface IProps {
  match: match<any>;
}

function queryString(search: string, key: string): string {
  const value = querystring.parse(search.replace("?", ""))[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

const logger = createLogger();
const enhancer = compose(
  applyMiddleware(thunk, promise, logger),
);
export const store = createStore(reducer, {}, enhancer);

interface IProps {
  logged: boolean;
  setLogger: () => void;
}

interface IState {
  loaded: boolean;
}
class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { loaded: false };
  }

  public componentDidMount() {
    AsyncStorage.getItem("logged").then((value) => {
      if (value) {
        this.props.setLogged();
      }
      this.setState({ loaded: true });
    }).catch(() => { console.log("fail to get logged data"); });
  }

  public render() {
    if (!this.state.loaded) {
      return <Loading Message={t.t("common.loadingApplication")} />;
    }
    if (!this.props.logged) {
      return <View style={{ flex: 1 }}>
        <Route path="/" component={LoginView} />
        <Route path="/oauthCallback" component={GoogleSyncOAuthCallBack} />
      </View>;
    }
    AsyncStorage.setItem("logged", "ok");
    return <View style={{ flex: 1 }}>
      <Route exact path="/" component={WalletsView}></Route>
      <Route exact path="/Test" component={() => <Loading Message="Ceci est un test" />}></Route>
      <Route exact path="/refresh" component={() => <View />}></Route>
      <Route exact path="/CategoriesView" component={CategoriesView}></Route>
      <Route exact path="/ReportPie" component={ReportPie}></Route>
      <Route exact path="/TransactionsByBeneficiary" component={TransactionsByBeneficiary}></Route>
      <Route
        path="/AddCategoryView"
        exact
        component={(props: RouteComponentProps<{ CategoryUUID: string }>) =>
          <AddCategoryView CategoryUUID={props.match.params.CategoryUUID} history={props.history} />}>
      </Route>
      <Route
        path="/AddCategoryView/:CategoryUUID"
        component={(props: RouteComponentProps<{ CategoryUUID: string }>) =>
          <AddCategoryView CategoryUUID={props.match.params.CategoryUUID} history={props.history} />}>
      </Route>
      <Route
        path="/DeleteCategoryView/:CategoryUUID/:Name"
        component={(props: RouteComponentProps<{ CategoryUUID: string, Name: string }>) =>
          <DeleteCategoryView
            CategoryUUID={props.match.params.CategoryUUID}
            Name={props.match.params.Name}
            history={props.history} />
        }>
      </Route>
      <Route path="/AddWalletView" exact component={AddWalletView}></Route>
      <Route
        path="/AddWalletView/:WalletUUID"
        component={(props: RouteComponentProps<{ WalletUUID: string }>) =>
          <AddWalletView WalletUUID={props.match.params.WalletUUID} history={props.history} />}>
      </Route>
      <Route
        path="/DeleteWalletView/:WalletUUID/:Name"
        component={(props: RouteComponentProps<{ WalletUUID: string, Name: string }>) =>
          <DeleteWalletView
            WalletUUID={props.match.params.WalletUUID}
            Name={props.match.params.Name}
            history={props.history} />
        }>
      </Route>
      <Route
        path="/TransactionsView"
        component={TransactionsView}>
      </Route>
      <Route
        path="/Wallet/:WalletUUID/AddTransactionView"
        exact
        component={(props: RouteComponentProps<{ WalletUUID: string }>) =>
          <AddTransactionView WalletUUID={props.match.params.WalletUUID} history={props.history} />}
      />
      <Route
        path="/Wallet/:WalletUUID/AddTransactionView/:TransactionUUID"
        component={(props: RouteComponentProps<{ WalletUUID: string, TransactionUUID: string }>) =>
          <AddTransactionView
            WalletUUID={props.match.params.WalletUUID}
            TransactionUUID={props.match.params.TransactionUUID}
            history={props.history} />
        }
      />
      <Route
        path="/Wallet/:WalletUUID/AddTransfertView"
        exact component={(props: RouteComponentProps<{ WalletUUID: string }>) =>
          <AddTransfertView WalletUUID={props.match.params.WalletUUID} history={props.history} />}
      />
      <Route
        path="/Wallet/:WalletUUID/AddTransfertView/:TransfertUUID"
        component={(props: RouteComponentProps<{ WalletUUID: string, TransfertUUID: string }>) =>
          <AddTransfertView
            WalletUUID={props.match.params.WalletUUID}
            TransfertUUID={props.match.params.TransfertUUID}
            history={props.history} />
        }
      />
      <Route path="/oauthCallback" component={GoogleSyncOAuthCallBack} />
      <Route path="/ImportTransactionsView" component={ImportTransactionsView} />
    </View>;
  }
}

const AppWithStore = withRouter(connect((state: any, props: any): IProps => ({
  ...state.login,
}), { setLogged })(App));

export default () => <Provider store={store}><AppWithStore /></Provider>;
