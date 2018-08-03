import { AsyncStorage } from "react-native";
import { store } from "./App";
import * as Driver from "./GoogleSync";
import { setLogout } from "./reducer/login";

export function login() {
  AsyncStorage.removeItem("logged").then(() => {
    store.dispatch(setLogout());
    return AsyncStorage.setItem("redirect_path", window.location.hash.substr(1));
  }).then(() => {
    window.document.location.href = Driver.getURL();
  });
}
