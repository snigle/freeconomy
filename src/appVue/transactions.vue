<style lang="less" scoped>
.day {
  padding: 2px;
}
.price {
  text-align: right;
}
.noLink {
  cursor: default;
}
.repeat {
  font-size: 18px;
}
.repeat.btn {
  font-size: 12px;
  line-height: 1;
  padding: 1px;
}
.comment {
  font-size: 12px;
}
.transactions {
  margin-bottom: 60px;
}
</style>
<template>
  <div>
    <Navbar
      v-if="!hideNav"
      :title="title"
      :actions="menu"
      :iconLinks="icons"
      :selected="selection.length"
      :selectedIcons="selectedIcons"
      @cancel="unselectAll"
      :searchButton="true"
    />
    
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
        <div class="p-1 transactions">
      <div v-if="currency" class="list-group mt-1">
        <div
          class="day list-group-item bg-primary text-white font-weight-bold text-center"
          v-if="hideNav"
        >{{title}}</div>
        <template v-for="(day, index) in groupedLinesSized">
          <div
            :style="{height: `${day.size}px`, overflow:'hidden'}"
            v-bind:key="day.Day"
            v-if="index < 10 || visibleDays[day.Day]"
          >
            <div
              class="day list-group-item bg-secondary text-white"
              v-bind:class="{'bg-info':day.Lines[0].repeatable}"
            >{{day.Day}}</div>
            <router-link
              class="list-group-item list-group-item-action"
              v-bind:class="{'noLink': !line.EditLink}"
              v-for="line in day.Lines"
              v-bind:key="line.UUID"
              v-bind:to="line.EditLink || {}"
              v-bind:exact-active-class="'tata'"
              v-bind:event="line.EditLink? 'click' : 'toto'"
            >
              <div class="row">
                <button
                  type="button"
                  v-on:click.prevent="selectLine(line.UUID)"
                  class="icon-lg btn"
                  v-bind:style="{backgroundColor: (selectedLines[line.UUID] ? 'rgb(134, 192, 255)' : line.Category.Icon.Color) }"
                >
                  <div
                    v-if="line.Category.Icon.Type === 'material'"
                    class="material-icons"
                  >{{selectedLines[line.UUID] ? 'check' : $iconMap(line.Category.Icon.Name)}}</div>
                </button>
                <div class="middle col">
                  <div>
                    {{line.Description}}
                    <span
                      v-if="line.Repeat && !line.repeatable"
                      class="repeat material-icons"
                    >sync</span>
                    <button
                      type="button"
                      v-if="line.repeatable"
                      class="repeat btn btn-info btn-sm material-icons"
                      v-on:click="insertRepeat(line.UUID)"
                    >add</button>
                  </div>
                  <div class="comment">
                    {{line.Comment}}
                    <small
                      v-if="!wallet && walletsByUUID[line.WalletUUID]"
                    >({{walletsByUUID[line.WalletUUID].Name}})</small>
                  </div>
                </div>
                <div class="price">
                  <div class="price">{{line.DisplayPrice}} {{currency.Symbol}}</div>
                  <div class="total">
                    <small><Discret>{{line.TotalPrice}}</Discret> {{currency.Symbol}}</small>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div
            v-else
            :style="{height: `${day.size}px`, overflow:'hidden'}"
            v-bind:key="day.Day"
            v-view.once="() => displayDay(day.Day)"
          ></div>
        </template>
      </div>
      <Fab :actions="actions" />
    </div> 
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Location } from "vue-router";
import {
  ITransaction,
  IWallet,
  ICurrency,
  ICategory,
  ITransfert,
  displayPrice,
  IRepeat,
  IRepeatable
} from "../lib/types";
import * as Models from "../lib/models";
import store, { IWalletWithTotalToCome } from "./store";
import moment, { Moment } from "moment";
import _ from "lodash";
import Modal from "../components/modal.vue";
import Navbar from "../components/navbar-mobile.vue";
import Discret, { discret } from "../components/discret.vue";
import Fab, { IAction } from "../components/fab.vue";

interface ITransactionByDay {
  Day: string;
  Lines: Array<ILine>;
}

export interface ILine {
  Transaction?: ITransaction;
  Transfert?: ITransfert;
  Description: string;
  DisplayPrice: number;
  Price: number;
  TotalPrice: number;
  Date: Date;
  UUID: string;
  Category: ICategory;
  EditLink?: Location;
  Repeat: IRepeat | null;
  Wallet?: IWallet;
  repeatable: boolean;
}
const defaultCategory: ICategory = {
  Icon: { Name: "help", Color: "#517fa4", Type: "material" },
  LastUpdate: new Date(),
  Name: "Unknown",
  UUID: ""
};

@Component({
  components: { Modal, Fab, Navbar, Discret },
  props: ["hideNav"]
})
export default class Transactions extends Vue {
  selectedLines: { [key: string]: boolean } = {};
  deletionPopup = false;
  hideNav!: boolean;

  visibleDays: { [key: string]: boolean } = {};
  displayDay(day: string) {
    const visible: { [key: string]: boolean } = {};
    visible[day] = true;
    this.visibleDays = { ...this.visibleDays, ...visible };
  }
  selectLine(uuid: string) {
    this.selectedLines[uuid] = !this.selectedLines[uuid];
    this.selectedLines = { ...this.selectedLines };
  }
  unselectAll() {
    this.selectedLines = {};
  }

  public get title(): string {
    let title = "";

    if (this.currency && this.selection.length) {
      title = `${this.selection.length} ${this.$t(
        this.$t.keys.common.selected as string,
        { count: this.selection.length }
      )} : ${displayPrice(this.totalSelection)} ${this.currency.Symbol}`;
    } else if (_.isString(this.$route.query.category)) {
      const category = store.state.categories.find(c => c.UUID === this.$route.query.category)
      title = `${this.$t(this.$t.keys.filters.category)}: ${category?.Name || this.$route.query.category}`;
    } else if (_.isString(this.$route.query.description)) {
      title = `${this.$t(this.$t.keys.filters.description)}: ${this.$route.query.description}`;
    } else if (this.wallet && this.currency) {
      title = `${this.wallet.Name}: ${discret(displayPrice(this.wallet.Total))} ${
        this.currency.Symbol
      }`;
    } else if (this.currency) {
      title = `${this.currency.Code}: ${
        this.filteredLines.length
          ? discret(displayPrice(this.filteredLines[0].TotalPrice))
          : 0
      } ${this.currency.Symbol}`;
    } else {
      title = this.$t(this.$t.keys.common.title);
    }
    return title;
  }

  get selection(): Array<ILine> {
    return this.filteredLines
      .concat(this.repeatableLines)
      .filter(l => this.selectedLines[l.UUID]);
  }

  get repeatableSelection(): Array<IRepeatable> {
    return this.repeatables.filter(r => this.selectedLines[r.Key]);
  }

  get totalSelection(): number {
    return displayPrice(
      this.selection.reduce((total, line) => total + line.Price, 0)
    );
  }

  get wallets(): Array<IWallet> {
    if (!this.currency) {
      return [];
    }
    const currency: ICurrency = this.currency;

    let wallets = store.state.wallets.filter(
      w => w.Currency.Code === currency.Code
    );
    // Filter by wallet if exist
    if (this.wallet) {
      const wallet: IWallet = this.wallet;
      wallets = wallets.filter(w => w.UUID === wallet.UUID);
    }
    return wallets;
  }

  get walletsByUUID(): { [key: string]: IWallet } {
    const wallets: { [key: string]: IWallet } = {};
    _.forEach(this.wallets, w => (wallets[w.UUID] = w));
    return wallets;
  }

  get wallet(): IWalletWithTotalToCome | undefined {
    return store.getters.walletsWithPriceToCome.find(
      w => w.UUID === this.$route.query.wallet
    );
  }

  get currency(): ICurrency {
    if (this.wallet) {
      return this.wallet.Currency;
    }

    let firstWalletOfCurrency = _.first(store.state.wallets);
    if (this.$route.query.currencyCode) {
      firstWalletOfCurrency = _.find(
        store.state.wallets,
        w => w.Currency.Code === this.$route.query.currencyCode
      );
    }
    if (!firstWalletOfCurrency) {
      return {Code : "???", Symbol: "?"}
    }
    return firstWalletOfCurrency.Currency;
  }

  get transactions(): Array<ITransaction> {
    const walletUUIDs = this.wallets.map(w => w.UUID);
    const transactions = store.state.transactions.filter(
      t => walletUUIDs.indexOf(t.WalletUUID) !== -1
    );

    return transactions;
  }

  get transferts(): Array<ITransfert> {
    const transferts = store.state.transferts.filter(t =>
      this.wallets.find(
        w => w.UUID === t.From.WalletUUID || w.UUID === t.To.WalletUUID
      )
    );
    return transferts;
  }

  get categories(): Array<ICategory> {
    return store.state.categories;
  }

  transactionToLine(t: ITransaction, repeatable?: boolean): ILine {
    return {
      ...t,
      Transaction: t,
      Price: t.Price,
      DisplayPrice: t.Price,
      TotalPrice: 0,
      Description: t.Beneficiary,
      Category:
        _.find(this.categories, c => c.UUID === t.CategoryUUID) ||
        defaultCategory,
      EditLink: repeatable
        ? undefined
        : {
            name: "editTransaction",
            params: { transaction: t.UUID },
            query: { ...this.$route.query }
          },
      repeatable: repeatable || false
    };
  }

  get transactionLines(): Array<ILine> {
    return this.transactions.map(t => this.transactionToLine(t));
  }

  get repeatables(): Array<IRepeatable> {
    return store.getters.getRepeatOperations.filter(r => {
      if (!this.wallet) {
        return true;
      }
      if (r.Transaction) {
        return this.wallets.find(w => w.UUID === r.Transaction?.New.WalletUUID);
      }
      if (r.Transfert) {
        return this.wallets.find(
          w =>
            w.UUID === r.Transfert?.New.From.WalletUUID ||
            w.UUID === r.Transfert?.New.To.WalletUUID
        );
      }
    });
  }

  get repeatableLines(): Array<ILine> {
    return _.compact(
      this.repeatables.map(r => {
        if (r.Transaction) {
          return this.transactionToLine(
            { ...r.Transaction.From, ...r.Transaction.New, UUID: r.Key },
            true
          );
        } else if (r.Transfert) {
          return this.transfertToLine(
            { ...r.Transfert.From, ...r.Transfert.New, UUID: r.Key },
            true
          );
        }
      })
    );
  }

  transfertToLine(t: ITransfert, repeatable: boolean): ILine {
    // Vars : totalPrice, price, description
    // Wallet ID exist , get other wallet
    // totalPrice = price and normal description
    // No Wallet ID , get other wallet
    // Get wallet from and wallet to
    // If other wallet has same currency, don't add total price
    // totalPrice = 0, price normal and description toto vers tata
    // Else
    // totalPrice = price and description toto vers tata

    let price = 0;
    let displayPrice = 0;
    let description = "";
    const walletFrom = store.state.wallets.find(
      w => w.UUID === t.From.WalletUUID
    );
    const walletTo = store.state.wallets.find(w => w.UUID === t.To.WalletUUID);

    if (this.wallet && this.wallet.UUID === t.From.WalletUUID) {
      displayPrice = -t.From.Price;
      price = displayPrice;
      const otherWallet = store.state.wallets.find(
        w => w.UUID === t.To.WalletUUID
      );
      description = this.$t(this.$t.keys.transactionsView.transfertTo, {
        wallet: otherWallet?.Name
      });
    } else if (this.wallet && this.wallet.UUID === t.To.WalletUUID) {
      displayPrice = t.To.Price;
      price = displayPrice;
      let otherWallet = store.state.wallets.find(
        w => w.UUID === t.From.WalletUUID
      );
      description = this.$t(this.$t.keys.transactionsView.transfertFrom, {
        wallet: otherWallet?.Name
      });
    } else if (walletFrom?.Currency.Code === walletTo?.Currency.Code) {
      price = 0;
      displayPrice = t.From.Price;
    } else if (walletFrom?.Currency.Code === this.currency?.Code) {
      displayPrice = -t.From.Price;
      price = displayPrice;
    } else {
      displayPrice = t.To.Price;
      price = displayPrice;
    }
    if (description == "") {
      description = [
        this.$t(this.$t.keys.transactionsView.transfert),
        this.$t(this.$t.keys.addTransfertView.from),
        walletFrom?.Name,
        this.$t(this.$t.keys.addTransfertView.to).toLowerCase(),
        walletTo?.Name
      ].join(" ");
    }

    return {
      ...t,
      Transfert: t,
      Price: price,
      TotalPrice: 0,
      DisplayPrice: displayPrice,
      Description: description,
      EditLink: repeatable
        ? undefined
        : {
            name: "editTransfert",
            params: { transfert: t.UUID },
            query: { ...this.$route.query }
          },
      Category: {
        Icon: {
          Color: price > 0 ? "#00AA00" : "#EE0000",
          Name: "sync",
          Type: "material"
        },
        Name: this.$t(this.$t.keys.transactionsView.transfert),
        UUID: "",
        LastUpdate: new Date()
      },
      repeatable
    };
  }

  get transfertLines(): Array<ILine> {
    return this.transferts.map(t => this.transfertToLine(t, false));
  }

  get lines(): Array<ILine> {
    let lines = _.sortBy(
      _.concat<ILine>(this.transactionLines, this.transfertLines),
      t => t.Date
    ).map(l => ({ ...l })); // Recreate objects to avoid modifying source.

    if (_.isString(this.$route.query.search)) {
      lines = lines.filter(
        l =>
          JSON.stringify({ ...l, EditLink: undefined })
            .toLowerCase()
            .match(this.$route.query.search.toString().toLowerCase()) !== null
      );
    }

    return lines
  }

  get filteredLines(): Array<ILine> {
    let lines = this.lines;
    if (_.isString(this.$route.query.category)) {
      lines = lines.filter(l => l.Category.UUID === this.$route.query.category);
    }
    if (_.isString(this.$route.query.description)) {
      lines = lines.filter(
        l => l.Description === this.$route.query.description
      );
    }
    if (_.isString(this.$route.query.transactionFrom)) {
      lines = lines.filter(l =>
        moment(l.Date).isSameOrAfter(
          moment(this.$route.query.transactionFrom as string)
        )
      );
    }
    if (_.isString(this.$route.query.transactionTo)) {
      lines = lines.filter(l =>
        moment(l.Date).isBefore(
          moment(this.$route.query.transactionTo as string)
        )
      );
    }

    let total = _.sumBy(this.wallets, w => w.Solde);
    
    // Reset total when filter transactions to count only displayed data.
    if(this.$route.query.category || this.$route.query.description || this.$route.query.search) {
      total = 0;
    }

    _.forEach(lines, line => {
      total += line.Price;
      line.TotalPrice = total;
    });
    return _.reverse(lines);
  }

  get groupedLinesSized(): Array<ITransactionByDay & { size: number }> {
    return this.groupedLines.map(g => ({
      ...g,
      size: 30 + 75 * g.Lines.length
    }));
  }

  get groupedLines(): Array<ITransactionByDay> {
    const transactionAndTranfertsByDay = _(this.filteredLines)
      .groupBy(t =>
        moment(t.Date)
          .startOf("day")
          .toString()
      )
      .map((lines: Array<ILine>, day) => ({
        Day: moment((_.first(lines) as ILine).Date).format("dddd Do MMMM YYYY"),
        Lines: lines.map(l => ({
          ...l,
          Price: displayPrice(l.Price),
          TotalPrice: displayPrice(l.TotalPrice)
        }))
      }))
      .value();

    // Add repeatables
    if (this.repeatableLines.length) {
      let total = 0;
      if (transactionAndTranfertsByDay.length) {
        total = transactionAndTranfertsByDay[0].Lines[0].TotalPrice;
      }
      _.forEach(this.repeatableLines, line => {
        total += line.Price;
        line.TotalPrice = total;
      });

      transactionAndTranfertsByDay.unshift({
        Day: this.$t(this.$t.keys.walletsView.repeatable, {
          number: this.repeatableLines.length
        }),
        Lines: this.repeatableLines.reverse().map(l => ({
          ...l,
          Price: displayPrice(l.Price),
          TotalPrice: displayPrice(l.TotalPrice)
        }))
      });
    }

    return transactionAndTranfertsByDay;
  }

  async deleteSelection() {
    var transferts: Array<ITransfert> | null = null;
    var transactions: Array<ITransaction> | null = null;
    for (const line of this.selection) {
      if (line.Transfert) {
        transferts = await Models.DeleteTransfert(line.UUID);
      }
      if (line.Transaction) {
        transactions = await Models.DeleteTransaction(line.UUID);
      }
    }

    if (transferts !== null) {
      store.commit.setTransferts(transferts);
    }
    if (transactions !== null) {
      store.commit.setTransactions(transactions);
    }
    store.dispatch.sync();
    this.deletionPopup = false;
  }

  async insertRepeat(repeatKey: string) {
    const repeat = store.getters.getRepeatOperations.find(
      r => r.Key === repeatKey
    );
    if (!repeat) {
      return;
    }

    try {
      if (repeat.Transfert) {
        const transferts = await Models.InsertRepeatTransfert(repeat);
        store.commit.setTransferts(transferts);
      }

      if (repeat.Transaction) {
        const transactions = await Models.InsertRepeatTransaction(repeat);
        store.commit.setTransactions(transactions);
      }
    } catch (e) {
      console.log("issue, when adding repeat", e, repeat);
    }

    store.dispatch.sync();
  }

  async addAllRepeatables() {
    var transferts: Array<ITransfert> | null = null;
    var transactions: Array<ITransaction> | null = null;
    for (const repeatable of this.repeatables) {
      if (repeatable.Transfert) {
        transferts = await Models.InsertRepeatTransfert(repeatable);
      }
      if (repeatable.Transaction) {
        transactions = await Models.InsertRepeatTransaction(repeatable);
      }
    }
    if (transferts !== null) {
      store.commit.setTransferts(transferts);
    }
    if (transactions !== null) {
      store.commit.setTransactions(transactions);
    }
    store.dispatch.sync();
  }

  get actions(): Array<IAction> {
    const $t = this.$t;
    const actions: Array<IAction> = [];
    if (this.repeatables.length) {
      actions.push({
        label: $t($t.keys.walletsView.repeatable, {
          number: this.repeatableLines.length
        }),
        icon: "playlist_add",
        class: "bg-info",
        click: () => this.addAllRepeatables()
      });
    }
    if (this.wallet) {
      _.forEach(this.menu, a => actions.push(a));
    }

    return actions;
  }

  get menu(): Array<IAction> {
    const $t = this.$t;
    const menu: Array<IAction> = [];
    if (this.wallet) {
      const walletActions = [
        {
          label: $t($t.keys.transactionsView.addTransaction),
          icon: "playlist_add",
          class: "bg-primary",
          click: () =>
            this.$router.push({
              name: "addTransaction",
              query: this.wallet ? { wallet: this.wallet.UUID } : {}
            })
        },
        {
          label: $t($t.keys.transactionsView.addTransfert),
          icon: "repeat_one",
          class: "bg-primary",
          click: () =>
            this.$router.push({
              name: "addTransfert",
              query: this.wallet ? { wallet: this.wallet.UUID } : {}
            })
        }
      ];

      _.forEach(walletActions, a => menu.push(a));
    }

    return menu;
  }

  get icons() {
    return [
      {
        label: this.$t(this.$t.keys.sideBar.graph),
        icon: "pie_chart",
        click: () =>
          this.$router.push({
            name: "stats",
            query: {
              ...this.$route.query,
              category: undefined,
              description: undefined,
              transactionFrom: undefined,
              transactionTo: undefined
            }
          })
      }
    ];
  }

  get selectedIcons() {
    return [
      {
        label: this.$t(this.$t.keys.common.delete),
        icon: "delete",
        click: () => (this.deletionPopup = true)
      }
    ];
  }
}
</script>