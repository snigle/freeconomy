<style lang="less" scoped>
.card {
  margin-bottom: 10px;
  a.card-header {
    text-decoration: none;
    color: inherit;
  }
}
</style>
<template>
  <div>
    <div class="row actions">
      <div class="col">
        <router-link
          type="button"
          class="btn btn-primary btn-sm float-left"
          v-bind:to="{name:'addWallet'}"
        >
          <span class="material-icons">playlist_add</span>
          {{$t($t.keys.walletsView.wallets)}}
        </router-link>
      </div>
      <div
        v-if="selection.length"
        class="col middle"
      >{{selection.length}} {{$t($t.keys.common.selected, {count: selection.length})}}</div>
      <div v-if="selection.length" class="col"></div>
    </div>

    <div class="card" v-for="currencyGroup in wallets" v-bind:key="currencyGroup.Code">
      <router-link
        v-bind:to="{name: 'transactions', query : {currencyCode: currencyGroup.Currency.Code}}"
        class="card-header bg-light"
      >{{currencyGroup.Currency.Code}}</router-link>
      <div class="list-group list-group-flush">
        <div
          v-for="wallet in currencyGroup.Wallets"
          v-bind:key="wallet.UUID"
          v-on:contextmenu="toogleDropdown($event,wallet.UUID)"
        >
          <router-link
            v-bind:to="{name: 'transactions', query : {wallet: wallet.UUID}}"
            class="list-group-item list-group-item-action"
            v-bind:class="{active: $router.query && (wallet.UUID === $router.query.wallet)}"
          >
            {{wallet.Name}}
            <span
              class="badge badge-pill badge-info"
              v-if="wallet.OperationsToCome"
            >{{wallet.OperationsToCome}}</span>
          </router-link>
        </div>
        <div v-for="wallet in currencyGroup.Wallets" v-bind:key="wallet.UUID+'2'">
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuLink"
            v-on-clickaway="toogleDropdown"
            v-if="dropdown[wallet.UUID]"
            v-bind:class="{show:dropdown[wallet.UUID]}"
            v-bind:style="{position:'fixed', display:'block', ...dropdown[wallet.UUID]}"
          >
            <router-link
              v-bind:to="{name: 'editWallet', params : {wallet: wallet.UUID}}"
              class="dropdown-item"
            >{{$t($t.keys.common.edit)}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWallet, ICurrency } from "../lib/types";
import store, { IWalletWithTotalToCome } from "./store";
import { mixin as clickaway } from "vue-clickaway";
import _ from "lodash";

export interface IWalletsByCurrency {
  Currency: ICurrency;
  Wallets: Array<IWalletWithTotalToCome>;
}

@Component({
  mixins: [clickaway]
})
export default class Wallets extends Vue {
  selectedLines: { [key: string]: boolean } = {};
  dropdown: { [key: string]: { top: string; left: string } } = {};

  toogleDropdown(e: MouseEvent, uuid: string) {
    console.log("click", uuid, e);
    const dropdown: { [key: string]: { top: string; left: string } } = {};
    if (uuid) {
      dropdown[uuid] = {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`
      };
    }
    this.dropdown = dropdown;
    e.preventDefault();
  }

  get selection(): Array<IWallet> {
    return store.state.wallets.filter(l => this.selectedLines[l.UUID]);
  }

  get wallets(): Array<IWalletsByCurrency> {
    return _(store.getters.walletsWithPriceToCome)
      .groupBy(w => w.Currency.Code)
      .map((wallets: Array<IWalletWithTotalToCome>, Currency: string) => ({
        Currency: (_.first(wallets) as IWallet).Currency,
        Wallets: wallets
      }))
      .value();
  }
}
</script>