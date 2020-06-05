<style lang="less" scoped>
.icon-lg {
  border-radius: 30%;
}
.price {
  text-align:right;
}
.list-group {
  margin-bottom:20px;
}
.align-right{
  text-align:right;
  float:right;
}
.title {
  font-weight: 600;
}
</style>
<template>
  <div class="p-1">
    <div class="row actions">
      <div class="col">
        <router-link
          type="button"
          class="btn btn-primary btn-sm float-left"
          v-bind:to="{name:'addWallet', query:{...$route.query}}"
        >
          <span class="material-icons">playlist_add</span>
          {{$t($t.keys.walletsView.wallets)}}
        </router-link>
      </div>
    </div>

    <div class="list-group" v-for="currencyGroup in wallets" v-bind:key="currencyGroup.Code">
      <router-link
        v-bind:to="{name: 'transactions', query:{...$route.query, wallet:undefined, currencyCode: currencyGroup.Currency.Code}}"
        class="list-group-item list-group-item-action"
        v-bind:class="{'text-center': !currencyGroup.Selection.length}"
      >
      <span class="title">{{$t($t.keys.walletsView.wallets)}} ({{currencyGroup.Currency.Code}}) : {{currencyGroup.Total}} {{currencyGroup.Currency.Symbol}}</span>
      <span class="align-right" v-if="currencyGroup.Selection.length">{{currencyGroup.Selection.length}} {{$t($t.keys.common.selected, {count: currencyGroup.Selection.length})}} : {{currencyGroup.TotalSelected}} {{currencyGroup.Currency.Symbol}}</span></router-link>
      <div
        v-for="wallet in currencyGroup.Wallets"
        v-bind:key="wallet.UUID"
        v-on:contextmenu="toogleDropdown($event,wallet.UUID)"
        class="list-group-item list-group-item-action"
        v-bind:class="$route.query && (wallet.UUID === $route.query.wallet) ? ['active','text-white'] : []"
      >
        <router-link
          class="list-group-item-action"
          v-bind:class="$route.query && (wallet.UUID === $route.query.wallet) ? ['active','text-white'] : []"
          v-bind:to="{name: 'transactions', query : {...$route.query, wallet: wallet.UUID}}"
        >
            <div class="row">
              <button
                type="button"
                v-on:click.prevent="selectLine(wallet.UUID)"
                class="icon-lg btn"
                v-bind:style="{backgroundColor: (selectedLines[wallet.UUID] ? 'rgb(134, 192, 255)' : wallet.Icon.Color) }"
              >
                <div
                  v-if="wallet.Icon.Type === 'material'"
                  class="material-icons"
                >{{selectedLines[wallet.UUID] ? 'check' : $iconMap(wallet.Icon.Name)}}</div>
              </button>
              <div class="middle col">
                <div>
                  {{wallet.Name}}
                  <span
                    class="badge badge-pill badge-info"
                    v-if="wallet.OperationsToCome"
                  >{{wallet.OperationsToCome}}</span>
                </div>
                <div>
                  <small>{{wallet.Description}}</small>
                </div>
              </div>
              <div class="price">
                <div class="price">{{wallet.Total}} {{wallet.Currency.Symbol}}</div>
                <div class="toCome" v-if="wallet.TotalToCome">
                  <small>{{$t($t.keys.walletsView.toCome)}} {{wallet.TotalToCome}} {{wallet.Currency.Symbol}}</small>
                </div>
              </div>
            </div>
        </router-link>
        <div
          class="dropdown-menu"
          aria-labelledby="dropdownMenuLink"
          v-on-clickaway="toogleDropdown"
          v-if="dropdown[wallet.UUID]"
          v-bind:class="{show:dropdown[wallet.UUID]}"
          v-bind:style="{position:'fixed', display:'block', ...dropdown[wallet.UUID]}"
        >
          <router-link
            v-bind:to="{name: 'editWallet', params : {...$route.query, wallet: wallet.UUID}}"
            class="dropdown-item"
          >{{$t($t.keys.common.edit)}}</router-link>
          <router-link
            v-bind:to="{name: 'editTotalWallet', params : {...$route.query, wallet: wallet.UUID}}"
            class="dropdown-item"
          >{{$t($t.keys.transactionsView.updateSolde)}}</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWallet, ICurrency, displayPrice } from "../lib/types";
import store, { IWalletWithTotalToCome } from "./store";
import { mixin as clickaway } from "vue-clickaway";
import _ from "lodash";

export interface IWalletsByCurrency {
  Currency: ICurrency;
  Wallets: Array<IWalletWithTotalToCome>;
  Total: number;
  Selection: Array<IWalletWithTotalToCome>;
  TotalSelected: number; 
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

  selectLine(uuid: string) {
    this.selectedLines[uuid] = !this.selectedLines[uuid];
    this.selectedLines = { ...this.selectedLines };
  }

  get selection(): Array<IWalletWithTotalToCome> {
    return store.getters.walletsWithPriceToCome.filter(l => this.selectedLines[l.UUID]);
  }

  get wallets(): Array<IWalletsByCurrency> {
    return _(store.getters.walletsWithPriceToCome)
      .groupBy(w => w.Currency.Code)
      .map((wallets: Array<IWalletWithTotalToCome>, Currency: string) => {
        const selection = this.selection.filter(s => wallets.find(w => w.UUID === s.UUID));
        return {
        Currency: (_.first(wallets) as IWallet).Currency,
        Wallets: wallets.map(w => ({...w, Total: displayPrice(w.Total), TotalToCome: displayPrice(w.TotalToCome)})),
        Total: displayPrice(_.sumBy(wallets, w => w.Total)),
        Selection: selection,
        TotalSelected: displayPrice(_.sumBy(selection, s => s.Total)),
      }})
      .value();
  }
}
</script>