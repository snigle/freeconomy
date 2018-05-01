import {AnyAction} from "redux"

interface Action extends AnyAction {
    sync : Sync
}

interface Sync{
  syncing : boolean,
  synced : boolean,
}

const DEFAULT_STATE = {
  syncing: false,
  synced: false,
};

const UPDATE_SYNC = "UPDATE_SYNC"

export const syncStart = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : true,
    synced :false,
  },
});

export const syncTerminate = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : false,
    synced :true,
  },
});

export const syncHide = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : false,
    synced :false,
  },
});

export default function(state = DEFAULT_STATE, action : Action) : Sync {
  switch(action.type) {
    case UPDATE_SYNC: {
      return {...action.sync}
    }
    default:
      return state;
  }
}
