<style lang="scss" scoped>
.material-icons {
  font-size: 30px;
  vertical-align: middle;
}
</style>
<template>
  <div id="appo" class="modal-open">
    <div v-if="!loading">
      <div v-if="!logged">
        <Navbar>
          <div v-if="cordova" hidden class="nav-link">Cordova active</div>
        </Navbar>
        <Login />
      </div>
      <div v-else>
        <Navbar>
          <li class="nav-item">
            <router-link class="nav-link btn" v-bind:to="{name:'categories'}">
              {{$t($t.keys.sideBar.categories)}}
            </router-link>
          </li>
          <li class="nav-item">
            <button
              v-if="!$store.state.sync.syncing"
              class="nav-link btn"
              v-on:click="sync()"
            >
              {{$t($t.keys.sideBar.sync)}}
              <span v-if="$store.state.sync.error" class="material-icons">sync_problem</span>
              <span v-if="$store.state.sync.synced" class="material-icons">check</span>
            </button>
            <button v-else class="nav-link btn" disabled>
              {{$t($t.keys.sideBar.syncing)}}
              <span class="material-icons rotate">sync</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link btn" v-on:click="logout()">
              {{$t($t.keys.sideBar.logout)}}
            </button>
          </li>
        </Navbar>
        <router-view></router-view>
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
import { routes } from "./router";
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
  store: store.original,
  watch: { logged: "watchLogged" }
})
export default class AppVue extends Vue {
  cordova = false;
  loading = true;
  error = "";

  created() {
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

  watchLogged() {
    store.dispatch.loadData().then(() => {
      this.loading = false;
    });
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
}
</script>