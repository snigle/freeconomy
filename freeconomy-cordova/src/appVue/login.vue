<template>
  <div>
    <div>Login Page</div>
    <button class="btn btn-primary" v-on:click="login">Click here to login</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { login } from "../lib/oauth";
import store from "./store";
import { GoogleSync } from "../lib/sync";
@Component({})
export default class Login extends Vue {
  login() {
    console.log("try to login");
    store.dispatch.login().then(() => GoogleSync());
  }
}
</script>