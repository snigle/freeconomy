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
            placeholder="Search"
            aria-label="Search"
            v-on:input="search($event.target.value)"
            v-bind:value="navSearch"
          />
        </form>
    </nav>
  </div>
  <!-- <div>
    <nav class="navbar navbar-light bg-light">
      <router-link class="nav-link" v-bind:to="{name:'home'}" v-bind:class="'nav-brand'">
        <img
          src="../img/logoa.png"
          width="30"
          height="30"
          class="d-inline-block align-top rounded"
          alt
        />
        <span class="d-none d-md-inline">{{($t($t.keys.common.title))}}</span>
      </router-link>

      <slot></slot>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-on:input="search($event.target.value)"
            v-bind:value="navSearch"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <Alert
      v-for="err in $store.state.errors"
      v-bind:key="err.uuid"
      v-on:close="$store.commit('hideError', err.uuid)"
    >{{err.text}}: {{JSON.stringify(err.err)}}</Alert>
  </div> -->
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
export default class Login extends Vue {
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