<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="../img/logoa.png" width="30" height="30" class="d-inline-block align-top" alt />
        {{($t($t.keys.common.title))}}
      </a>
      <slot></slot>
    </nav>
    <Alert v-for="err in $store.state.errors" v-bind:key="err.uuid" v-on:close="$store.commit('hideError', err.uuid)">{{err.text}}: {{JSON.stringify(err.err)}}</Alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import t from "../lib/translator";
import Alert from "./alert.vue";

@Component({
  components: {Alert}
})
export default class Login extends Vue {}
</script>