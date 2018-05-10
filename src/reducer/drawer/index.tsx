import {AnyAction} from "redux"

interface Action extends AnyAction {
    drawer : Drawer
}

interface Drawer{
  opened : boolean,
}

const DEFAULT_STATE = {
  opened: false,
};

const UPDATE_DRAWER = "UPDATE_DRAWER"

export const openDrawer = () : Action => ({
  type : UPDATE_DRAWER,
  drawer : {
    opened : true,
  },
});

export const closeDrawer = () : Action => ({
  type : UPDATE_DRAWER,
  drawer : {
    opened: false,
  },
});

export default function(state = DEFAULT_STATE, action : Action) : Drawer {
  switch(action.type) {
    case UPDATE_DRAWER: {
      return {...action.drawer}
    }
    default:
      return state;
  }
}
