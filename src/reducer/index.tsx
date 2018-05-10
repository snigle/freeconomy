import { combineReducers } from "redux";

import sync from "./sync"
import login from "./login"

export default combineReducers({
  sync : sync,
  login : login,
});
