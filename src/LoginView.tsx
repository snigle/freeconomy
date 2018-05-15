import * as React from "react";
import { Text, TouchableHighlight, View } from "react-native";
// @ts-ignore
// import { Button } from "react-native-elements";
// tslint:disable-next-line
import { Button, ButtonIcon, Card, Icon} from "react-native-elements";
import { connect } from "react-redux";
import {RouteComponentProps} from "react-router";
import {defaultCategories} from "./defaultCategories";
import * as defaultWallets from "./defaultWallets";
import {getLogin} from "./GoogleSync";
import * as Models from "./Models";
import * as OAuth from "./OAuth";
import { setLogged } from "./reducer/login";
import { syncHide } from "./reducer/sync";
import * as Sync from "./Sync";
import t from "./translator";

interface IProps extends RouteComponentProps<any> {
  synced: boolean;
  syncing: boolean;
  error: boolean;
  syncHide: any;
  setLogged: any;
}

interface IState {
  loading: boolean;
}

class LoginView extends React.Component<IProps, IState> {

  constructor(props: IProps) {
      super(props);
      this.state = {loading : true};
  }

  public login() {
    Models.CleanAll().then(() => OAuth.login()).then(() => Sync.GoogleSync(false));
    this.setState({loading : true});
  }

  public addDefaultCategories(): Promise<void> {
    return Models.CreateCategory(...defaultCategories).then(() => {});
  }

  public addDefaultWallets(): Promise<void> {
    return Models.CreateWallet(defaultWallets.Money).then(() =>
      Models.CreateWallet(defaultWallets.Bank),
    ).then(() => {});
  }

  public addDefaultDatas(): Promise<void> {
      return Promise.all([
        Models.GetCategories().then((categories) => categories.length ? {} : this.addDefaultCategories()),
        Models.GetWallets().then((wallets) => wallets.length ? {} : this.addDefaultWallets()),
      ]).then(() => {});
  }

  public loginLocally() {
    this.setState({loading : true});
    Models.CleanAll().then(() => this.addDefaultDatas()).then(() => {
      this.props.setLogged();
      this.setState({loading : false});
    });
  }

  public componentDidUpdate() {
    console.log("update props", this.props);
    if (this.props.synced) {
      this.addDefaultDatas().then(() => {
        console.log("set logged");
        this.props.setLogged();
        this.props.syncHide();
      });
    }
  }

  public componentDidMount() {
    // For web only, detect token in uri and try to login.
    getLogin(this.props.location.pathname).then((login) => {
      console.log("login ok 2 : ", login);
      return Models.SaveLogin(login);
    })
    .then(() => {
      console.log("login done");
      this.props.history.replace("/");
      Sync.GoogleSync(false);
      this.setState({loading : false});
    }).catch(() => this.setState({loading : false}));
  }

  public render() {
    if (this.props.syncing) {
      return <Text> Downloading data </Text>;
    }
    if (this.state.loading) {
      return <Text>Loging to Google...</Text>;
    }
    return <View style={{flex: 1}}>
      <Card
        title={t.t("login.welcome")}
        image={require("../images/login.jpg")}>
        <Text>
          {t.t("login.line1")}
        </Text>
        <Text style={{marginBottom: 10}}>
          {t.t("login.line2")}
        </Text>
        <Button
          icon={<Icon name="person" color="#ffff" /> as ButtonIcon}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          text={t.t("login.buttonWithGoogle")}
          onPress={() => this.login()}
        />
        <TouchableHighlight onPress={() => this.loginLocally()}>
          <Text style={{color : "#9999", textAlign: "center", marginTop: 10}}>
            {t.t("login.locally")}
          </Text>
        </TouchableHighlight>
    </Card>
    </View>;
  }
}

export default connect((state: any, props: any): IProps => ({
  ...state.sync,
  ...state.login,
  ...props,
}), { syncHide, setLogged })(LoginView);
