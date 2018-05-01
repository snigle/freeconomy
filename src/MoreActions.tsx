import * as React from "react"
//@ts-ignore
import {Overlay} from "react-native-elements"
import {Icon, List, ListItem} from "react-native-elements"
import {View, Text, Picker, StatusBar, TouchableWithoutFeedback, Modal} from "react-native"
interface Action {
  title : string,
  onPress : () => void
}
interface Props {
  actions : Action[],
  clicked ?: () => void,
}
export default (props: Props) => <List containerStyle={{marginTop:-1 }}>
                {
                  props.actions.map((l, i) => (
                    <ListItem
                      key={i}
                      title={l.title}
                      onPress={() => {l.onPress(); if (props.clicked) { props.clicked()}}}
                    />
                  ))
                }
              </List>
