import React from "react";
import "babel-polyfill";
import { AppRegistry } from "react-native";
import App from "./lib/Router";
import TestPerf from "./lib/TestPerf";
// require("./style.less")
AppRegistry.registerComponent("freeconomy", () => App);

AppRegistry.runApplication("freeconomy", {
    initialProps: {},
    rootTag: document.getElementById("react-root"),
});
