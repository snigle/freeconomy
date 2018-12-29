import * as React from "react";
import { Modal, Picker, StatusBar, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
interface IAction {
  title: string;
  onPress: () => void;
}
interface IProps {
  actions: IAction[];
  clicked?: () => void;
}
export default (props: IProps) => <View style={{ marginTop: -1 }}>
  {
    props.actions.map((l, i) => (
      <TouchableHighlight
        key={i}
        onPress={() => { l.onPress(); if (props.clicked) { props.clicked(); } }}>
        <View>
          <ListItem
            title={l.title}
          />
        </View>
      </TouchableHighlight>
    ))
  }
</View>;
