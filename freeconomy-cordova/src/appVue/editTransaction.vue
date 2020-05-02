<template>
  <div>
    <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>
    <form v-on:submit="save(false)">
      <div class="form-group">
        <label for="beneficiary">{{$t($t.keys.addTransactionView.beneficiary)}}</label>
        <input
          type="text"
          v-model="transaction.Beneficiary"
          class="form-control"
          id="beneficiary"
          aria-describedby="beneficiaryHelp"
        />
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

      <RepeatInput v-model="transaction.Repeat"/>

      <div class="form-group">
        <div class="float-left">
          <button type="button" v-if="$route.params.transaction" class="btn btn-danger" v-on:click="deleteTransaction()">{{$t($t.keys.common.delete)}}</button>
          <button type="button" v-else class="btn btn-danger" v-on:click="$route.back()">{{$t($t.keys.common.cancel)}}</button>
        </div>
        <div class="float-right">
          <button type="button" class="btn btn-secondary" v-on:click="save(true)">{{$t($t.keys.common.saveAndNew)}}</button>
          <button type="submit" class="btn btn-primary">{{$t($t.keys.common.save)}}</button>
        </div>
      </div>

    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ITransaction, ITransactionInput, ICategory } from "../lib/types";
import * as Models from "../lib/models";
import store from "./store";
import _ from "lodash";
import moment from "moment";
import Alert from "../components/alert.vue";
import RepeatInput from "../components/repeatInput.vue";

@Component({
  components: {Alert, RepeatInput},
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
  error:string = "";
  formErrors = { date: false };

  loading = false;
  price = "-";

  setPrice(n: string) {
    this.price= n;
    this.transaction.Price = parseFloat(n);
  }
  
  get categories(): Array<ICategory> {
    return store.state.categories;
  }

  get date(): string {
    return moment(this.transaction.Date).format("YYYY-MM-DD");
  }

  set date(date: string) {
    this.transaction.Date = new Date(date);
    this.formErrors.date = isNaN(this.transaction.Date.getTime())
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
    }

    if (!this.transaction.CategoryUUID) {
      const category = _.first(this.categories);
      if (!category) {
        this.error = this.$t(this.$t.keys.errors.needCategoryToAddTransaction);
        return;
      }
      this.transaction.CategoryUUID = category.UUID;
    }
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

    this.loading = true;
          
    const savePromise: Promise<ITransaction[]> =
      this.$route.params && this.$route.params.transaction
        ? Models.UpdateTransaction(
            this.$route.params.transaction,
            this.transaction
          )
        : Models.CreateTransaction(this.transaction);
    savePromise
      .then((transactions) => {
        store.commit.setTransactions(transactions);
        if (!andNew) {
          setTimeout(()=>this.$router.back(),0);
        } else {
          setTimeout(() => this.$router.replace({
            name: "addTransaction",
            query: { ...this.$route.query }
          }));
        }
      })
      .catch((err: any) => this.error = this.$t(this.$t.keys.errors.saveError, {err : err}));
  }
}
</script>