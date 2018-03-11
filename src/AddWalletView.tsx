import * as React from "react";
import {Text, View, TextInput} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {WalletInput} from "./Types"
//@ts-ignore
import { RaisedButton, TextField, AppBar, Icon } from 'carbon-ui'

interface State extends WalletInput{
  Loading : boolean,
}

class AddWalletView extends React.Component<object,State>{
  constructor(props:any){
    super(props)
    this.state = {
      Name : "",
      Description : "",
      Currency : { Code : "EUR", Symbol : "€"},
      Icon : "account_balance_wallet",

      Loading : false,
    };
  }

  changeName(text : string) {
    this.setState({...this.state, Name : text});
  }
  changeDescription(text : string) {
    this.setState({...this.state, Description : text});
  }

  render() {
    return (
      <View>
        <AppBar title="Add Wallet">
          {
            <MyLink to="/"><Icon name="arrow_back" /></MyLink>
          }
        </AppBar>
        <TextField placeholder="Name" onChangeText={(v:string) => this.changeName(v)} value={this.state.Name}/>
        <TextField placeholder="Description" onChangeText={(v:string) => this.changeDescription(v)} value={this.state.Description}/>
        <RaisedButton onPress={() => this.save()}>Save</RaisedButton>
      </View>
    )
  }

  save() {
    this.setState({...this.state, Loading : true })
    Models.CreateWallet(this.state).then(() => {
      console.log("wallet added");
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddWalletView;
