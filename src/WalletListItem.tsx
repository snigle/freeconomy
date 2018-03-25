import * as React from "react"
import {Text, View, Picker, Alert, Button} from "react-native"
import {Wallet, displayPrice} from "./Types"
import {MyLink} from "./Link"
import {History} from "history"
import * as Models from "./Models"
//@ts-ignore
import {TouchableRipple as TouchableHighlight, Dialog, FlatButton} from "carbon-ui"
import {Icon, Divider} from "react-native-elements"
interface Props {
  Wallet : Wallet
  history: History
}
interface State {
  displayOption : boolean,
}

const margins = {}

export default class extends React.Component<Props, State>{
  constructor(props : Props) {
    super(props)
    this.state = { displayOption : false }
  }

  render() {
    let options, dialog : JSX.Element | null;
    if (this.state.displayOption) {
      options = <View>
      <Button onPress={() => this.props.history.push(`/AddWalletView/${this.props.Wallet.UUID}`)} title="Modifier"/>
      <Button onPress={() => this.props.history.push(`/DeleteWalletView/${this.props.Wallet.UUID}/${this.props.Wallet.Name}`)} title="Supprimer"/>
      </View>
    }
    return (
      <View>
      <TouchableHighlight
        onLongPress={() => this.setState({...this.state, displayOption : true})}
        onPress={() => this.props.history.push(`/Wallet/${this.props.Wallet.UUID}/TransactionsView`)}
      >
      <View style={{height: 60, flexDirection: "row", alignItems: "center"}}>
      <View style={{flex:2}}>
      <Icon
        reverse
        name={this.props.Wallet.Icon.Name}
        type={this.props.Wallet.Icon.Type}
        color={this.props.Wallet.Icon.Color}
      />
      </View>
      <View style={{flex:4}}>
      <Text style={margins}>{this.props.Wallet.Name}</Text>
      </View>
      <View style={{flex:2}}>
      <Text style={{...margins, textAlign: "right"}}>{displayPrice(this.props.Wallet.TotalPerYear.reduce((aggregate, current) => aggregate+=current.Total, 0), this.props.Wallet.Currency)}</Text>
      </View>
      </View>
      </TouchableHighlight>
      {this.state.displayOption && options}
      </View>
    )
  }
}
