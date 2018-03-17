import * as React from "react"
import * as Models from "./Models"
import {Wallet, displayPrice} from "./Types"
import Loading from "./Loading"
import WalletListItem from "./WalletListItem"
import AddWalletView from "./AddWalletView"
import {View, Button, Text} from "react-native"
import {History} from "history"
import {MyLink} from "./Link"
import {GoogleSync} from "./Sync"
import * as _ from "lodash"
//@ts-ignore
import { AppBar, Icon, Paper, Display1, FlatButton, connectTheme, Divider } from 'carbon-ui'

interface State {
  Wallets ?: Wallet[],
}

interface Props {
  history : History
}

class Wallets extends React.Component<Props,State>{

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    Models.GetWallets().then(wallets => this.setState({ Wallets : wallets}))
    .catch(() => console.log("fail to load wallets, need to reset ?"))
  }

  render() {
    let content: any
    if (!this.state.Wallets) {
     content = <Loading Message="Chargement des wallets" />;
   } else {

     const groupWallet = _.groupBy(this.state.Wallets, w => w.Currency.Code);

     content = _.map(groupWallet, (wallets, currencyCode) => {
       const total: number = wallets.reduce((sumTotal, w) =>
       sumTotal + w.TotalPerYear.reduce((sumPerWallet, totalYear) =>
       totalYear.Total + sumPerWallet , 0) , 0)

       return <View>
         <Text>{`Wallets (${currencyCode}) : ${displayPrice(total, wallets[0].Currency)}`}</Text>
         {
           wallets.map((wallet) =>
             <WalletListItem key={wallet.UUID} Wallet={wallet} history={this.props.history}></WalletListItem>
           )
         }
         <Divider />
         </View>
     });

   }

    return <View>
    <AppBar title="Freeconomy">
      <View style={{flexDirection:"row"}}>
        <MyLink to="/AddWalletView"><Icon name="add" /></MyLink>
        <Button onPress={() => GoogleSync()} title="Sync" />
        <Button onPress={() => Models.SaveLogin({id : "", token : "", expires : new Date()})} title="Logout" />
      </View>
    </AppBar>
    {content}
    </View>
  }

}

export default Wallets;
