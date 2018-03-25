import * as React from "react";
import {View, TextInput, Dimensions, ScrollView} from "react-native"
import * as Models from "./Models"
import {MyLink} from "./Link"
import {WalletInput, IconType} from "./Types"
import {History} from "history"
import {Header, Button, Divider, Icon, Text} from "react-native-elements"
//@ts-ignore
import {ColorWheel} from "react-native-color-wheel"
//@ts-ignore
import * as colorsys from 'colorsys'
//@ts-ignore
import { RaisedButton, TextField, AppBar } from 'carbon-ui'

interface State extends WalletInput{
  Loading : boolean,
}

interface Props {
  WalletUUID? : string,
  history: History,
}

const icons : {name : string, type : IconType}[] = [
  {name : "account-balance-wallet", type : "material"},
  {name : "attach-money", type : "material"},
  {name : "card-giftcard", type : "material"},
  {name : "card-travel", type : "material"},
  {name : "payment", type : "material"},
  {name : "toll", type : "material"},
  {name : "account-balance", type : "material"},
  // {name : "cc-paypal", type : "material"},
  // {name : "cc-visa", type : "material"},
  // {name : "cc-mastercard", type : "material"},
]
class AddWalletView extends React.Component<Props,State>{
  constructor(props:Props){
    super(props)
    this.state = {
      Name : "",
      Description : "",
      Currency : { Code : "EUR", Symbol : "€"},
      Icon : { Name : "account-balance-wallet", Color : "#517fa4", Type: "material"},
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
  changeCurrencyCode(text : string) {
    this.setState({...this.state, Currency : {...this.state.Currency, Code : text}});
  }
  changeCurrencySymbol(text : string) {
    this.setState({...this.state, Currency : {...this.state.Currency, Symbol : text}});
  }
  changeIconColor(text : string) {
    this.setState({...this.state, Icon : {...this.state.Icon, Color : text}});
  }
  changeIcon({name, type}: {name : string, type : IconType}) {
    this.setState({...this.state, Icon : {...this.state.Icon, Name : name, Type : type}});
  }

  render() {
    let content : JSX.Element
    if (this.state.Loading) {
      content = <View><Text>Chargement</Text></View>
    } else {
      content = <ScrollView>
      <TextField placeholder="Name" onChangeText={(v:string) => this.changeName(v)} value={this.state.Name}/>
      <TextField placeholder="Description" onChangeText={(v:string) => this.changeDescription(v)} value={this.state.Description}/>

      <View style={{flexDirection: "row"}}>
        <View style={{flex:1}}>
        <TextField placeholder="Currency Code" onChangeText={(v:string) => this.changeCurrencyCode(v)} value={this.state.Currency.Code}/>
        </View>
        <View style={{flex:1}}>
        <TextField placeholder="Symbol" onChangeText={(v:string) => this.changeCurrencySymbol(v)} value={this.state.Currency.Symbol}/>
        </View>
      </View>
      <View style={{height:20}} />
      <Text h4>Icon :</Text>
      <View style={{flexDirection:"row"}}>
        <View>
          <ColorWheel
          initialColor={this.state.Icon.Color}
          onColorChange={(color:any) => this.changeIconColor(colorsys.hsv2Hex(color))}
          style={{ marginLeft: 20, padding: 40, height: 100, width: 100, overflow:"visible" }}/>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={{flexDirection:"row", alignContent:"center", alignItems:"center"}}>
          {icons.map(({name, type} : {name : string, type:IconType}) =>
            <Icon onPress={() => this.changeIcon({name,type})} key={name} name={name} type={type} reverse color={this.state.Icon.Color} />
          )}
        </View>
        </ScrollView>
      </View>
      <View style={{height:20}} />

      <View style={{flexDirection:"row"}}>
        <View style={{flex:1}}>
        <Button onPress={() => this.save(true)} text="Save and New"  containerStyle={{margin:5}}  textStyle={{flex:1}}/>
        </View>
        <View style={{flex:1}}>
        <Button onPress={() => this.save()} text="Save" containerStyle={{margin:5}} textStyle={{flex:1}} />
        </View>
      </View>
      </ScrollView>
    }
    return (
      <View>
        <Header
        outerContainerStyles={{height:60}}
          leftComponent={{ icon: 'navigate-before', color: '#fff', onPress:() => this.props.history.replace("/") }}
          centerComponent={{ text: 'Add Wallet', style: { fontSize: 20, color: '#fff' } }}
        />
        {content}
      </View>
    )
  }

  save(reload : boolean = false) {
    this.setState({...this.state, Loading : true })
    let savePromise : Promise<any>;
    if(this.props.WalletUUID) {
      savePromise = Models.UpdateWallet(this.props.WalletUUID, this.state)
    } else {
      savePromise = Models.CreateWallet(this.state)
    }
    savePromise.then(() => {
      if (reload) {
        this.props.history.replace("/");
        this.props.history.replace("/AddWalletView");
      } else {
        this.props.history.replace("/");
      }
    }).catch((err: any) => console.log("error", err))
  }
};

export default AddWalletView;
