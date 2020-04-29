<template>
  <div>
    <div>{{$t($t.keys.login.welcome)}}</div>
    <button class="btn btn-primary" v-on:click="login">{{$t($t.keys.login.buttonWithGoogle)}}</button>
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
    store.dispatch.loginAndSync();
  }
}
</script>