import { History } from "history";
import * as _ from "lodash";
import moment from "moment";
import * as querystring from "querystring";
import * as React from "react";
import { Button, ScrollView, TouchableHighlight, View } from "react-native";
import DrawerLayout from "react-native-drawer-layout";
import { Header, ListItem, Overlay, Text } from "react-native-elements";
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

export class SideBarClass extends React.PureComponent<IProps, IState> {
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

  public async componentDidMount() {
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
            <MyLink to="/" replace={true}>
              <ListItem title={t.t("sideBar.home")} />
            </MyLink>
            <MyLink to={"/ReportPie?" + querystring.stringify({ currencyCode: this.state.defaultCurrency.Code })}>
              <ListItem title={t.t("sideBar.categoryReport")} />
            </MyLink>
            <MyLink to={"/BalanceReport?" + querystring.stringify({
              currencyCode: this.state.defaultCurrency.Code,
              begin: moment().startOf("year").toISOString(),
              end: moment().add(1, "year").startOf("year").toISOString(),
            })}>
              <ListItem title={t.t("balanceReport.title")} />
            </MyLink>
            <TouchableHighlight
              onPress={() => GoogleSync() && this.drawer ? this.drawer.closeDrawer() : null}
            ><View>
                <ListItem
                  title={t.t("sideBar.sync")}
                />
              </View></TouchableHighlight>
            <MyLink to="/CategoriesView" replace={true}>
              <ListItem title={t.t("sideBar.categories")} />
            </MyLink>
            <TouchableHighlight
              onPress={() => { this.setState({ logout: true }); if (this.drawer) { this.drawer.closeDrawer(); } }}
            >
              <View><ListItem title={t.t("sideBar.logout")} /></View>
            </TouchableHighlight>
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
            containerStyle={{ height: 60 }}
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
