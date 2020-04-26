<style lang="less" scoped>
.day {
  background-color: rgb(130, 130, 130);
  color: white;
  padding: 2px;
}
@iconSize: 70px;
.icon {
  width: @iconSize;
  height: @iconSize;
  text-align: center;
  color: white;
  font-size: @iconSize * 80 / 100;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}
</style>
<template>
  <div v-if="currency" class="list-group">
    <template v-for="day in transactionsByDay">
      <div
        v-bind:key="day.Day.toString()"
        class="day list-group-item"
      >{{day.Day.format("dddd Do MMMM YYYY")}}</div>
      <router-link class="list-group-item list-group-item-action" v-for="line in day.Lines" v-bind:key="line.UUID"
      v-bind:to="line.EditLink"
      >
        <div class="container">
          <div class="row">
            <div
              class="icon rounded-circle"
              v-bind:style="{backgroundColor:line.Category.Icon.Color }"
            >
              <i
                v-if="line.Category.Icon.Type === 'material'"
                class="material-icons"
              >{{line.Category.Icon.Name}}</i>
            </div>
            <div class="middle col">
              <div>{{line.Beneficiary}}</div>
              <div>
                <span v-if="!wallet">Todo</span>
                {{line.Comment}}
              </div>
            </div>
            <div class="price">
              <div class="price">{{line.Price}} {{currency.Symbol}}</div>
              <div class="total">{{line.TotalPrice}} {{currency.Symbol}}</div>
            </div>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Location} from "vue-router";
import {
  ITransaction,
  IWallet,
  ICurrency,
  ICategory,
  ITransfert,
  displayPrice
} from "../lib/types";
import store from "./store";
import moment, { Moment } from "moment";
import _ from "lodash";

interface ITransactionByDay {
  Day: Moment;
  Lines: Array<ILine>;
}

interface ILine {
  Transaction?: ITransaction;
  Transfert?: ITransfert;
  Price: number;
  TotalPrice: number;
  Date: Date;
  UUID: string;
  Category: ICategory;
  EditLink: Location;
}

const defaultCategory: ICategory = {
  Icon: { Name: "help", Color: "#517fa4", Type: "material" },
  LastUpdate: new Date(),
  Name: "Unknown",
  UUID: ""
};

@Component({})
export default class Transactions extends Vue {
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

  get wallet(): IWallet | null {
    return (
      store.state.wallets.find(
        w =>
          w.UUID === this.$route.query.wallet
      ) || null
    );
  }

  get currency(): ICurrency | null {
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
      console.log("wallet not found");
      return null;
    }
    return firstWalletOfCurrency.Currency;
  }

  get transactions(): Array<ITransaction> {
    const walletUUIDs = this.wallets.map(w => w.UUID);
    const transactions = store.state.transactions.filter(
      t => walletUUIDs.indexOf(t.WalletUUID) !== -1
    );
    // Filter by search if exist
    // TODO

    return transactions;
  }

  get transferts(): Array<ITransfert> {
    if (!this.wallet) {
      return [];
    }
    const wallet = this.wallet as IWallet;
    const transferts = store.state.transferts.filter(
      t => [t.From.WalletUUID, t.To.WalletUUID].indexOf(wallet.UUID) >= 0
    );
    return transferts;
  }

  get categories(): Array<ICategory> {
    return store.state.categories;
  }

  get transactionLines(): Array<ILine> {
    return this.transactions.map(t => ({
      ...t,
      Transaction: t,
      Price: t.Price,
      TotalPrice: 0,
      Category:
        _.find(this.categories, c => c.UUID === t.CategoryUUID) ||
        defaultCategory,
        EditLink: {name: "editTransaction", params: { "transaction": t.UUID}, query: {...this.$route.query}},
    }));
  }

  get transfertLines(): Array<ILine> {
    if (!this.wallet) {
      return [];
    }
    const wallet = this.wallet as IWallet;
    return this.transferts.map(t => {
      let price = t.To.Price;
      if (wallet.UUID === t.From.WalletUUID) {
        price = -t.From.Price;
      }
      return {
        ...t,
        Transfert: t,
        Price: price,
        TotalPrice: 0,
        EditLink: {name: "editTransfert", params: {"transfert": t.UUID}, query: {...this.$route.query}},
        Category: {
          Icon: {
            Color: price > 0 ? "#00AA00" : "#EE0000",
            Name: "sync",
            Type: "material"
          },
          Name: "",
          UUID: "",
          LastUpdate: new Date()
        }
      };
    });
  }

  get lines(): Array<ILine> {
    const lines = _.sortBy(
      _.concat<ILine>(this.transactionLines, this.transfertLines),
      t => t.Date
    );

    let total = 0;
    if (this.wallet) {
      total = this.wallet.Solde;
    }
    _.forEach(lines, line => {
      total += line.Price;
      line.TotalPrice = total;
    });
    return _.reverse(lines);
  }

  get transactionsByDay(): Array<ITransactionByDay> {
    return _(this.lines)
      .groupBy(t =>
        moment(t.Date)
          .startOf("day")
          .toString()
      )
      .map((lines: Array<ILine>, day) => ({
        Day: moment((_.first(lines) as ILine).Date),
        Lines: lines.map(l => ({
          ...l,
          Price: displayPrice(l.Price),
          TotalPrice: displayPrice(l.TotalPrice)
        }))
      }))
      .value();
  }
}
</script>