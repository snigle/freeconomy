import * as React from "react";
import { Text, View } from "react-native";
import { BackButton, NativeRouter } from "react-router-native";
import App from "./App";

const Router = <NativeRouter>
  <View style={{ flex: 1 }}>
    <BackButton />
    <App />
  </View>
</NativeRouter>;

export default (props: any) => {
  console.log("main props", props);
  const { navigationKey } = props;
  if (navigationKey === "MedicationScreen") {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          I am in medication screen !
          </Text>
      </View>
    );
  }
  return Router;
};
