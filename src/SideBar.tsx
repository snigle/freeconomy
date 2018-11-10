import { History } from "history";
import * as _ from "lodash";
import * as querystring from "querystring";
import * as React from "react";
import { Button, ScrollView, View } from "react-native";
import DrawerLayout from "react-native-drawer-layout";
import { Header, ListItem, Text } from "react-native-elements";
// @ts-ignore
// tslint:disable-next-line:no-duplicate-imports
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { MyLink } from "./Link";
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
    // return <View style={{ flex: 1 }}>{this.props.children}</View>;
    return <DrawerLayout
      drawerPosition="left"
      drawerBackgroundColor="white"
      drawerWidth={300}
      renderNavigationView={() =>
        <ScrollView>
          <Text style={{ textAlign: "center", margin: 10, fontSize: 18 }}>Freeconomy</Text>
          <View style={{ marginTop: 0 }}>
            <MyLink to="/" replace={true}>
              <ListItem title={t.t("sideBar.home")} />
            </MyLink>
            <MyLink to="/CategoriesView" replace={true}>
              <ListItem title={t.t("sideBar.categories")} />
            </MyLink>
            <MyLink to={"/ReportPie?" + querystring.stringify({ currencyCode: this.state.defaultCurrency.Code })}>
              <ListItem title={t.t("sideBar.categoryReport")} />
            </MyLink>
            <MyLink to={"/BalanceReport?" + querystring.stringify({ currencyCode: this.state.defaultCurrency.Code })}>
              <ListItem title={t.t("balanceReport.title")} />
            </MyLink>
            <ListItem
              title={t.t("sideBar.sync")}
              onPress={() => GoogleSync() && this.drawer ? this.drawer.closeDrawer() : null} />
            <ListItem
              title={t.t("sideBar.logout")}
              onPress={() => { this.setState({ logout: true }); if (this.drawer) { this.drawer.closeDrawer(); } }} />
          </View>
        </ScrollView>
      }
      ref={(drawer) => {
        return (this.drawer = drawer);
      }}
    >
      {this.props.children}
      {this.state.logout ?
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
        </Overlay> : undefined}
    </DrawerLayout>;
  }
}

export default connect((state: any, props: IPropsParams): IProps => ({
  ...state,
  ...props,
}), { setLogout }, null, { withRef: true })(SideBarClass);
