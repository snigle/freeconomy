<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><img src="../img/logoa.png" width="30" height="30" class="d-inline-block align-top rounded" alt />
  {{($t($t.keys.common.title))}}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <slot></slot>
  </div>
</nav>
    <Alert
      v-for="err in $store.state.errors"
      v-bind:key="err.uuid"
      v-on:close="$store.commit('hideError', err.uuid)"
    >{{err.text}}: {{JSON.stringify(err.err)}}</Alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import t from "../lib/translator";
import Alert from "./alert.vue";

@Component({
  components: { Alert }
})
export default class Login extends Vue {}
</script>