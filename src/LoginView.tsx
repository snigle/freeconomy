import * as React from "react"
import { View, Button, Text, AsyncStorage } from "react-native";
import * as OAuth from "./OAuth"
import { connect } from "react-redux";
import { syncHide } from "./reducer/sync";
import {History} from "history"
import * as Models from "./Models"
import { setLogged } from "./reducer/login";


interface Props{
  synced : boolean,
  syncing : boolean,
  error : boolean
  syncHide : any,
  setLogged: any,
}

interface State {
  loading : boolean
}

class LoginView extends React.Component<Props,State>{

  constructor(props: Props){
      super(props);
      this.state = {loading : false}
  }

  login() {
    Models.CleanAll().then(() => OAuth.login())
    this.setState({loading : true});
  }

  componentDidUpdate() {
    if (this.props.synced) {
      this.props.syncHide();
      this.props.setLogged();
    }
  }

  render() {
    if (this.props.syncing) {
      return <Text> Downloading data </Text>
    }
    if (this.state.loading) {
      return <Text>Loging to Google...</Text>
    }
    return <View style={{flex:1}}>
      <Button title="Login with Google" onPress={() => this.login()}/>
    </View>
  }
}

export default connect((state : any, props : any) : Props => ({
  ...state.sync,
  ...state.login,
  ...props,
}), { syncHide : syncHide, setLogged : setLogged })(LoginView);
