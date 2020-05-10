<template>
  <div id="appo" class="modal-open">
    <div v-if="!loading">
      <div v-if="!logged">
        <Navbar>
          <div v-if="cordova" class="nav-link">Cordova active</div>
        </Navbar>
        <Login />
      </div>
      <div v-else>
        <Navbar>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link
                class="nav-link"
                v-bind:to="{name:'transactions'}"
              >{{$t($t.keys.sideBar.home)}}</router-link>
            </li>
            <li class="nav-item active">
              <router-link
                class="nav-link"
                v-bind:to="{name:'categories'}"
              >{{$t($t.keys.sideBar.categories)}}</router-link>
            </li>
            <li class="nav-item active">
              <button
                v-if="!$store.state.sync.syncing"
                class="nav-link btn my-2 my-sm-0"
                v-on:click="sync()"
              >
                {{$t($t.keys.sideBar.sync)}}
                <span
                  v-if="$store.state.sync.error"
                  class="material-icons"
                >sync_problem</span>
                <span v-if="$store.state.sync.synced" class="material-icons">check</span>
              </button>
              <button v-else class="nav-link btn my-2 my-sm-0" disabled>
                {{$t($t.keys.sideBar.syncing)}}
                <span class="material-icons rotate">sync</span>
              </button>
            </li>
            <li class="nav-item active">
              <button
                class="nav-link btn my-2 my-sm-0"
                v-on:click="logout()"
              >{{$t($t.keys.sideBar.logout)}}</button>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-on:input="search($event.target.value)"
              v-bind:value="navSearch"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </Navbar>
        <!-- Key permit to rerender route with same component (eg: editTransaction component used for edit and create) -->
        <router-view :key="$route.name"></router-view>
        <div>Loggin OK</div>
      </div>
    </div>
    <div v-else>{{$t($t.keys.common.loading)}}</div>
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
import EditTransfert from "./editTransfert.vue";
import Categories from "./categories.vue";
import EditCategory from "./editCategory.vue";
import Desktop from "./desktop.vue";

import store from "./store";
import { TranslatePlugin } from "../lib/translator";
import _ from "lodash";
Vue.use(VueRouter);
Vue.use(TranslatePlugin);

declare module "vue/types/vue" {
  // 3. Déclarez l'augmentation pour Vue
  interface Vue {
    $iconMap: (name: string) => string;
  }
}

Vue.prototype.$iconMap = (name: string) => {
  return name.replace(/-/g, "_");
};

const Foo = Vue.extend({ template: "<div>foo</div>" });
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

const toto: string = "10";
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Desktop,
    children: [
      { path: "", name: "transactions" },
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
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkExactActiveClass: "active"
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
  error = "";
  navSearch = "";

  created() {
    this.navSearch = _.isString(this.$route.query.search)
      ? this.$route.query.search
      : "";
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
      }),
      store.dispatch.initialize()
    ])
      .then(() => (this.loading = false))
      .catch(() => (this.loading = false));
  }

  get logged() {
    return store.state.login.logged;
  }

  logout() {
    (window as any).plugins.googleplus.disconnect(
      () => {
        store.dispatch.logout();
      },
      (err: any) => store.commit.showError({ err, text: "fail to logout" })
    );
    store.dispatch.logout();
  }

  sync() {
    store.dispatch.sync();
  }

  updateSearchQuery() {
    console.log("debounce", this.navSearch);
  }

  search(search: string) {
    this.navSearch = search;
    _.debounce(() => {
      if (this.$route.query.search !== search) {
        this.$router.replace({
          name: this.$route.name || "",
          query: { ...this.$route.query, search }
        });
      }
    }, 500)();
  }
}
</script>