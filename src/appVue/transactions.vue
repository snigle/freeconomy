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
.selection {
  text-align: center;
  line-height: 30px;
}
</style>
<template>
  <div class="m-1">
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
    <div class="row actions">
      <div class="col-12">
        <router-link
          v-bind:to="{name:'addTransaction', query: this.wallet? {wallet:this.wallet.UUID}: {}}"
          class="btn btn-primary btn-sm float-left"
          v-if="this.wallet"
        >
          <span class="material-icons">playlist_add</span>
          {{$t($t.keys.transactionsView.transaction)}}
        </router-link>
        <router-link
          v-bind:to="{name:'addTransfert', query: this.wallet? {wallet:this.wallet.UUID}: {}}"
          class="btn btn-primary btn-sm float-left"
          v-if="this.wallet"
        >
          <span class="material-icons">repeat_one</span>
          {{$t($t.keys.transactionsView.transfert)}}
        </router-link>
        <button
          v-if="repeatables.length"
          class="btn btn-info btn-sm float-left"
          v-on:click="addAllRepeatables()"
        >
          <span class="material-icons">playlist_add</span>
          {{repeatables.length}} {{$t($t.keys.walletsView.toCome)}}
        </button>
        <router-link
          v-if="repeatables.length"
          v-bind:to="{name: 'stats', query: {...$route.query}}"
          class="btn btn-info btn-sm float-right d-inline d-md-none"
        >
          <span class="material-icons">pie_chart</span>
          {{$t($t.keys.sideBar.graph)}}
        </router-link>
      </div>
      <div v-if="selection.length" class="col selection">
        {{selection.length}} {{$t($t.keys.common.selected, {count: selection.length})}} : {{totalSelection}} {{currency.Symbol}}
        <button
          type="button"
          class="btn btn-danger btn-sm float-right"
          v-on:click="deletionPopup = true"
        >{{$t($t.keys.common.delete)}}</button>
      </div>
    </div>
    <div v-if="currency" class="list-group">
      <template v-for="day in groupedLines.slice(0,60)">
        <div
          v-bind:key="day.Day.toString()"
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
                <small>{{line.TotalPrice}} {{currency.Symbol}}</small>
              </div>
            </div>
          </div>
        </router-link>
      </template>
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
import store from "./store";
import moment, { Moment } from "moment";
import _ from "lodash";
import Modal from "../components/modal.vue";

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
  components: { Modal }
})
export default class Transactions extends Vue {
  selectedLines: { [key: string]: boolean } = {};
  deletionPopup = false;

  selectLine(uuid: string) {
    this.selectedLines[uuid] = !this.selectedLines[uuid];
    this.selectedLines = { ...this.selectedLines };
  }

  get selection(): Array<ILine> {
    return this.lines
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

  get wallet(): IWallet | undefined {
    return store.state.wallets.find(w => w.UUID === this.$route.query.wallet);
  }

  get currency(): ICurrency | undefined {
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
      store.commit.showError({
        text: this.$t(this.$t.keys.errors.needWalletToDisplayTransactions)
      });
      return undefined;
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
    description = [
      this.$t(this.$t.keys.transactionsView.transfert),
      this.$t(this.$t.keys.addTransfertView.from),
      walletFrom?.Name,
      this.$t(this.$t.keys.addTransfertView.to).toLowerCase(),
      walletTo?.Name
    ].join(" ");

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

    let total = _.sumBy(this.wallets, w => w.Solde);
    _.forEach(lines, line => {
      total += line.Price;
      line.TotalPrice = total;
    });
    return _.reverse(lines);
  }

  get groupedLines(): Array<ITransactionByDay> {
    const transactionAndTranfertsByDay = _(this.lines)
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
        total += line.TotalPrice;
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
}
</script>