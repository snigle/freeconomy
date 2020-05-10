<style lang="scss" scoped>
#beneficiary.autocomplete {
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
#autocomplete {
  :first-child {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .list-group-item {
    font-size: 15px;
    padding: 0.25rem 0.75rem;
    .material-icons {
      font-size: 12px;
      margin-right: 5px;
    }
    .price {
      float: right;
    }
  }
}
</style>
<template>
  <div>
    <Modal
      v-if="deletionPopup"
      v-on:close="deletionPopup = false"
      v-on:backdropClick="deletionPopup = false"
    >
      <template v-slot:header>
        <div>{{$t($t.keys.common.areYourSure)}}</div>
      </template>
      {{$t($t.keys.common.removeName,{name:transaction.Beneficiary})}}
      <template v-slot:footer>
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            v-on:click="deletionPopup = false"
          >{{$t($t.keys.common.cancel)}}</button>
          <button
            type="button"
            class="btn btn-danger"
            v-on:click="deleteTransaction()"
          >{{$t($t.keys.common.remove)}}</button>
        </div>
      </template>
    </Modal>
    <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>
    <form v-on:submit="save(false)">
      <div class="form-group">
        <label for="beneficiary">{{$t($t.keys.addTransactionView.beneficiary)}}</label>
        <input
          type="text"
          v-model="transaction.Beneficiary"
          class="form-control"
          v-bind:class="{autocomplete: autocomplete.length > 0}"
          id="beneficiary"
          aria-describedby="beneficiaryHelp"
        />
        <div class="list-group" id="autocomplete" v-if="autocomplete.length > 0">
          <button
            type="button"
            class="list-group-item list-group-item-action"
            v-on:click="autocompleteClick(item)"
            v-for="item in autocomplete"
            v-bind:key="item.UUID"
          >
            <span class="material-icons">{{item.Category ? $iconMap(item.Category.Icon.Name) : "help"}}</span>
            {{item.Beneficiary}}
            <span v-if="!transaction.Price" class="price">{{item.Price}}{{item.Wallet ? item.Wallet.Currency.Symbol : ''}}</span>
          </button>
        </div>
        <small
          id="beneficiaryHelp"
          class="form-text text-muted"
        >{{$t($t.keys.addTransactionView.beneficiaryHelp)}}</small>
      </div>

      <div class="form-group">
        <label for="comment">{{$t($t.keys.addTransactionView.comment)}}</label>
        <input type="text" class="form-control" id="comment" v-model="transaction.Comment" />
      </div>

      <div class="form-group">
        <label for="category">{{$t($t.keys.common.category)}}</label>
        <select class="form-control" id="category" v-model="transaction.CategoryUUID">
          <option
            v-for="category in categories"
            v-bind:key="category.UUID"
            v-bind:value="category.UUID"
          >{{category.Name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="date">{{$t($t.keys.common.date)}}</label>
        <input
          type="date"
          class="form-control"
          v-bind:class="{'is-invalid':formErrors.date}"
          id="date"
          v-bind:value="date"
          v-on:input="date = $event.target.value"
        />
      </div>

      <div class="form-group">
        <label for="price">{{$t($t.keys.common.price)}}</label>
        <div class="input-group">
          <input
            type="text"
            inputmode="numeric"
            class="form-control"
            id="price"
            v-bind:class="{'is-invalid':isNaN(transaction.Price)}"
            v-bind:value="price"
            v-on:input="setPrice($event.target.value)"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <i v-if="transaction.Price <= 0" class="material-icons">trending_down</i>
              <i v-else class="material-icons">trending_up</i>
            </div>
          </div>
        </div>
        <small
          id="priceHelp"
          class="form-text text-muted"
        >{{$t($t.keys.addTransactionView.priceHelp)}}</small>
      </div>

      <RepeatInput v-model="transaction.Repeat" />

      <div class="form-group">
        <div class="float-left">
          <button
            type="button"
            v-if="$route.params.transaction"
            class="btn btn-danger"
            v-on:click="deletionPopup = true"
          >{{$t($t.keys.common.delete)}}</button>
          <button
            type="button"
            v-else
            class="btn btn-danger"
            v-on:click="$route.back()"
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
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  ITransaction,
  ITransactionInput,
  ICategory,
  IWallet
} from "../lib/types";
import * as Models from "../lib/models";
import store from "./store";
import _ from "lodash";
import moment from "moment";
import Alert from "../components/alert.vue";
import RepeatInput from "../components/repeatInput.vue";
import Modal from "../components/modal.vue";

interface IWithCategory {
  Category?: ICategory;
}
interface IWithWallet {
  Wallet?: IWallet;
}

@Component({
  components: { Alert, RepeatInput, Modal }
})
export default class EditTransaction extends Vue {
  transaction: ITransactionInput = {
    WalletUUID: "",
    CategoryUUID: "",
    Beneficiary: "",
    Date: new Date(),
    Price: 0,
    Comment: "",
    Repeat: null
  };
  error: string = "";
  formErrors = { date: false };
  deletionPopup = false;
  loading = false;
  price = "-";

  setPrice(n: string) {
    this.price = n;
    this.transaction.Price = parseFloat(n);
  }

  cleanToSearch(text: string): string {
    return text.toLowerCase().replace(/( |'|-)/g, "");
  }

  get categories(): Array<ICategory> {
    return store.state.categories;
  }

  get date(): string {
    return moment(this.transaction.Date).format("YYYY-MM-DD");
  }

  set date(date: string) {
    this.transaction.Date = new Date(date);
    this.formErrors.date = isNaN(this.transaction.Date.getTime());
  }

  created() {
    if (this.$route.query && _.isString(this.$route.query.wallet)) {
      this.transaction.WalletUUID = this.$route.query.wallet;
    }
    if (this.$route.params.transaction) {
      const transaction = store.state.transactions.find(
        $t => $t.UUID === this.$route.params.transaction
      );
      if (!transaction) {
        this.error = this.$t(this.$t.keys.errors.notFound);
        return;
      }
      this.transaction = { ...transaction };
      this.price = `${transaction.Price}`;
    }

    if (!this.transaction.CategoryUUID || !this.categories.find(c => c.UUID === this.transaction.CategoryUUID)) {
      const category = _.first(this.categories);
      if (!category) {
        this.error = this.$t(this.$t.keys.errors.needCategoryToAddTransaction);
        return;
      }
      this.transaction.CategoryUUID = category.UUID;
      this.transaction = {...this.transaction};
    }
  }

  get autocomplete(): Array<ITransaction & IWithCategory & IWithWallet> {
    const autocomplete: Array<ITransaction> = _(store.state.transactions)
      .filter(
        tr =>
          tr.WalletUUID === this.transaction.WalletUUID &&
          tr.UUID !== this.$route.params.transaction &&
          this.cleanToSearch(tr.Beneficiary).match(
            this.cleanToSearch(this.transaction.Beneficiary)
          ) !== null
      )
      .groupBy(
        (tr: ITransaction) =>
          `${this.cleanToSearch(tr.Beneficiary)}.${tr.CategoryUUID}`
      )
      .values()
      .sortBy(transactions => transactions.length)
      .reverse()
      .value()
      .map(
        (transactions: Array<ITransaction>) =>
          _(transactions)
            .groupBy((tr: ITransaction) => tr.Price)
            .values()
            .sortBy(transactions => transactions.length)
            .reverse()
            .map(transactions => _.first(transactions) as ITransaction)
            .first() as ITransaction
      )
      .slice(0, 10)
      .map(tr => ({
        ...tr,
        Category: store.state.categories.find(c => c.UUID === tr.CategoryUUID),
        Wallet: store.state.wallets.find(w => w.UUID === tr.WalletUUID)
      }));
    if (
      autocomplete.length === 1 &&
      this.cleanToSearch(autocomplete[0].Beneficiary) ===
        this.cleanToSearch(this.transaction.Beneficiary)
    ) {
      return [];
    }
    return autocomplete;
  }

  autocompleteClick(tr: ITransaction) {
    this.transaction.Beneficiary = tr.Beneficiary;
    this.transaction.CategoryUUID = tr.CategoryUUID;
    if (this.transaction.Comment === "") {
      this.transaction.Comment = tr.Comment;
    }
    if (this.transaction.Price === 0) {
      this.setPrice(`${tr.Price}`);
    }
  }

  deleteTransaction() {
    Models.DeleteTransaction(this.$route.params.transaction).then(
      transactions => {
        store.commit.setTransactions(transactions);
        this.deletionPopup = false;
        setTimeout(() => this.$router.back(), 0);
        store.dispatch.sync();
      }
    );
  }

  save(andNew: boolean) {
    if (isNaN(this.transaction.Date.getTime())) {
      this.error = this.$t(this.$t.keys.errors.invalidDate);
      return;
    }
    if (isNaN(this.transaction.Price)) {
      this.error = this.$t(this.$t.keys.errors.invalidPrice);
      return;
    }
    if (!this.transaction.WalletUUID) {
      this.error = this.$t(this.$t.keys.errors.needWalletToAddTransfert);
      return;
    }

    this.loading = true;

    const savePromise: Promise<ITransaction[]> =
      this.$route.params && this.$route.params.transaction
        ? Models.UpdateTransaction(
            this.$route.params.transaction,
            this.transaction
          )
        : Models.CreateTransaction(this.transaction);
    savePromise
      .then(transactions => {
        store.commit.setTransactions(transactions);
        if (!andNew) {
          setTimeout(() => this.$router.back(), 0);
        } else {
          setTimeout(() =>
            this.$router.replace({
              name: "addTransaction",
              query: { ...this.$route.query }
            })
          );
        }
      })
      .catch(
        (err: any) =>
          (this.error = this.$t(this.$t.keys.errors.saveError, { err: err }))
      );
  }
}
</script>