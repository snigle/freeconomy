<style lang="less" scoped>
.card {
  margin-bottom: 10px;
}
</style>
<template>
  <div>
    <div class="row actions">
      <div class="col">
        <router-link type="button" class="btn btn-primary btn-sm float-left" v-bind:to="{name:'addWallet'}">
          <span class="material-icons">playlist_add</span>
          {{$t($t.keys.walletsView.wallets)}}
        </router-link>
      </div>
      <div
        v-if="selection.length"
        class="col middle"
      >{{selection.length}} {{$t($t.keys.common.selected, {count: selection.length})}}</div>
      <div v-if="selection.length" class="col">
      </div>
    </div>

    <div class="card" v-for="currencyGroup in wallets" v-bind:key="currencyGroup.Code">
      <router-link
        v-bind:to="{name: 'transactions', query : {currencyCode: currencyGroup.Currency.Code}}"
        class="card-header bg-primary text-white"
      >{{currencyGroup.Currency.Code}}</router-link>
      <div class="list-group list-group-flush">
        <router-link
          v-for="wallet in currencyGroup.Wallets"
          v-bind:key="wallet.UUID"
          v-bind:to="{name: 'transactions', query : {wallet: wallet.UUID}}"
          class="list-group-item list-group-item-action"
          v-bind:class="{active: $router.query && (wallet.UUID === $router.query.wallet)}"
        >{{wallet.Name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWallet, ICurrency } from "../lib/types";
import store from "./store";
import _ from "lodash";

export interface IWalletsByCurrency {
  Currency: ICurrency;
  Wallets: Array<IWallet>;
}

@Component({})
export default class Wallets extends Vue {
    selectedLines: { [key: string]: boolean } = {};

  get selection(): Array<IWallet> {
    return store.state.wallets.filter(l => this.selectedLines[l.UUID]);
  }

  get wallets(): Array<IWalletsByCurrency> {
    return _(store.state.wallets)
      .groupBy(w => w.Currency.Code)
      .map((wallets: Array<IWallet>, Currency: string) => ({
        Currency: (_.first(wallets) as IWallet).Currency,
        Wallets: wallets
      }))
      .value();
  }
}
</script>