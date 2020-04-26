<template>
  <div id="appo">
    <div v-if="!loading">
      <div v-if="!logged">
        <Navbar>
          <div v-if="cordova" class="nav-link">Cordova active</div>
        </Navbar>
        <Login />
      </div>
      <div v-else>
        <Navbar>
          <div v-if="cordova" class="nav-link">Logged</div>
          <button class="nav-link" v-on:click="logout()">Logout</button>
          <button class="nav-link" v-on:click="sync()">Sync</button>
          <div v-if="cordova" class="nav-link">Cordova active</div>
        </Navbar>
        <router-view></router-view>
        <div>Loggin OK</div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Navbar from "../components/navbar.vue";
import Modal from "../components/modal.vue";
import Login from "./login.vue";
import Component from "vue-class-component";
import * as Models from "../lib/models";
import Vuex from "vuex";
import EditTransaction from "./editTransaction.vue";
import Desktop from "./desktop.vue";

import store from "./store";

Vue.use(VueRouter);

const Foo = Vue.extend({ template: "<div>foo</div>" });
const EditTransactionModal = Vue.extend({ template: "<Modal><template v-slot:header>Edit transaction</template><EditTransaction /></Modal>", components: { Modal, EditTransaction } });

const toto: string = "10";
const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Desktop,
    children: [
      { path: "", name: "transactions" },
      {
        path: "transaction/:transaction",
        name: "editTransaction",
        component: EditTransactionModal
      },
      {
        path: "transaction",
        name: "addTransaction",
        component: EditTransactionModal
      },
      { path: "transfert/:transfert", name: "editTransfert", component: EditTransactionModal }
      // ]},
      // { path: "transactions/wallet/:wallet", name: "transactionsByWallet", children: [
      // { path: "transaction/:transaction", name: "editTransaction", component: Bar },
      // { path: "transfert/:transfert", name: "editTransfert", component: Bar },
      // ]},
    ]
  },
];

const router = new VueRouter({
  routes,
  linkExactActiveClass : "active"
});

@Component({
  router,
  components: {
    Navbar,
    Login
  },
  store: store.original
})
export default class AppVue extends Vue {
  msg = "Welcome to Your Vue.js App";
  message = "test";
  cordova = false;
  loading = true;

  mounted() {
    console.log("mounted")
    Promise.all([
      new Promise((resolve, reject) => {
        document.addEventListener(
          "deviceready",
          () => {
            this.cordova = true;
            resolve(true);
          },
          false
        );
      }).then(() => console.log("cordova ok")),
      store.dispatch.initialize()
    ]).then(() => (this.loading = false)).catch(() => this.loading = false);
  }

  get logged() {
    return store.state.login.logged;
  }

  logout() {
    (window as any).plugins.googleplus.disconnect(() => {
      store.dispatch.logout()
    }, (err :any)=> console.log("logout issue", err));
    store.dispatch.logout()
  }

  sync () {
    store.dispatch.sync();
  }
}
</script>