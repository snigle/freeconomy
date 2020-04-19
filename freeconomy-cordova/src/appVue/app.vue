<template>
  <div id="appo">
    <div v-if="loading">
      <div v-if="!logged">
        <Navbar>
          <div v-if="cordova" class="nav-link">Cordova active</div>
        </Navbar>
        <Login />
      </div>
      <div v-else>
        <Navbar>
          <div v-if="cordova" class="nav-link">Logged</div>
          <div v-if="cordova" class="nav-link">Cordova active</div>
        </Navbar>
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
import Login from "./login.vue";
import Component from "vue-class-component";
import * as Models from "../lib/models";
import Vuex from "vuex";

import store from "./store";

Vue.use(VueRouter);

const Foo = Vue.extend({ template: "<div>foo</div>" });
const Bar = Vue.extend({ template: "<div>bar</div>" });

const toto: string = "10";
const routes: Array<RouteConfig> = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar }
];

const router = new VueRouter({
  routes
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
    Promise.all(
      [
        new Promise((resolve, reject) => {
          document.addEventListener(
          "deviceready",
          () => (this.cordova = true),
          false
        );
        }),
        store.dispatch.initialize(),
      ]
    ).then(() => this.loading = false);
  }

  get logged() {
    return store.getters.isLogged;
  }
}
</script>