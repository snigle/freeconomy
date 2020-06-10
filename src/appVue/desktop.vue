<template>
<div>
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
              v-on:click="$store.dispatch('sync')"
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
      
  <div class="container-fluid" v-if="!loading">
    <div class="row">
      <Wallets class="col-4" :hideNav="true"/>
      <Transactions class="col-4" :hideNav="true"/>
      <Stats class="col-4" :hideNav="true"/>
    </div>
    <router-view></router-view>
  </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Wallets from "./wallets.vue";
import Transactions from "./transactions.vue";
import Navbar from "../components/navbar-desktop.vue";
import Stats from "./stats.vue"; 
import store from "./store";

@Component({
  components: {
    Wallets,
    Transactions,
    Stats,
    Navbar,
  }
})
export default class Desktop extends Vue {
    loading = false
     logout() {
    (window as any).plugins.googleplus.disconnect(
      () => {
        store.dispatch.logout();
      },
      (err: any) => store.commit.showError({ err, text: "fail to logout" })
    );
    store.dispatch.logout();
  }
}
</script>