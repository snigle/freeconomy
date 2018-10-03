import { History } from "history";
import * as _ from "lodash";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Card, Divider, Header, Icon } from "react-native-elements";
import Loading from "./Loading";
import * as Models from "./Models";
import { displayPrice, IWallet } from "./Types";
import WalletListItem from "./WalletListItem";

import querystring from "querystring";
import { Route, RouteComponentProps } from "react-router";
import MoreActions from "./MoreActions";
import SideBar, { SideBarClass } from "./SideBar";
import SyncBar from "./SyncBar";
import t from "./translator";

interface IState {
  Wallets?: IWallet[];
  displayOptions: boolean;
}

interface IFilters {
  archive: boolean;
}

interface IProps {
  history: History;
}

class Wallets extends React.Component<RouteComponentProps<IProps>, IState> {
  public sidebar: SideBarClass | null;

  constructor(props: RouteComponentProps<IProps>) {
    super(props);
    this.sidebar = null;

    const queryParams = querystring.parse(props.location.search.replace("?", ""));
    this.state = {
      displayOptions: false,
    };
  }

  public parseQueryParams(props: RouteComponentProps<IProps>): IFilters {
    const queryParams = querystring.parse(props.location.search.replace("?", ""));
    return {
      archive: "true" === (_.isArray(queryParams.archive) ? _.first(queryParams.archive) : queryParams.archive),
    };
  }

  public fetchData() {
    const filters = this.parseQueryParams(this.props);
    Models.GetWallets()
      .then((wallets) => wallets.filter((w) => filters.archive || !w.Archived))
      .then((wallets) => this.setState({ Wallets: wallets }))
      .catch(() => console.log("fail to load wallets, need to reset ?"));
  }

  public componentDidMount() {
    console.log("wallet mount");
    this.fetchData();
  }

  public componentDidUpdate(prevProps: RouteComponentProps<IProps>) {
    const oldFilters = this.parseQueryParams(prevProps);
    const newFilters = this.parseQueryParams(this.props);
    if (oldFilters.archive !== newFilters.archive) {
      this.fetchData();
    }
  }

  public render() {
    const filters = this.parseQueryParams(this.props);
    let content: JSX.Element[] | JSX.Element;
    let options: JSX.Element = <View></View>;
    if (this.state.displayOptions) {
      options = <MoreActions actions={[
        { title: t.t("walletsView.add"), onPress: () => this.props.history.push("/AddWalletView") },
        {
          title: filters.archive ?
            t.t("walletsView.hideArchive") : t.t("walletsView.viewArchive"),
          onPress: () => this.props.history.push(`/?archive=${!filters.archive}`),
        },
      ]} clicked={() => this.setState({ ...this.state, displayOptions: false })} />;
    }
    if (!this.state.Wallets) {
      content = <Loading Message={t.t("walletsView.loading")} />;
    } else {

      const groupWallet = _.groupBy(this.state.Wallets, (w) => w.Currency.Code);
      content = _.map(groupWallet, (wallets, currencyCode) => {
        const total: number = wallets.reduce((sumTotal, w) =>
          sumTotal + w.TotalPerYear.reduce((sumPerWallet, totalYear) =>
            totalYear.Total + sumPerWallet, w.Solde), 0);
        console.log("wallets", wallets);

        return <Card
          key={currencyCode}
          title={`${t.t("walletsView.wallets")} (${currencyCode}) : ${displayPrice(total, wallets[0].Currency)}`}
          dividerStyle={{ marginBottom: 0 }}
          titleStyle={{ marginTop: 10 }}
          containerStyle={{ margin: 3, padding: 0 }}
          wrapperStyle={{ padding: 0 }}>
          {
            wallets.map((wallet) =>
              <View key={wallet.UUID}>
                <WalletListItem
                  Wallet={wallet}
                  history={this.props.history}
                  archive={(walletUUID) => this.archive(walletUUID)}
                  displayArchive={filters.archive}></WalletListItem>
                <Divider />
              </View>,
            )
          }
        </Card>;
      });

    }

    return <SideBar
      history={this.props.history}
      ref={(sidebar: any) => (this.sidebar = sidebar ? sidebar.getWrappedInstance() : null)}>
      <View style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ height: 60 }}
          leftComponent={{ icon: "menu", color: "#fff", onPress: () => this.sidebar && this.sidebar.openDrawer() }}
          centerComponent={{ text: "Freeconomy", style: { fontSize: 20, color: "#fff" } }}
          rightComponent={{
            color: "#fff",
            icon: this.state.displayOptions ? "expand-less" : "more-vert",
            onPress: () => this.setState({ ...this.state, displayOptions: !this.state.displayOptions }),
          }}
        />
        <SyncBar history={this.props.history} refresh={() => this.componentDidMount()} />
        <View style={{ flex: 1 }}>
          {options}
          <ScrollView >
            {content}
            <View style={{ height: 100 }} />
          </ScrollView>
          <Icon
            raised
            containerStyle={{ position: "absolute", right: 20, bottom: 20 }}
            name="add"
            color="#517fa4"
            onPress={() => this.props.history.push("/AddWalletView")} />
        </View>
      </View>
    </SideBar>;
  }

  private archive(walletUUID: string): Promise<any> {
    return Models.ArchiveWallet(walletUUID).then((w) => this.fetchData());
  }

}

export default Wallets;
