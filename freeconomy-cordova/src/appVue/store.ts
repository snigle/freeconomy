import Vue from "vue";
import Vuex from "vuex";

import { createDirectStore } from "direct-vuex"
import * as Models from "../lib/models"
import {ILogin, IWallet, ITransfert, ITransaction, ICategory} from "../lib/types"
import {login} from "../lib/oauth"
import _ from "lodash";
import { GoogleSync } from "../lib/sync";

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
        wallets: [] as Array<IWallet>,
        categories: [] as Array<ICategory>,
        transactions: [] as Array<ITransaction>,
        transferts: [] as Array<ITransfert>,
    },
    getters: {
    },
    mutations: {
        setWallets(state, wallets : Array<IWallet>) {
            state.wallets = wallets;
        },
        setTransactions(state, transactions : Array<ITransaction>) {
            state.transactions = transactions;
        },
        setTransferts(state, transferts : Array<ITransfert>) {
            state.transferts = transferts;
        },
        setCategories(state, categories: Array<ICategory>) {
            state.categories = categories;
        },
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
            return login().then((login => Models.SaveLogin(login))).then(login =>state.commit("setLogged", login)).catch(e => {state.commit("setLoginError",e); throw e});
        },
        loginAndSync (state) {
            return state.dispatch("login").then(() => state.dispatch("sync"));
        },
        logout (state) {
            return Models.CleanAll().then(() => state.commit("setLogout"));
        },
        sync(state) {
            return GoogleSync().catch(() => state.commit("syncError"));
        },
        initialize(state) {
            return Promise.all([
                Models.GetLogin().then(login =>state.commit("setLogged", login)).catch(err => console.log("not logged",err)),
                Models.getAutoSync().then((value) => state.commit("setAutosync", value)),
            ])
        },
        loadData(state) {
           return Promise.all([
               Models.GetWallets().then(wallets => state.commit("setWallets", wallets)),
               Models.GetAllTransactions().then(transactions => state.commit("setTransactions", transactions)),
               Models.GetTransferts().then(transferts => state.commit("setTransferts", transferts)),
               Models.GetCategories().then(categories => state.commit("setCategories", categories)),
           ]) 
        }
    }
})

export default store;

export { rootActionContext, moduleActionContext }
