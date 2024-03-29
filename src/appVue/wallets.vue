<style lang="less" scoped>
.icon-lg {
  border-radius: 30%;
}
.price {
  text-align: right;
}
.list-group {
  margin-bottom: 20px;
}
.align-right {
  text-align: right;
  float: right;
}
.title {
  font-weight: 600;
}
</style>
<template>
  <div>
    <Navbar :title="$t($t.keys.common.title)" :actions="menu" />
    <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>
    <div class="p-1">
      <div class="list-group" v-for="currencyGroup in wallets" v-bind:key="currencyGroup.Currency.Code">
        <router-link
          v-bind:to="{name: 'transactions', query:{...$route.query, wallet:undefined, currencyCode: currencyGroup.Currency.Code}}"
          class="list-group-item list-group-item-action"
          v-bind:class="{'text-center': !currencyGroup.Selection.length}"
        >
          <span
            class="title"
          >{{$t($t.keys.walletsView.wallets)}} ({{currencyGroup.Currency.Code}}) : <Discret>{{currencyGroup.Total}}</Discret> {{currencyGroup.Currency.Symbol}}</span>
          <span
            class="align-right"
            v-if="currencyGroup.Selection.length"
          >{{currencyGroup.Selection.length}} {{$t($t.keys.common.selected.toString(), {count: currencyGroup.Selection.length})}} : {{currencyGroup.TotalSelected}} {{currencyGroup.Currency.Symbol}}</span>
        </router-link>
        <div
          v-for="(wallet,walletIndex) in currencyGroup.Wallets"
          v-bind:key="wallet.UUID"
          v-on:contextmenu="toogleDropdown($event,wallet.UUID)"
          class="list-group-item list-group-item-action"
          v-bind:class="{
            active : $route.query && (wallet.UUID === $route.query.wallet),
            'text-white' : $route.query && (wallet.UUID === $route.query.wallet),
            'list-group-item-secondary': wallet.Archived,
          }"
        >
          <router-link
            class="list-group-item-action"
            :class="{'text-white' : $route.query && (wallet.UUID === $route.query.wallet)}"
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
                <div class="price"><Discret>{{wallet.Total}}</Discret> {{wallet.Currency.Symbol}}</div>
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
            @click="toogleDropdown"
            v-if="dropdown[wallet.UUID]"
            v-bind:class="{show:dropdown[wallet.UUID]}"
            v-bind:style="{position:'fixed', display:'block', ...dropdown[wallet.UUID]}"
          >
            <button
              v-if="walletIndex !== 0"
              type="button"
              class="dropdown-item"
              @click="() => changeWalletOrder(currencyGroup, wallet, -1)"
            >{{$t($t.keys.walletListItem.moveUp)}}</button>
            <router-link
              v-bind:to="{name: 'editWallet', params : {...$route.query, wallet: wallet.UUID}}"
              class="dropdown-item"
            >{{$t($t.keys.common.edit)}}</router-link>
            <router-link
              v-bind:to="{name: 'editTotalWallet', params : {...$route.query, wallet: wallet.UUID}}"
              class="dropdown-item"
            >{{$t($t.keys.transactionsView.updateSolde)}}</router-link>
            <button
              type="button"
              class="dropdown-item"
              @click="() => toggleArchive(wallet)"
            >{{$t(!wallet.Archived ? $t.keys.walletListItem.archive: $t.keys.walletListItem.restore)}}</button>
            <button
              v-if="walletIndex !== currencyGroup.Wallets.length -1"
              type="button"
              class="dropdown-item"
              @click="() => changeWalletOrder(currencyGroup, wallet, 1)"
            >{{$t($t.keys.walletListItem.moveDown)}}</button>
          </div>
        </div>
      </div>

      <Fab :actions="actions" />

      <router-view v-if="!desktop"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IWallet, ICurrency, displayPrice } from "../lib/types";
import store, { IWalletWithTotalToCome } from "./store";
import { mixin as clickaway } from "vue-clickaway";
import Fab from "../components/fab.vue";
import Navbar, { IAction } from "../components/navbar-mobile.vue";
import Discret from "../components/discret.vue";
import Alert from "../components/alert.vue";
import _ from "lodash";
import * as Models from "../lib/models";

export interface IWalletsByCurrency {
  Currency: ICurrency;
  Wallets: Array<IWalletWithTotalToCome>;
  Total: number;
  Selection: Array<IWalletWithTotalToCome>;
  TotalSelected: number;
}

@Component({
  mixins: [clickaway],
  components: { Fab, Navbar, Discret, Alert },
  props: ["desktop"]
})
export default class Wallets extends Vue {
  selectedLines: { [key: string]: boolean } = {};
  dropdown: { [key: string]: { top: string; left: string } } = {};
  desktop!: boolean;
  error: string | null = null;

  get actions() {
    const actions = [
      {
        icon: "playlist_add",
        label: this.$t(this.$t.keys.walletsView.add),
        click: () => this.addWallet()
      }
    ]
    if (_.find(store.state.wallets, w => w.Archived))
    {
      actions.push(
      {
        icon: this.$route.query.archive ? "archive" : "restore",
        label: this.$t(
          this.$route.query.archive
            ? this.$t.keys.walletsView.hideArchive
            : this.$t.keys.walletsView.viewArchive
        ),
        click: () =>
          this.$router.push({
            name: "home",
            query: {
              ...this.$route.query,
              archive: this.$route.query.archive ? undefined : "true"
            }
          })
      })
    }
    return actions
  }

  addWallet() {
    this.$router.push({ name: "addWallet", query: { ...this.$route.query } });
  }

  async changeWalletOrder(currencyGroup : IWalletsByCurrency, wallet: IWallet, order : 1|-1) {
    let walletIndex = 0
    currencyGroup.Wallets.forEach((w,i) => {
      if (w.UUID === wallet.UUID) {
        walletIndex = i
      }
    })
    const switchIndex = walletIndex + order;
    if (switchIndex < 0 || switchIndex >= currencyGroup.Wallets.length) {
      this.error = "can't move wallet to this position"
      return
    }
    const switchWallet = currencyGroup.Wallets[switchIndex];

    let updatedWallets = await Models.SwitchWalletOrder(wallet.UUID, switchWallet.UUID);

    store.commit.setWallets(updatedWallets);
    store.dispatch.sync();
  }

  get menu(): Array<IAction> {
    if (this.$route.query.archive) {
      return [
        {
          label: this.$t(this.$t.keys.walletsView.hideArchive),
          icon: "unarchive",
          click: () =>
            this.$router.push({
              name: "home",
              query: { ...this.$route.query, archive: undefined }
            })
        }
      ];
    }
    return [
      {
        label: this.$t(this.$t.keys.walletsView.viewArchive),
        icon: "archive",
        click: () =>
          this.$router.push({
            name: "home",
            query: { ...this.$route.query, archive: "true" }
          })
      }
    ];
  }

  toogleDropdown(e: MouseEvent, uuid?: string) {
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

  toggleArchive(wallet: IWallet) {
    Models.ArchiveWallet(wallet.UUID)
      .then(wallets => store.commit.setWallets(wallets))
      .then(() => store.dispatch.sync());
  }

  selectLine(uuid: string) {
    this.selectedLines[uuid] = !this.selectedLines[uuid];
    this.selectedLines = { ...this.selectedLines };
  }

  get selection(): Array<IWalletWithTotalToCome> {
    return store.getters.walletsWithPriceToCome.filter(
      l => this.selectedLines[l.UUID]
    );
  }

  get wallets(): Array<IWalletsByCurrency> {
    return _(store.getters.walletsWithPriceToCome)
      .filter(w => (this.$route.query.archive ? true : !w.Archived))
      .groupBy(w => w.Currency.Code)
      .map((wallets: Array<IWalletWithTotalToCome>, Currency: string) => {
        const selection = this.selection.filter(s =>
          wallets.find(w => w.UUID === s.UUID)
        );
        return {
          Currency: (_.first(wallets) as IWallet).Currency,
          Wallets: _(wallets).map(w => ({
            ...w,
            Total: displayPrice(w.Total),
            TotalToCome: displayPrice(w.TotalToCome)
          }))
          .sortBy(a => a.Order)
          .value(),
          Total: displayPrice(_.sumBy(wallets, w => w.Total)),
          Selection: selection,
          TotalSelected: displayPrice(_.sumBy(selection, s => s.Total))
        };
      })
      .value();
  }

}
</script>