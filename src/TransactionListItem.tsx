import * as React from "react"
import {Text, View, Button} from "react-native"
import {Transaction, displayPrice, Currency} from "./Types"
import {MyLink} from "./Link"
import {History} from "history"
import * as Models from "./Models"
//@ts-ignore
import {Icon, TouchableRipple} from "carbon-ui"

interface Props {
  Transaction : Transaction,
  CurrentTotal : number,
  Currency : Currency,
  history : History,
}

interface State {
  displayOption : boolean,
  deleted : boolean,
}

const margins = {marginLeft : 15, marginRight : 15}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { displayOption : false, deleted : false };
  }

  render() {
    const options = <View>
    <Button onPress={() => this.delete()} title="Supprimer" />
    </View>
    return <TouchableRipple
      onPress={() => this.props.history.push(`/Wallet/${this.props.Transaction.WalletUUID}/AddTransactionView/${this.props.Transaction.UUID}`)}
      onLongPress={() => this.setState({...this.state, displayOption : true})}
      style={{display: this.state.deleted ?"none" : undefined}}
      >
    <View>
    <View style={{height: 60, flexDirection: "row", alignItems: "center", justifyContent:"center"}}>
    <View style={{flex:1}}>
    <Icon name="account_balance_wallet" style={margins}/>
    </View>
    <View style={{flex:5}}>
    <Text style={margins}>{this.props.Transaction.Beneficiary}</Text>
    </View>
    <View style={{flex:3}}>
    <Text style={{...margins, textAlign: "right", fontSize:18, color : this.props.Transaction.Price > 0 ? "green": "red"}}>{displayPrice(this.props.Transaction.Price, this.props.Currency)}</Text>
    <Text style={{...margins, textAlign: "right", fontSize:10}}>{displayPrice(this.props.CurrentTotal, this.props.Currency)}</Text>
    </View>
    </View>
    {this.state.displayOption && options}
    </View>
    </TouchableRipple>
  }

  delete() {
    Models.DeleteTransaction(this.props.Transaction.UUID).then( () => this.setState({deleted : true}) )
  }
}
