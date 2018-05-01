import {AnyAction} from "redux"

interface Action extends AnyAction {
    sync : Sync
}

interface Sync{
  syncing : boolean,
  synced : boolean,
  error : boolean,
}

const DEFAULT_STATE = {
  syncing: false,
  synced: false,
  error : false,
};

const UPDATE_SYNC = "UPDATE_SYNC"

export const syncStart = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : true,
    synced :false,
    error : false,
  },
});

export const syncTerminate = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : false,
    synced :true,
    error: false,
  },
});

export const syncHide = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : false,
    synced :false,
    error : false,
  },
});

export const syncError = () : Action => ({
  type : UPDATE_SYNC,
  sync : {
    syncing : false,
    synced :false,
    error : true,
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
