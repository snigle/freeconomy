<style lang="scss" scoped>
.nav-bar-top {
  height: 55px;
}

.mdc-icon-button {
  width: 35px;
  padding: inherit;
}

.mdc-top-app-bar.selected {
  background-color: #212121;
}

.selection {
  text-align: center;
  line-height: 30px;
}
</style>
<template>
  <div>
    <div v-if="$store.state.mobileView">
      <aside class="mdc-drawer mdc-drawer--modal">
        <div class="mdc-drawer__header" v-if="$store.state.login.data && $store.state.login.data.displayName">
          <h3 class="mdc-drawer__title" v-if="$store.state.login.data.displayName">{{ $store.state.login.data.displayName }}
          </h3>
          <h6 class="mdc-drawer__subtitle" v-if="$store.state.login.data.email">{{ $store.state.login.data.email }}</h6>
        </div>
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <div role="separator" class="mdc-list-divider"></div>

            <router-link v-bind:to="{ name: 'home' }" v-slot="{ href, navigate, isExactActive }">
              <a class="mdc-list-item" :class="isExactActive && 'active'" :tabindex="isExactActive ? 0 : -1" :href="href"
                @navigate="navigate">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">account_balance_wallet</i>
                <span class="mdc-list-item__text">{{ $t($t.keys.walletsView.wallets) }}</span>
              </a>
            </router-link>

            <router-link class="mdc-list-item" v-bind:to="{ name: 'transactions', query: { ...$route.query } }"
              v-slot="{ href, navigate, isExactActive }">
              <a class="mdc-list-item" :class="isExactActive && 'active'" :tabindex="isExactActive ? 0 : -1" :href="href"
                @navigate="navigate">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">view_list</i>
                <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.transactions) }}</span>
              </a>
            </router-link>

            <router-link class="mdc-list-item" v-bind:to="{ name: 'stats', query: { ...$route.query } }"
              v-slot="{ href, navigate, isExactActive }">
              <a class="mdc-list-item" :class="isExactActive && 'active'" :tabindex="isExactActive ? 0 : -1" :href="href"
                @navigate="navigate">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">pie_chart</i>
                <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.graph) }}</span>
              </a>
            </router-link>

            <div role="separator" class="mdc-list-divider"></div>
            <router-link class="mdc-list-item" v-bind:to="{ name: 'categories' }" v-slot="{ href, navigate, isExactActive }">
              <a class="mdc-list-item" :class="isExactActive && 'active'" :tabindex="isExactActive ? 0 : -1" :href="href"
                @navigate="navigate">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">widgets</i>
                <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.categories) }}</span>
              </a>
            </router-link>
            <a class="mdc-list-item" v-if="!$store.state.sync.syncing" v-on:click="$store.dispatch('sync')" tabindex="0">
              <span v-if="$store.state.sync.error" class="material-icons mdc-list-item__graphic">sync_problem</span>
              <span v-else-if="$store.state.sync.synced" class="material-icons mdc-list-item__graphic">check</span>
              <span v-else class="material-icons mdc-list-item__graphic">sync</span>
              <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.sync) }}</span>
            </a>
            <div v-else class="mdc-list-item mdc-list-item--activated">
              <span class="material-icons mdc-list-item__graphic rotate">sync</span>
              <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.syncing) }}</span>
            </div>

            <div role="separator" class="mdc-list-divider"></div>

            <a class="mdc-list-item" v-on:click="toggleDiscretMode()">
              <span class="material-icons mdc-list-item__graphic">{{ $store.state.settings.discretMode ? 'visibility_off' :
                'visibility' }}</span>
              <span
                class="mdc-list-item__text">{{ $t($store.state.settings.discretMode ? $t.keys.sideBar.desactivateDiscretMode :
                  $t.keys.sideBar.activateDiscretMode) }}</span>
            </a>

            <div role="separator" class="mdc-list-divider"></div>

            <a class="mdc-list-item" v-on:click="$store.dispatch('exportData')">
              <span class="material-icons mdc-list-item__graphic">cloud_download</span>
              <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.export) }}</span>
            </a>
            <a class="mdc-list-item" v-on:click="$store.dispatch('importData')">
              <span class="material-icons mdc-list-item__graphic">backup</span>
              <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.import) }}</span>
            </a>

            <div role="separator" class="mdc-list-divider"></div>

            <a class="mdc-list-item" v-on:click="logout()">
              <span class="material-icons mdc-list-item__graphic">exit_to_app</span>
              <span class="mdc-list-item__text">{{ $t($t.keys.sideBar.logout) }}</span>
            </a>
          </nav>
        </div>
      </aside>
      <div class="mdc-drawer-scrim"></div>

      <div class="nav-bar-top">
        <header class="mdc-top-app-bar" v-if="!selected">
          <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button @click="toggleDrawer()" class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                aria-label="Open navigation menu">menu</button>

              <div class="input-group" v-if="displaySearch">
                <input class="form-control" type="search" v-bind:placeholder="$t($t.keys.common.search)"
                  v-bind:aria-label="$t($t.keys.common.search)" v-on:input="search($event.target.value)"
                  v-bind:value="navSearch" />
                <div class="input-group-append">
                  <span class="input-group-text material-icons">search</span>
                </div>
              </div>

              <div v-else class="mdc-top-app-bar__title text-decoration-none text-white">{{ title }}</div>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button rotate" aria-label="Syncing"
                v-if="$store.state.sync.syncing">sync</button>
              <button v-if="$store.state.sync.error" class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="Sync error">sync_problem</button>
              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Synced"
                v-if="$store.state.sync.synced">check</button>

              <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                v-on:click="displaySearch = !displaySearch" aria-label="Search" v-if="searchButton">{{ displaySearch ? "close"
                  : "search" }}</button>

              <button v-for="action in iconLinks" :key="action.label"
                class="material-icons mdc-top-app-bar__action-item mdc-icon-button" v-on:click="action.click"
                :aria-label="action.label">{{ action.icon }}</button>

              <div class="dropdown">
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button dropdown-toggle"
                  aria-label="Options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  v-if="actions && actions.length">more_vert</button>
                <div class="dropdown-menu">
                  <button class="dropdown-item" v-for="action in actions" @click="action.click"
                    :key="action.label">{{ action.label }}</button>
                </div>
              </div>
            </section>
          </div>
        </header>
        <header class="mdc-top-app-bar mdc-top-app-bar--fixed selected" v-else>
          <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" @click="$emit('cancel')"
                aria-label="Close">close</button>

              <div class="mdc-top-app-bar__title text-decoration-none text-white">{{ title }}</div>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
              <button v-for="action in selectedIcons" :key="action.label"
                class="material-icons mdc-top-app-bar__action-item mdc-icon-button" v-on:click="action.click"
                aria-label="Search">{{ action.icon }}</button>
            </section>
          </div>
        </header>
      </div>
    </div>
    <div v-else>
      <div class="row actions">
        <div v-if="selected" class="col selection">
          {{ title }}
          <button v-for="action in selectedIcons" :key="action.label" type="button"
            class="btn btn-danger btn-sm float-right" v-on:click="action.click">{{ action.label }}</button>
        </div>
      </div>
    </div>
    <div v-if="$store.state.mobileView">
      <Alert v-for="err in $store.state.errors" v-bind:key="err.uuid" v-on:close="$store.commit('hideError', err.uuid)">
        {{ err.text }}: {{ err.err.message }}</Alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import t from "../lib/translator";
import Alert from "./alert.vue";
import _ from "lodash";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCTextField } from "@material/textfield";
import { MDCDrawer } from "@material/drawer";
import store from "../appVue/store";
import * as Models from "../lib/models";
import moment from "moment";
import { FileSync, IFileData } from "../lib/sync";

export interface IAction {
  label: string;
  icon: string;
  click: () => void;
}

@Component({
  components: { Alert },
  props: [
    "title",
    "iconLinks",
    "actions",
    "selectedIcons",
    "selected",
    "searchButton"
  ]
})
export default class NavbarMobile extends Vue {
  navSearch = "";
  title!: string;
  iconLinks!: Array<IAction>;
  actions!: Array<IAction>;
  selectedIcons!: Array<IAction>;
  selected!: boolean;
  displaySearch = false;
  drawer?: MDCDrawer;
  searchButton!: boolean;

  created() {
    this.navSearch = _.isString(this.$route.query.search)
      ? this.$route.query.search
      : "";
  }

  mounted() {
    const topAppBarElement = document.querySelector(".mdc-top-app-bar");
    if (topAppBarElement) {
      console.log("top app bar init");
      const topAppBar = new MDCTopAppBar(topAppBarElement);
    }
    const drawerElement = document.querySelector(".mdc-drawer");
    if (drawerElement) {
      this.drawer = MDCDrawer.attachTo(drawerElement);
    }
  }

  toggleDiscretMode() {
    store.commit.toggleDiscretMode();
    if (this.drawer) {
      this.drawer.open = false;
    }
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

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.open = !this.drawer.open;
    }
  }

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