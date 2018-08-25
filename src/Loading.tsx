import { relative } from "path";
import * as React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Header } from "react-native-elements";

interface IProps {
  Message: string;
}

class Loading extends React.Component<IProps, object> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return <View>
      <ActivityIndicator size={100} style={{ margin: 20 }} />
      <Text style={{ textAlign: "center" }}>{this.props.Message}</Text>
    </View>;
  }
}

export default Loading;
