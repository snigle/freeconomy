import { History } from "history";
import * as _ from "lodash";
import * as querystring from "querystring";
import * as React from "react";
import { Button, ScrollView, TouchableHighlight, View } from "react-native";
import DrawerLayout, { DrawerLayoutProperties } from "react-native-drawer-layout";
import { Card, Header, ListItem, Text } from "react-native-elements";
// @ts-ignore
// tslint:disable-next-line:no-duplicate-imports
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import * as Models from "./Models";
import { setLogout } from "./reducer/login";
import { GoogleSync } from "./Sync";
import t from "./translator";
import { ICurrency } from "./Types";
interface IPropsParams {
  history: History;
}
interface IProps extends IPropsParams {
  setLogout: any;
}

interface IState {
  logout: boolean;
  defaultCurrency: ICurrency;
}

export class SideBarClass extends React.Component<IProps, IState> {
  public drawer: DrawerLayout | null;
  constructor(props: IProps) {
    super(props);
    this.drawer = null;
    this.state = { logout: false, defaultCurrency: { Code: "", Symbol: "?" } };
  }

  public openDrawer() {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  }

  public logout() {
    Models.CleanAll().then(() => this.props.setLogout());
  }

  public componentDidMount() {
    // Get Wallet with more transactions if no currency precised
    Models.GetAllTransactions().then((transactions) =>
      _.first(_.sortBy(_.map(_.mapValues(_.groupBy(transactions, (tr) => tr.WalletUUID),
        (values) => values.length),
        (value, key) => ({ WalletUUID: key, nbTransactions: value })),
        ["+nbTransactions"]),
      )).then((transaction) => {
        if (transaction) {
          return Models.GetWallet(transaction.WalletUUID).then((w) =>
            this.setState({ ...this.state, defaultCurrency: w.Currency }));
        }
      },
    );
  }

  public render() {
    return <DrawerLayout
      drawerPosition="left"
      drawerBackgroundColor="white"
      drawerWidth={300}
      renderNavigationView={() =>
        <ScrollView>
          <Text style={{ textAlign: "center", margin: 10, fontSize: 18 }}>Freeconomy</Text>
          <View style={{ marginTop: 0 }}>
            <ListItem title={t.t("sideBar.home")} onPress={() => this.props.history.replace("/")} />
            <ListItem title={t.t("sideBar.categories")} onPress={() => this.props.history.replace("/CategoriesView")} />
            <ListItem
              title={t.t("sideBar.reports")}
              onPress={() => this.props.history.replace(
                "/ReportPie?" + querystring.stringify({ currencyCode: this.state.defaultCurrency.Code }),
              )} />
            <ListItem
              title={t.t("sideBar.sync")}
              onPress={() => GoogleSync() && this.drawer ? this.drawer.closeDrawer() : null} />
            <ListItem
              title={t.t("sideBar.logout")}
              onPress={() => this.setState({ logout: true }) || (this.drawer ? this.drawer.closeDrawer() : null)} />
          </View>
        </ScrollView>
      }
      ref={(drawer) => {
        return (this.drawer = drawer);
      }}
    >
      {this.props.children}
      <Overlay isVisible={this.state.logout} containerStyle={{ padding: 0 }}>
        <Header
          outerContainerStyles={{ height: 60 }}
          centerComponent={{ text: t.t("sideBar.logoutConfirm"), style: { fontSize: 20, color: "#fff" } }}
          rightComponent={{ icon: "close", color: "#fff", onPress: () => this.setState({ logout: false }) }}
        />
        <Text>{t.t("sideBar.logoutConfirmText")}</Text>
        <View style={{ flexDirection: "column" }}>
          <Button title={t.t("common.cancel")} onPress={() => this.setState({ logout: false })} />
          <Button title={t.t("sideBar.logout")} onPress={() => this.logout()} />
        </View>
      </Overlay>
    </DrawerLayout>;
  }
}

export default connect((state: any, props: IPropsParams): IProps => ({
  ...state,
  ...props,
}), { setLogout }, null, { withRef: true })(SideBarClass);
