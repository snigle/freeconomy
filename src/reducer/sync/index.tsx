import { AnyAction } from "redux";

interface IAction extends AnyAction {
  sync: ISync;
}

interface ISync {
  syncing: boolean;
  synced: boolean;
  error: boolean;
}

const DEFAULT_STATE = {
  syncing: false,
  synced: false,
  error: false,
};

const UPDATE_SYNC = "UPDATE_SYNC";

export const syncStart = (): IAction => ({
  type: UPDATE_SYNC,
  sync: {
    syncing: true,
    synced: false,
    error: false,
  },
});

export const syncTerminate = (): IAction => ({
  type: UPDATE_SYNC,
  sync: {
    syncing: false,
    synced: true,
    error: false,
  },
});

export const syncHide = (): IAction => ({
  type: UPDATE_SYNC,
  sync: {
    syncing: false,
    synced: false,
    error: false,
  },
});

export const syncError = (): IAction => ({
  type: UPDATE_SYNC,
  sync: {
    syncing: false,
    synced: false,
    error: true,
  },
});

export default function(state = DEFAULT_STATE, action: IAction): ISync {
  switch (action.type) {
    case UPDATE_SYNC: {
      return { ...action.sync };
    }
    default:
      return state;
  }
}
