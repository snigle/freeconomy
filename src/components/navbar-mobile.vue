<style lang="scss" scoped>
.nav-bar-top {
  height: 55px;
}
.mdc-icon-button {
  width: 35px;
}

.mdc-top-app-bar.selected {
  background-color: #212121;
}
</style>
<template>
  <div>
    <div class="nav-bar-top">
      <header class="mdc-top-app-bar" v-if="!selected">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button
              class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
              aria-label="Open navigation menu"
            >menu</button>

            <div class="input-group" v-if="displaySearch">
              <input
                class="form-control"
                type="search"
                v-bind:placeholder="$t($t.keys.common.search)"
                v-bind:aria-label="$t($t.keys.common.search)"
                v-on:input="search($event.target.value)"
                v-bind:value="navSearch"
              />
              <div class="input-group-append">
                <span class="input-group-text material-icons">search</span>
              </div>
            </div>

            <div v-else class="mdc-top-app-bar__title text-decoration-none text-white">{{title}}</div>
          </section>
          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
            role="toolbar"
          >
            <button
              class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
              v-on:click="displaySearch=!displaySearch"
              aria-label="Search"
            >{{displaySearch? "close" : "search"}}</button>

            <button
              v-for="action in iconLinks"
              :key="action.label"
              class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
              v-on:click="action.click"
              aria-label="Search"
            >{{action.icon}}</button>

            <div class="dropdown">
              <button
                class="material-icons mdc-top-app-bar__action-item mdc-icon-button dropdown-toggle"
                aria-label="Options"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-if="actions && actions.length"
              >more_vert</button>
              <div class="dropdown-menu">
                <button
                  class="dropdown-item"
                  v-for="action in actions"
                  @click="action.click"
                  :key="action.label"
                >{{action.label}}</button>
              </div>
            </div>
          </section>
        </div>
      </header>
      <header class="mdc-top-app-bar mdc-top-app-bar--fixed selected" v-else>
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button
              class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
              @click="() => unselectAll()"
              aria-label="Close"
            >close</button>

            <div class="mdc-top-app-bar__title text-decoration-none text-white">{{title}}</div>
          </section>
          <section
            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
            role="toolbar"
          >
            <button
              v-for="action in selectedIcons"
              :key="action.label"
              class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
              v-on:click="action.click"
              aria-label="Search"
            >{{action.icon}}</button>
          </section>
        </div>
      </header>
    </div>
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
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCTextField } from "@material/textfield";

interface IAction {
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
    "unselectAll",
    "selected"
  ]
})
export default class NavbarMobile extends Vue {
  navSearch = "";
  title!: string;
  iconLinks!: Array<IAction>;
  actions!: Array<IAction>;
  selectedIcons!: Array<IAction>;
  unselectAll!: () => void;
  selected!: boolean;
  displaySearch = false;

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
    const textFieldElement = document.querySelector(".mdc-text-field");
    if (textFieldElement) {
      const textField = new MDCTextField(textFieldElement);
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
}
</script>