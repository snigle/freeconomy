import { AppRegistry } from "react-native";
import App from "./lib/Router";
AppRegistry.registerComponent("freeconomy", () => App);

 if (window.document) {
     AppRegistry.runApplication("freeconomy", {
         initialProps : {},
         rootTag : document.getElementById("react-root"),
     });
 }
