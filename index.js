import React from "react";
import { AppRegistry } from "react-native";
import App from "./lib/Router";
AppRegistry.registerComponent("freeconomy", () => App);

console.log("load web ", window.document);
 if (window.document) {
   console.log("log react-native-web");
     AppRegistry.runApplication("freeconomy", {
         initialProps : {},
         rootTag : document.getElementById("react-root"),
     });
 }
