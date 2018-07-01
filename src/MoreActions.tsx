import * as React from "react";
import {Modal, Picker, StatusBar, Text, TouchableWithoutFeedback, View} from "react-native";
import {Icon, List, ListItem} from "react-native-elements";
interface IAction {
  title: string;
  onPress: () => void;
}
interface IProps {
  actions: IAction[];
  clicked ?: () => void;
}
export default (props: IProps) => <List containerStyle={{marginTop: -1 }}>
                {
                  props.actions.map((l, i) => (
                    <ListItem
                      key={i}
                      title={l.title}
                      onPress={() => {l.onPress(); if (props.clicked) { props.clicked(); }}}
                    />
                  ))
                }
              </List>;
