import * as React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";

export default class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <View><Input
      onChangeText={() => { }}
      placeholder="Type Here..." /></View >;
  }

}
