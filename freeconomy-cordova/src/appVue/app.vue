<template>
  <div id="appo">
    <div v-if="!logged">
      <Navbar>
        <div v-if="cordova" class="nav-link">Cordova active</div>
      </Navbar>
      <Login />
    </div>
    <div v-else>
      <div>Display routes</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter, { Route, RouteConfig } from "vue-router";
import Navbar from "../components/navbar.vue";
import Login from "./login.vue";
import Component from "vue-class-component";

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
  }
})
export default class AppVue extends Vue {
  msg = "Welcome to Your Vue.js App";
  message = "test";
  logged = false;
  cordova = false;

  mounted() {
    document.addEventListener(
      "deviceready",
      () => (this.cordova = true),
      false
    );
  }
}
</script>