<style lang="scss" scoped>
.material-icons {
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
        <keep-alive><router-view></router-view></keep-alive>
      </div>
    </div>
    <div v-else>{{$t($t.keys.common.loading)}}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Navbar from "../components/navbar-desktop.vue";
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
const checkView = require('vue-check-view') as any;
Vue.use(checkView)
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
  watch: { logged: "watchLogged" },
})
export default class AppVue extends Vue {
  cordova = false;
  loading = true;
  error = "";

  mounted() {
    Promise.all([
      new Promise((resolve, reject) => {
        document.addEventListener(
          "deviceready",
          () => {
            console.log("cordova is ready")
            this.cordova = true;
            resolve(true);
          },
          false
        );
      }),
      store.dispatch.initialize()
    ])
      .then(() => (this.loading = false))
      .catch((e) => {
        store.commit.showError({err:e,text:"fail to init application"})
        this.loading = false
      });
  }

  watchLogged() {
    store.dispatch.loadData().then(() => {
      this.loading = false;
    });
  }

  get logged() {
    return store.state.login.logged;
  }

  sync() {
    store.dispatch.sync();
  }
}
</script>