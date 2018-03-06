import * as React from "react"
import * as Models from "./Models"
import {Wallet} from "./Models"
import Loading from "./Loading"
// import WalletListItem from "./WalletListItem"
import AddWalletView from "./AddWalletView"
import {View, Button, Text} from "react-native"
// import {Route} from "react-router"
// import {Link} from "react-router-dom"
interface State {
  Wallets ?: Wallet[],
}

interface Props {
}

class Wallets extends React.Component<object,State>{

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  // async componentDidMount() {
  //   try{
  //     this.setState({ Wallets : await Models.GetWallets() })
  //   }catch {
  //     console.log("fail")
  //   }
  // }

render() {
  return <View><Text>testoooooooooaaaaaaaaaaaaaaaaaaaaaooo</Text><Text>test</Text></View>
}
  // render() {
  //
  //   if (!this.state.Wallets) {
  //     return <Loading Message="Chargement des wallets"></Loading>;
  //   }
  //
  //   // <Link to="/AddWalletView"></Link>
  //   // <Route path="/AddWalletView" component={AddWalletView}></Route>
  //   return <View>
  //   <Text>Test</Text>
  //   {
  //     this.state.Wallets.map((wallet,index) =>
  //       <WalletListItem key={index} Wallet={wallet}></WalletListItem>
  //     )
  //   }
  //   </View>
  // }

}

export default Wallets;
