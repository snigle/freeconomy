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
        {{$t($t.keys.deleteWalletView.areYouSure,{name:wallet.Name})}}
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
              v-on:click="deleteWallet()"
            >{{$t($t.keys.common.remove)}}</button>
          </div>
        </template>
      </Modal>
      <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>

      <form v-on:submit="save(false)">
        <div class="form-group">
          <label for="name">{{$t($t.keys.common.name)}}</label>
          <input
            name="name"
            id="name"
            class="form-control"
            v-model="wallet.Name"
            v-bind:placeholder="$t($t.keys.common.eg) + $t($t.keys.defaultWallets.bank)"
          />
        </div>
        <div class="form-group">
          <label for="description">{{$t($t.keys.common.description)}}</label>
          <input
            name="description"
            id="description"
            class="form-control"
            v-model="wallet.Description"
            v-bind:placeholder="$t($t.keys.common.eg) + $t($t.keys.defaultWallets.bankDescription)"
          />
        </div>

        <div class="form-row">
          <div class="form-group col-sm-6">
            <label for="solde">{{$t($t.keys.addWalletView.solde)}}</label>
            <input
              type="number"
              name="solde"
              id="solde"
              class="form-control"
              v-model.number="wallet.Solde"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-sm-3">
            <label for="currencyCode">{{$t($t.keys.addWalletView.currencyCode)}}</label>
            <input
              name="currencyCode"
              id="currencyCode"
              class="form-control"
              v-model="wallet.Currency.Code"
              v-bind:placeholder="$t($t.keys.common.eg) + 'EUR'"
            />
          </div>
          <div class="form-group col-sm-3">
            <label for="currencySymbol">{{$t($t.keys.addWalletView.symbol)}}</label>
            <input
              name="currencySymbol"
              id="currencySymbol"
              class="form-control"
              v-model="wallet.Currency.Symbol"
              v-bind:placeholder="$t($t.keys.common.eg) + '€'"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="color">{{$t($t.keys.common.color)}}</label>
          <input class="form-control" id="color" type="color" v-model="wallet.Icon.Color" />
        </div>

        <div class="form-group">
          <label>{{$t($t.keys.common.icon)}}</label>
          <div class="container">
            <div class="row row-cols-8">
              <div class="col" v-for="icon in icons" v-bind:key="icon.name">
                <button
                  type="button"
                  v-bind:class="{'btn-outline-info': wallet.Icon.Name === icon.name}"
                  class="btn icon-input icon-lg material-icons"
                  v-on:click="wallet.Icon.Name = icon.name"
                >{{icon.name}}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>{{$t($t.keys.common.result)}}</label>
          <div class="icon-lg" v-bind:style="{backgroundColor: wallet.Icon.Color }">
            <div class="material-icons">{{$iconMap(wallet.Icon.Name)}}</div>
          </div>
        </div>

        <div class="form-group">
          <div class="float-left">
            <button
              type="button"
              v-if="$route.params.wallet"
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
import Modal from "../components/modal.vue";
import Navbar, { IAction } from "../components/navbar-mobile.vue";
import { IconType, IWalletInput, IWallet } from "../lib/types";
import * as Models from "../lib/models";

@Component({
  components: { Modal, Navbar },
  props: ["hideNav"]
})
export default class EditWallet extends Vue {
  readonly icons: Array<{ name: string; type: IconType }> = [
    { name: "account_balance_wallet", type: "material" },
    { name: "attach_money", type: "material" },
    { name: "card_giftcard", type: "material" },
    { name: "card_travel", type: "material" },
    { name: "payment", type: "material" },
    { name: "toll", type: "material" },
    { name: "account_balance", type: "material" }
  ];
  wallet: IWalletInput = {
    Name: "",
    Description: "",
    Currency: { Code: "", Symbol: "" },
    Solde: 0,
    Archived: false,
    Icon: {
      Name: this.icons[0].name,
      Type: this.icons[0].type,
      Color: "#517FA4"
    }
  };

  // Nav props
  selectedIcons: Array<IAction> = [];
  hideNav!: boolean;
  
  error = "";
  deletionPopup = false;

  created() {
    if (this.$route.params.wallet) {
      const wallet = store.state.wallets.find(
        c => c.UUID === this.$route.params.wallet
      );
      if (!wallet) {
        this.error = this.$t(this.$t.keys.errors.notFound);
        return;
      }
      this.wallet = { ...wallet };
    }
    this.selectedIcons = [
      {
        label: this.$t(this.$t.keys.common.delete),
        icon: "delete",
        click: () => (this.deletionPopup = true)
      },
      {
        label: this.$t(this.$t.keys.common.save),
        icon: "check",
        click: () => this.save(false)
      }
    ];
  }

  async deleteCategory() {
    const wallets = await Models.DeleteWallet(this.$route.params.wallet);
    store.commit.setWallets(wallets);
    this.deletionPopup = false;
    this.$router.back();
  }

  async save(andNew: boolean) {
    let wallets: Array<IWallet>;
    if (this.$route.params.wallet) {
      wallets = await Models.UpdateWallet(
        this.$route.params.wallet,
        this.wallet
      );
    } else {
      wallets = await Models.CreateWallet(this.wallet);
    }
    store.commit.setWallets(wallets);
    store.dispatch.sync();
    if (andNew) {
      this.$router.replace({
        name: "addWallet"
      });
    } else {
      setTimeout(() => this.$router.back(), 0);
    }
  }
}
</script>