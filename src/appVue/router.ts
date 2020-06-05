
import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";

import Wallets from "./wallets.vue";
import Transactions from "./transactions.vue";
import Stats from "./stats.vue";

import EditTransaction from "./editTransaction.vue";
import EditTransfert from "./editTransfert.vue";
import Categories from "./categories.vue";
import EditCategory from "./editCategory.vue";
import EditWallet from "./editWallet.vue";
import EditTotalWallet from "./editTotalWallet.vue";
import Desktop from "./desktop.vue";
import Modal from "../components/modal.vue";
import bsBreakpoints from 'bs-breakpoints'

const EditTransactionModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.transactionsView.editTransaction)}}</template><EditTransaction /></Modal>`,
    components: { Modal, EditTransaction }
});

const EditTransfertModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.transactionsView.editTransfert)}}</template><EditTransfert /></Modal>`,
    components: { Modal, EditTransfert }
});

const CategoriesModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.sideBar.categories)}}</template><Categories /></Modal>`,
    components: { Modal, Categories }
});
const EditCategoryModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.common.edit)}}</template><EditCategory /></Modal>`,
    components: { Modal, EditCategory }
});

const EditWalletModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.common.edit)}}</template><EditWallet /></Modal>`,
    components: { Modal, EditWallet }
});

const EditTotalWalletModal = Vue.extend({
    template: `<Modal v-on:close="$router.back()"><template v-slot:header>{{$t($t.keys.common.edit)}}</template><EditTotalWallet /></Modal>`,
    components: { Modal, EditTotalWallet }
});

export const desktopRoutes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: Desktop,
        children: [
            { path: "", name: "transactions", },
            {
                path: "",
                name: "stats",
            },
            { path: "editTotalWallet/:wallet", name: "editTotalWallet", component: EditTotalWalletModal},
            {
                path: "categories",
                name: "categories",
                component: CategoriesModal
            },
            {
                path: "editCategory/:category",
                name: "editCategory",
                component: EditCategoryModal
            },
            {
                path: "editWallet/:wallet",
                name: "editWallet",
                component: EditWalletModal
            },
            {
                path: "addWallet",
                name: "addWallet",
                component: EditWalletModal
            },
            {
                path: "addCategory",
                name: "addCategory",
                component: EditCategoryModal
            },
            {
                path: "transaction/:transaction",
                name: "editTransaction",
                component: EditTransactionModal
            },
            {
                path: "addTransaction",
                name: "addTransaction",
                component: EditTransactionModal
            },
            {
                path: "transfert/:transfert",
                name: "editTransfert",
                component: EditTransfertModal
            },
            {
                path: "addTransfert",
                name: "addTransfert",
                component: EditTransfertModal
            },
        ]
    }
];

export const mobileRoutes = [
    {
        path: "/",
        name: "home",
        component: Wallets,
        children: [
            { path: "/editTotalWallet/:wallet", name: "editTotalWallet", component: EditTotalWalletModal},
        ]
    },
    {
        path: "/editWallet/:wallet",
        name: "editWallet",
        component: EditWallet
    },
    {
        path: "/addWallet",
        name: "addWallet",
        component: EditWallet
    },

    { path: "/transactions", name: "transactions", component: Transactions },
    {
        path: "/categories",
        name: "categories",
        component: Categories
    },
    {
        path: "/editCategory/:category",
        name: "editCategory",
        component: EditCategory
    },

    {
        path: "/addCategory",
        name: "addCategory",
        component: EditCategory
    },
    {
        path: "/transaction/:transaction",
        name: "editTransaction",
        component: EditTransaction
    },
    {
        path: "/addTransaction",
        name: "addTransaction",
        component: EditTransaction
    },
    {
        path: "/transfert/:transfert",
        name: "editTransfert",
        component: EditTransfert
    },
    {
        path: "/addTransfert",
        name: "addTransfert",
        component: EditTransfert,
    },
    {
        path: "/stats",
        name: "stats",
        component: Stats,
    }
];

console.log("current breakpoint");

export let routes = desktopRoutes;
if (["small", "xSmall"].indexOf(bsBreakpoints.detectBreakpoint()) !== -1) {
    routes = mobileRoutes;
}