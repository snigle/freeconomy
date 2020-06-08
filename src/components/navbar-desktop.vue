<style lang="scss" scoped>
.nav-bar-top {
  height: 55px;
}
</style>
<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <router-link class="navbar-brand" v-bind:to="{name:'home'}">
        <img
          src="../img/logoa.png"
          width="30"
          height="30"
          class="d-inline-block align-top rounded"
          alt
        />
        <span class="d-none d-md-inline">{{($t($t.keys.common.title))}}</span>
      </router-link>
      <ul class="navbar-nav mr-auto">
        <slot />
      </ul>

      <form class="form-inline d-none d-md-flex">
        <input
          class="form-control"
          type="search"
          v-bind:placeholder="$t($t.keys.common.search)"
          v-bind:aria-label="$t($t.keys.common.search)"
          v-on:input="search($event.target.value)"
          v-bind:value="navSearch"
        />
      </form>
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
import _ from "lodash";

@Component({
  components: { Alert }
})
export default class NavbarDesktop extends Vue {
  navSearch = "";

  created() {
    this.navSearch = _.isString(this.$route.query.search)
      ? this.$route.query.search
      : "";
  }

  search(search: string) {
    this.navSearch = search;
    _.debounce(() => {
      if (this.$route.query.search !== search) {
        this.$router.replace({
          name: this.$route.name || "",
          query: { ...this.$route.query, search }
        });
      }
    }, 500)();
  }
}
</script>