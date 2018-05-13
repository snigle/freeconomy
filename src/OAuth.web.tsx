import * as Driver from "./GoogleSync";

export function login() {
  window.document.location.href = Driver.getURL();
}
