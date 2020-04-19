import Vue from "vue";
import Vuex from "vuex";

import { createDirectStore } from "direct-vuex"
import * as Models from "../lib/models"
import {ILogin} from "../lib/types"
import {login} from "../lib/oauth"

Vue.use(Vuex);
const { store, rootActionContext, moduleActionContext } = createDirectStore({
    namespaced: true as true,
    state: {
        login: {
            logged: false,
            data: null as ILogin | null,
            error: null as string | null,
        },
        autosync: false,
        sync: {
            syncing: false,
            synced: false,
            error: false,
        },
        wallets: [],
        categories: [],
        transactions: [],
    },
    getters: {
        isLogged(state) { return state.login.logged },
    },
    mutations: {
        setAutosync(state, value: boolean) {
            state.autosync = value;
        },
        setLogged(state, login : ILogin) {
            state.login.logged = true;
            state.login.data = login;
        },
        setLoginError(state, error : string) {
            state.login.error = error;
        },
        setLogout(state) {
            state.login.logged = false;
        },
        syncStart(state) {
            state.sync = {
                syncing: true,
                synced: false,
                error: false,
            };
        },
        syncTerminate(state) {
            state.sync = {
                syncing: false,
                synced: true,
                error: false,
            };
        },
        syncHide(state) {
            state.sync = {
                syncing: false,
                synced: false,
                error: false,
            };
        },
        syncError(state) {
            state.sync = {
                syncing: false,
                synced: false,
                error: true,
            };
        }
    },
    actions: {
        enableAutosync(state) {
            Models.setAutoSync(true).then(() => state.commit("setAutosync", true));
        },
        login (state) {
            return login().then((login => Models.SaveLogin(login))).then(login =>state.commit("setLogged", login)).catch(e => state.commit("setLogginError",e));
        },
        logout (state) {
            return Models.CleanAll().then(() => state.commit("setLogout"));
        },
        initialize(state) {
            return Promise.all([
                Models.GetLogin().then(login =>state.commit("setLogged", login)).catch(err => console.log("not logged",err)),
                Models.getAutoSync().then((value) => state.commit("setAutosync", value)),
            ]);
        },
    }
})

export default store;

export { rootActionContext, moduleActionContext }
