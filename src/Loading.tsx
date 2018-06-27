import * as React from "react";
import {Text} from "react-native";

interface IProps {
  Message: string;
}

class Loading extends React.Component<IProps, object> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return <Text>{this.props.Message}</Text>;
  }
}

export default Loading;
