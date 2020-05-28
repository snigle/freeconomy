<style lang="scss" scoped>
.list-group-item .col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.middle {
  text-align: center;
}
</style>
<template>
  <div class="p-1">
    <Modal
      v-if="deletionPopup"
      v-on:close="deletionPopup = false"
      v-on:backdropClick="deletionPopup = false"
    >
      <template v-slot:header>
        <div>{{$t($t.keys.common.areYourSure)}}</div>
      </template>
      {{$t($t.keys.transactionsView.deleteSelectionConfirm)}}
      <template v-slot:footer>
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            v-on:click="deletionPopup = false"
          >{{$t($t.keys.common.cancel)}}</button>
          <button
            type="button"
            class="btn btn-primary"
            v-on:click="deleteSelection()"
          >{{$t($t.keys.common.remove)}}</button>
        </div>
      </template>
    </Modal>
    <div class="row">
      <div class="col">
        <router-link type="button" class="btn btn-primary btn-sm float-left" v-bind:to="{name:'addCategory'}">
          <span class="material-icons">playlist_add</span>
          {{$t($t.keys.categoriesView.addCategory)}}
        </router-link>
      </div>
      <div
        v-if="selection.length"
        class="col middle"
      >{{selection.length}} {{$t($t.keys.common.selected, {count: selection.length})}}</div>
      <div v-if="selection.length" class="col">
        <button
          type="button"
          class="btn btn-danger btn-sm float-right"
          v-on:click="deletionPopup = true"
        >{{$t($t.keys.common.delete)}}</button>
      </div>
    </div>
    <div class="list-group">
      <router-link
        class="list-group-item list-group-item-action"
        v-for="category in $store.state.categories"
        v-bind:key="category.UUID"
        v-bind:to="{name:'editCategory', params:{category:category.UUID}}"
      >
          <div class="row">
            <button
              class="icon-md btn"
              v-bind:style="{backgroundColor: (selectedLines[category.UUID] ? 'rgb(134, 192, 255)' : category.Icon.Color)}"
              v-on:click.prevent="selectCategory(category.UUID)"
            >
              <span
                class="material-icons"
              >{{selectedLines[category.UUID] ? 'check' : $iconMap(category.Icon.Name)}}</span>
            </button>
            <div class="col name">
              <div>{{category.Name}}</div>
            </div>
          </div>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
import { ICategory } from "../lib/types";
import * as Models from "../lib/models";
import Modal from "../components/modal.vue";

@Component({
  components: { Modal }
})
export default class Categories extends Vue {
  selectedLines: { [key: string]: boolean } = {};
  deletionPopup = false;

  selectCategory(uuid: string) {
    this.selectedLines[uuid] = !this.selectedLines[uuid];
    this.selectedLines = { ...this.selectedLines };
  }
  get selection(): Array<ICategory> {
    return store.state.categories.filter(l => this.selectedLines[l.UUID]);
  }

  async deleteSelection() {
    var categories: Array<ICategory> | null = null;
    for (const category of this.selection) {
      categories = await Models.DeleteCategory(category.UUID);
    }
    if (categories) {
      store.commit.setCategories(categories);
      store.dispatch.sync();
      this.deletionPopup = false;
      this.$router.back();
    }
  }
}
</script>