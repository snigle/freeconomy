import * as React from "react";
import {Text, View, TextInput} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {WalletInput} from "./Types"
import {History} from "history"
//@ts-ignore
import { RaisedButton, TextField, AppBar, Icon } from 'carbon-ui'

interface State extends WalletInput{
  Loading : boolean,
}

interface Props {
  WalletUUID? : string,
  history: History,
}

class AddWalletView extends React.Component<Props,State>{
  constructor(props:Props){
    super(props)
    this.state = {
      Name : "",
      Description : "",
      Currency : { Code : "EUR", Symbol : "€"},
      Icon : "account_balance_wallet",

      Loading : true,
    };
  }

  async componentDidMount() {
    if (this.props.WalletUUID) {
      Models.GetWallet(this.props.WalletUUID).then(wallet => {
        this.setState({...this.state,
        Loading : false,
        Name : wallet.Name,
        Description : wallet.Description,
        Currency : wallet.Currency,
        Icon : wallet.Icon,
      })
      })
    } else {
      return Promise.resolve(this.setState({...this.state, Loading: false}))
    }
  }

  changeName(text : string) {
    this.setState({...this.state, Name : text});
  }
  changeDescription(text : string) {
    this.setState({...this.state, Description : text});
  }

  render() {
    let content : JSX.Element
    if (this.state.Loading) {
      content = <View><Text>Chargement</Text></View>
    } else {
      content = <View>
      <TextField placeholder="Name" onChangeText={(v:string) => this.changeName(v)} value={this.state.Name}/>
      <TextField placeholder="Description" onChangeText={(v:string) => this.changeDescription(v)} value={this.state.Description}/>
      <RaisedButton onPress={() => this.save()}>Save</RaisedButton>
      </View>
    }
    return (
      <View>
        <AppBar title="Add Wallet">
          {
            <MyLink to="/"><Icon name="arrow_back" /></MyLink>
          }
        </AppBar>
        {content}
      </View>
    )
  }

  save() {
    this.setState({...this.state, Loading : true })
    let savePromise : Promise<any>;
    if(this.props.WalletUUID) {
      savePromise = Models.UpdateWallet(this.props.WalletUUID, this.state)
    } else {
      savePromise = Models.CreateWallet(this.state)
    }
    savePromise.then(() => {
      this.props.history.goBack();
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddWalletView;
