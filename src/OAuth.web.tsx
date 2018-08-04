import { AsyncStorage } from "react-native";
import { store } from "./App";
import * as Driver from "./GoogleSync";
import { setLogout } from "./reducer/login";

export function login() {
  AsyncStorage.removeItem("logged").then(() => {
    store.dispatch(setLogout());
    // If already registered path, don't override.
    return AsyncStorage.getItem("redirect_path").then((path) => path, () => null).then((path) =>
      !path ? AsyncStorage.setItem("redirect_path", window.location.hash.substr(1)) : Promise.resolve(null));
  }).then(() => {
    window.document.location.href = Driver.getURL();
  });
}
