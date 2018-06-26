import * as React from "react"
import * as _ from "lodash"
import {View, Text, Button, TouchableHighlight} from "react-native"
import {Category} from "./Types"
import {History} from "history"
import {Icon} from "react-native-elements"
import t from "./translator"

interface IProps {
  Category : Category,
  Categories : Category[],
  history: History,
}

interface IState {
  displayOption : boolean
}

export default class extends React.Component<IProps, IState>{
  constructor(props : IProps) {
    super(props)
    this.state = {displayOption : false}
  }

  render() {
    let options, dialog : JSX.Element | null;
    if (this.state.displayOption) {
      options = <View>
      <Button onPress={() => this.props.history.push(`/AddCategoryView/${this.props.Category.UUID}`)} title={t.t("common.edit")}/>
      <Button onPress={() => this.props.history.push(`/DeleteCategoryView/${this.props.Category.UUID}/${this.props.Category.Name}`)} title={t.t("common.remove")}/>
      </View>
    }
    return (
      <View>
      <TouchableHighlight
        onLongPress={() => this.setState({...this.state, displayOption : true})}
        onPress={() => this.props.history.push(`/AddCategoryView/${this.props.Category.UUID}`)}
      >
      <View style={{height: 60, flexDirection: "row", alignItems: "center"}}>
      <View style={{flex:2}}>
      <Icon
        reverse
        name={this.props.Category.Icon.Name}
        type={this.props.Category.Icon.Type}
        color={this.props.Category.Icon.Color}
      />
      </View>
      <View style={{flex:4}}>
      <Text>{this.props.Category.Name}</Text>
      </View>
      <View style={{flex:2}}>
      <Text style={{textAlign: "right"}}>toto</Text>
      </View>
      </View>
      </TouchableHighlight>
      {this.state.displayOption && options}
      </View>
    )
  }
}
