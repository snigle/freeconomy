import Vue from "vue";
import Vuex from "vuex";

import { createDirectStore, StateDeclaration } from "direct-vuex"
import * as Models from "../lib/models"
import { ILogin, IWallet, ITransfert, ITransaction, ICategory, IRepeatable, displayPrice } from "../lib/types"
import { login } from "../lib/oauth"
import _ from "lodash";
import { GoogleSync } from "../lib/sync";
import { v4 } from "uuid"; 
import moment from "moment";
import bsBreakpoints from "bs-breakpoints";

interface IError { 
    text: string;
    err?: any;
    uuid: string;
}

export type IWalletWithTotalToCome = IWallet & { Total: number, TotalToCome: number, OperationsToCome: number }
 
Vue.use(Vuex);
const { store, rootActionContext, moduleActionContext } = createDirectStore({
    namespaced: true as true,
    state: {
        login: {
            logged: false,
            data: null as ILogin | null,
            error: null as string | null,
        },
        settings: {
            discretMode: localStorage.getItem("settings.discretMode") === "true",
        },
        mobileView: ["small", "xSmall"].indexOf(bsBreakpoints.detectBreakpoint()) !== -1,
        errors: [] as Array<IError>,
        sync: {
            syncing: false,
            synced: false,
            error: false,
        },
        wallets: [] as Array<IWallet>,
        categories: [] as Array<ICategory>, 
        transactions: [] as Readonly<Array<ITransaction>>,
        transferts: [] as Readonly<Array<ITransfert>>,
    },
    getters: {
        walletsWithPriceToCome(state, getters): Array<IWalletWithTotalToCome> {
            return state.wallets.map(w => {
                const totalToCome = (getters.getRepeatOperations as IRepeatable[]).filter((r : IRepeatable) => 
                    r.Transaction?.New.WalletUUID === w.UUID || 
                    r.Transfert?.New.From.WalletUUID === w.UUID || 
                    r.Transfert?.New.To.WalletUUID === w.UUID
                    ).reduce((price, r) => {
                        if (!_.isUndefined(r.Transaction)){
                            price.TotalToCome+=r.Transaction.New.Price
                        } else if (!_.isUndefined(r.Transfert) && r.Transfert.New.From.WalletUUID === w.UUID){
                            price.TotalToCome-= r.Transfert.New.From.Price
                        } else if (!_.isUndefined(r.Transfert) && r.Transfert.New.To.WalletUUID === w.UUID){
                            price.TotalToCome+= r.Transfert.New.To.Price
                        }
                        price.OperationsToCome++;
                        return price
                    },{TotalToCome: 0, OperationsToCome: 0, Total: displayPrice(w.Solde+_.sumBy(w.TotalPerYear, (total) => total.Total))})
                return {...w, ...totalToCome}
            });
        },
        getRepeatOperations(state): IRepeatable[] {
            // Get all repeat transaction
            const transactions = state.transactions.filter((tr) => tr.Repeat !== null);
            const transferts = state.transferts.filter((tr) => tr.Repeat !== null);

            const results: IRepeatable[] = [];

            const repeatTreshold = moment().add(5, "days");
            _.forEach(transactions, (tr) => {
                if (!tr.Repeat) {
                    return;
                }
                const repeatDate = moment(tr.Date).add(tr.Repeat.Duration, tr.Repeat.DurationType);
                if (tr.Repeat && tr.Repeat.MaxOccurrence !== 0 && repeatTreshold.isAfter(repeatDate)) {
                    const nextMaxOccurence = tr.Repeat.MaxOccurrence == -1 ? -1 : tr.Repeat.MaxOccurrence-1;
                    results.push({
                        Key: `${tr.UUID}-repeat`,
                        Transaction: {
                            From: tr,
                            New: {
                                Beneficiary: tr.Beneficiary,
                                CategoryUUID: tr.CategoryUUID,
                                Comment: tr.Comment,
                                Date: repeatDate.toDate(),
                                Price: tr.Price,
                                Repeat:  nextMaxOccurence !== 0 ? {
                                    Duration: tr.Repeat.Duration,
                                    DurationType: tr.Repeat.DurationType,
                                    MaxOccurrence: nextMaxOccurence,
                                } : null,
                                WalletUUID: tr.WalletUUID,
                            },
                        },
                    });
                }
            });

            _.forEach(transferts, (tr) => {
                if (!tr.Repeat) {
                    return;
                }
                const repeatDate = moment(tr.Date).add(tr.Repeat.Duration, tr.Repeat.DurationType);
                if (tr.Repeat && tr.Repeat.MaxOccurrence !== 0 && repeatTreshold.isAfter(repeatDate)) {
                    const nextMaxOccurence = tr.Repeat.MaxOccurrence == -1 ? -1 : tr.Repeat.MaxOccurrence-1;
                    results.push({
                        Key: `${tr.UUID}-repeat`,
                        Transfert: {
                            From: tr,
                            New: {
                                Comment: tr.Comment,
                                Date: repeatDate.toDate(),
                                Repeat: nextMaxOccurence !== 0 ? {
                                    Duration: tr.Repeat.Duration,
                                    DurationType: tr.Repeat.DurationType,
                                    MaxOccurrence: nextMaxOccurence,
                                } : null,
                                From: { ...tr.From },
                                To: { ...tr.To },
                            },
                        },
                    });
                }
            });

            return results;
        }
    },
    mutations: {
        toggleDiscretMode(state) {
            state.settings.discretMode = !state.settings.discretMode
            localStorage.setItem("settings.discretMode",`${state.settings.discretMode}`)
        },
        setWallets(state, wallets: Array<IWallet>) {
            state.wallets = wallets;
        },
        setTransactions(state, transactions: Array<ITransaction>) {
            state.transactions = Object.freeze(transactions);
        },
        setTransferts(state, transferts: Array<ITransfert>) {
            state.transferts = Object.freeze(transferts);
        },
        setCategories(state, categories: Array<ICategory>) {
            state.categories = categories;
        },
        setLogged(state, login: ILogin) {
            state.login.logged = true;
            state.login.data = login;
        },
        setLoginError(state, error: string) {
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
        },
        showError(state: StateDeclaration, err: { err?: any, text: string }) {
            state.errors.push({
                uuid: v4(),
                err: err.err,
                text: err.text,
            })
        },
        hideError(state: StateDeclaration, uuid: string) {
            state.errors = state.errors.filter((e: IError) => e.uuid !== uuid)
        }
    },
    actions: {
        login(state) {
            return login().then((login => Models.SaveLogin(login)));
        },
        loginAndSync(state) {
            return state.dispatch("login").then((login) => state.dispatch("sync").then(() => state.commit("setLogged", login)));
        },
        logout(state) {
            return Models.CleanAll().then(() => state.commit("setLogout"));
        },
        sync(state) {
            console.log("trying to sync");
            return _.throttle(() => GoogleSync(), 0, { leading: true, trailing: true })().catch(() => state.commit("syncError"));
        },
        initialize(state) {
            Models.GetLogin().then(login => state.commit("setLogged", login)).catch(() => {/*no error if not logged*/ })
        },
        loadData(state) {
            return Promise.all([
                state.dispatch("loadWallets"),
                Models.GetAllTransactions().then(transactions => state.commit("setTransactions", transactions)),
                Models.GetTransferts().then(transferts => state.commit("setTransferts", transferts)),
                Models.GetCategories().then(categories => state.commit("setCategories", categories)),
            ])
        },
        loadWallets(state) {
            return Models.GetWallets().then(wallets => state.commit("setWallets", wallets));
        }
    }
})

export default store;

export { rootActionContext, moduleActionContext }
