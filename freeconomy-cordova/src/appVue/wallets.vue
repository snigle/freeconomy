<style lang="less" scoped>
.card {
  margin-bottom: 10px;
}
</style>
<template>
  <div>
    <div class="card" v-for="currencyGroup in wallets" v-bind:key="currencyGroup.Code">
      <router-link
        v-bind:to="{name: 'transactionsByCurrency', params : {currencyCode: currencyGroup.Currency.Code}}"
        class="card-header bg-primary text-white"
      >{{currencyGroup.Currency.Code}}</router-link>
      <div class="list-group list-group-flush">
        <router-link
          v-for="wallet in currencyGroup.Wallets"
          v-bind:key="wallet.UUID"
          v-bind:to="{name: 'transactionsByWallet', params : {wallet: wallet.UUID}}"
          class="list-group-item list-group-item-action"
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