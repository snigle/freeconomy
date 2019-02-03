// @ts-ignore
// import { WebStyles } from "carbon-ui";
import * as React from "react";
import { View } from "react-native";
import { HashRouter } from "react-router-dom";
import App from "./App";

export default class extends React.PureComponent {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return <HashRouter>
      <View style={{ flex: 1 }}>
        {/* <WebStyles /> */}
        <App />
      </View>
    </HashRouter>;
  }
}
