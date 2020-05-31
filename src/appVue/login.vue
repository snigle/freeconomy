<style lang="scss" scoped>
.card {
}
</style>
<template>
  <div class="container">
    <div class="row justify-content-sm-center">
      <div class="col-sm-5">
        <div class="card">
          <img src="../img/login.jpg" class="card-img-top" alt="money" />
          <div class="card-body">
            <h3 class="card-title">{{$t($t.keys.login.welcome)}}</h3>
            <p class="card-text">{{$t($t.keys.login.line1)}}</p>

            <button
                v-if="!$store.state.sync.syncing"
                class="btn btn-primary"
                v-on:click="login()"
              >
                {{$t($t.keys.login.buttonWithGoogle)}}
                <span
                  v-if="$store.state.sync.error"
                  class="material-icons"
                >sync_problem</span>
                <span v-if="$store.state.sync.synced" class="material-icons">check</span>
              </button>
              <button v-else class="btn btn-primary" disabled>
                {{$t($t.keys.login.downloading)}}
                <span class="material-icons rotate">sync</span>
              </button>
          </div>
        </div>
      </div>
    </div>
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
    store.dispatch.loginAndSync().catch(err => store.commit.showError({err, text: this.$t(this.$t.keys.errors.loginError)}));
  }
}
</script>