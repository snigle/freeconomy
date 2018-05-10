import {AnyAction} from "redux"

interface Action extends AnyAction {
    login : Login
}

interface Login{
  logged : boolean,
}

const DEFAULT_STATE = {
  logged: false,
};

const UPDATE_LOGIN = "UPDATE_LOGIN"

export const setLogged = () : Action => ({
  type : UPDATE_LOGIN,
  login : {
    logged : true,
  },
});

export const setLogout = () : Action => ({
  type : UPDATE_LOGIN,
  login : {
    logged: false,
  },
});

export default function(state = DEFAULT_STATE, action : Action) : Login {
  switch(action.type) {
    case UPDATE_LOGIN: {
      return {...action.login}
    }
    default:
      return state;
  }
}
