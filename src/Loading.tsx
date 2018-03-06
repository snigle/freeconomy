import * as React from "react"
import {Text} from "react-native"

interface Props {
  Message : string
}

class Loading extends React.Component<Props,object>{
  constructor(props: Props) {
    super(props);
  }
  render(){
    return <Text>{this.props.Message}</Text>;
  }
}

export default Loading
