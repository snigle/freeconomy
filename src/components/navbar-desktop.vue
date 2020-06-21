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

      <ul class="navbar-nav mr-auto filters" v-if="filters.length && $store.state.login.logged">
        <li class="nav-item">
            {{$t($t.keys.filters.filters)}}: 
            <button class="btn btn-info badge badge-info align-middle mr-1"
            v-for="f in filters"
            :key="f"
            @click="dropFilter(f)"
            >{{$t($t.keys.filters[f])}}: {{f === 'category' && category? category.Name : $route.query[f]}} <span class="material-icons align-middle">close</span>
            </button>
          </li>
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

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import t from "../lib/translator";
import _ from "lodash";
import { ICategory } from "../lib/types";
import store from "../appVue/store";

@Component({
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

  get category(): ICategory | undefined {
    if (_.isString(this.$route.query.category)) {
      return store.state.categories.find(c => c.UUID === this.$route.query.category);
    }
    return undefined;
  }

  get filters() : string[] {
    const allowedFilters = ["category", "description", "transactionFrom", "transactionTo"];
    return allowedFilters.filter(f => _.isString(this.$route.query[f]))
  }

  dropFilter(filter :string) {
    const query = {...this.$route.query, }
    delete(query[filter]);
    this.$router.push({name: this.$route.name || "", query});
  }
}
</script>