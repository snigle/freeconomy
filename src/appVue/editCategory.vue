<style lang="scss" scoped>
.icon-input {
  color: black;
}
</style>
<template>
  <div>
    <Navbar
      v-if="!hideNav"
      :title="$t($t.keys.common.edit)"
      :selected="true"
      @cancel="$router.back()"
      :selectedIcons="selectedIcons"
    />
    <div class="m-2">
      <Modal
        v-if="deletionPopup"
        v-on:close="deletionPopup = false"
        v-on:backdropClick="deletionPopup = false"
      >
        <template v-slot:header>
          <div>{{$t($t.keys.common.areYourSure)}}</div>
        </template>
        {{$t($t.keys.deleteCategoryView.areYouSure,{name:category.Name})}}
        <template
          v-slot:footer
        >
          <div>
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="deletionPopup = false"
            >{{$t($t.keys.common.cancel)}}</button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="deleteCategory()"
            >{{$t($t.keys.common.remove)}}</button>
          </div>
        </template>
      </Modal>
      <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>

      <form v-on:submit="save(false)">
        <div class="form-group">
          <label for="name">{{$t($t.keys.common.name)}}</label>
          <input class="form-control" id="name" v-model="category.Name" />
        </div>
        <div class="form-group">
          <label for="color">{{$t($t.keys.common.color)}}</label>
          <input class="form-control" id="color" type="color" v-model="category.Icon.Color" />
        </div>
        <div class="form-group">
          <label>{{$t($t.keys.common.icon)}}</label>
          <!-- <div class="container"> -->
          <div class="row">
            <div class="col-3 col-sm-2" v-for="icon in icons" v-bind:key="icon.name">
              <button
                type="button"
                v-bind:class="{'btn-outline-info': category.Icon.Name === icon.name}"
                class="btn icon-input icon-lg material-icons"
                v-on:click="category.Icon.Name = icon.name"
              >{{icon.name}}</button>
            </div>
          </div>
          <!-- </div> -->
        </div>
        <div class="form-group">
          <label>{{$t($t.keys.common.result)}}</label>
          <div class="icon-lg" v-bind:style="{backgroundColor: category.Icon.Color }">
            <div class="material-icons">{{$iconMap(category.Icon.Name)}}</div>
          </div>
        </div>

        <div class="form-group">
          <div class="float-left">
            <button
              type="button"
              v-if="$route.params.category"
              class="btn btn-danger"
              v-on:click="deletionPopup = true"
            >{{$t($t.keys.common.delete)}}</button>
            <button
              type="button"
              v-else
              class="btn btn-danger"
              v-on:click="$router.back()"
            >{{$t($t.keys.common.cancel)}}</button>
          </div>
          <div class="float-right">
            <button
              type="button"
              class="btn btn-secondary"
              v-on:click="save(true)"
            >{{$t($t.keys.common.saveAndNew)}}</button>
            <button type="submit" class="btn btn-primary">{{$t($t.keys.common.save)}}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
import { IconType, ICategoryInput, ICategory } from "../lib/types";
import * as Models from "../lib/models";
import Modal from "../components/modal.vue";
import Navbar, { IAction } from "../components/navbar-mobile.vue";

@Component({
  components: {
    Modal,
    Navbar
  },
  props: ["hideNav"]
})
export default class EditCategory extends Vue {
  icons: Array<{ name: string; type: IconType }> = [
    { name: "security", type: "material" },
    { name: "healing", type: "material" },
    { name: "phone_android", type: "material" },
    { name: "account_balance", type: "material" },
    { name: "local_bar", type: "material" },
    { name: "card_giftcard", type: "material" },
    { name: "local_movies", type: "material" },
    { name: "favorite", type: "material" },
    { name: "local_gas_station", type: "material" },
    { name: "school", type: "material" },
    { name: "shopping_cart", type: "material" },
    { name: "shopping_basket", type: "material" },
    { name: "local_cafe", type: "material" },
    { name: "local_hotel", type: "material" },
    { name: "language", type: "material" },
    { name: "gavel", type: "material" },
    { name: "backup", type: "material" },
    { name: "stars", type: "material" },
    { name: "local_laundry_service", type: "material" },
    { name: "wb_sunny", type: "material" },
    { name: "home", type: "material" },
    { name: "today", type: "material" },
    { name: "style", type: "material" },
    { name: "local_parking", type: "material" },
    { name: "euro_symbol", type: "material" },
    { name: "attach_money", type: "material" },
    { name: "room_service", type: "material" },
    { name: "restaurant", type: "material" },
    { name: "spa", type: "material" },
    { name: "phone", type: "material" },
    { name: "sync", type: "material" },
    { name: "directions_bus", type: "material" },
    { name: "beach_access", type: "material" },
    { name: "directions_car", type: "material" },
    { name: "flight_takeoff", type: "material" }
  ];
  category: ICategoryInput = {
    Name: "",
    Icon: {
      Name: this.icons[0].name,
      Type: this.icons[0].type,
      Color: "#517FA4"
    }
  };

  error = "";
  deletionPopup = false;

  // Nav props
  selectedIcons: Array<IAction> = [];
  hideNav!: boolean;

  created() {
    if (this.$route.params.category) {
      const category = store.state.categories.find(
        c => c.UUID === this.$route.params.category
      );
      if (!category) {
        this.error = this.$t(this.$t.keys.errors.notFound);
        return;
      }
      this.category = { ...category };
    }

    const selectedIcons = [];
    if (this.$route.params.category) {
      selectedIcons.push({
        label: this.$t(this.$t.keys.common.delete),
        icon: "delete",
        click: () => (this.deletionPopup = true)
      });
    }
    selectedIcons.push({
        label: this.$t(this.$t.keys.common.save),
        icon: "check",
        click: () => this.save(false)
      });
    this.selectedIcons = selectedIcons;
  }

  async deleteCategory() {
    const categories = await Models.DeleteCategory(this.$route.params.category);
    store.commit.setCategories(categories);
    this.deletionPopup = false;
    this.$router.back();
  }

  async save(andNew: boolean) {
    let categories: Array<ICategory>;
    if (this.$route.params.category) {
      categories = await Models.UpdateCategory(
        this.$route.params.category,
        this.category
      );
    } else {
      categories = await Models.CreateCategory(this.category);
    }
    store.commit.setCategories(categories);
    store.dispatch.sync();
    if (andNew) {
      this.$router.replace({
        name: "addCategory"
      });
    } else {
      setTimeout(() => this.$router.back(), 0);
    }
  }
}
</script>