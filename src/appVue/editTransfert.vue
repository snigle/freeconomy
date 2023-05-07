<template>
  <div>
    <Navbar
      v-if="!hideNav"
      :title="$t($t.keys.common.edit)"
      :selected="true"
      @cancel="$router.back()"
      :selectedIcons="selectedIcons"
    />
    <div class="m-2">
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
              class="btn btn-danger"
              v-on:click="deleteTransfert()"
            >{{$t($t.keys.common.remove)}}</button>
          </div>
        </template>
      </Modal>
      <Alert v-if="error" v-on:close="error=''">{{error}}</Alert>
      <form v-on:submit.prevent="save(false)">
        <div class="form-row">
          <div class="form-group col-sm-6">
            <label for="inputFrom">{{$t($t.keys.addTransfertView.from)}}</label>
            <select class="form-control" id="inputFrom" v-model="transfert.From.WalletUUID">
              <option
                v-for="wallet in walletsSelection"
                v-bind:key="wallet.UUID"
                v-bind:value="wallet.UUID"
              >{{wallet.Name}} ({{wallet.Currency.Code}})</option>
            </select>
          </div>
          <div class="form-group col-sm-6">
            <label for="inputTo">{{$t($t.keys.addTransfertView.to)}}</label>
            <select class="form-control" id="inputTo" v-model="transfert.To.WalletUUID">
              <option
                v-for="wallet in wallets"
                v-bind:key="wallet.UUID"
                v-bind:value="wallet.UUID"
              >{{wallet.Name}} ({{wallet.Currency.Code}})</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="col-5">
            <label for="price">{{$t($t.keys.common.price)}}</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              v-model.number="fromPrice"
            />
          </div>
          <div
            class="col-2"
            v-bind:style="{display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center'}"
          >
            <div class="material-icons">arrow_forward</div>
            <div>x{{transfert.From.Price ? transfert.To.Price / transfert.From.Price : 1}}</div>
          </div>
          <div class="form-group col-5">
            <label for="price">{{$t($t.keys.common.price)}}</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="price"
              v-bind:disabled="walletFrom && walletTo && walletFrom.Currency.Code === walletTo.Currency.Code"
              v-model.number="transfert.To.Price"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="comment">{{$t($t.keys.addTransactionView.comment)}}</label>
          <input type="text" class="form-control" id="comment" v-model="transfert.Comment" />
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

        <RepeatInput v-model="transfert.Repeat" />

        <div class="form-group">
          <div class="float-left">
            <button
              type="button"
              v-if="$route.params.transfert"
              class="btn btn-danger"
              v-on:click="deleteTransfert()"
            >{{$t($t.keys.common.delete)}}</button>
            <button
              type="button"
              v-else
              class="btn btn-danger"
              v-on:click="$router.back()"
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
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {
  ITransaction,
  ITransactionInput,
  ICategory,
  ITransfertInput,
  IWallet,
  ITransfert,
  ICurrency
} from "../lib/types";
import * as Models from "../lib/models";
import store from "./store";
import _ from "lodash";
import moment from "moment";
import Alert from "../components/alert.vue";
import RepeatInput from "../components/repeatInput.vue";
import Navbar, { IAction } from "../components/navbar-mobile.vue";

const emptyTransfert = {
  From: {
    WalletUUID: "",
    Price: 0
  },
  To: {
    WalletUUID: "",
    Price: 0
  },
  Date: new Date(),
  Comment: "",
  Repeat: null
};

@Component({
  components: { Alert, RepeatInput, Navbar },
  props: ["hideNav"]
})
export default class EditTransfert extends Vue {
  transfert: ITransfertInput = { ...emptyTransfert };
  error: string = "";
  formErrors = { date: false };
  deletionPopup = false;
  loading = false;

  // Nav props
  selectedIcons: Array<IAction> = [];
  hideNav!: boolean;

  get walletsSelection(): Array<IWallet> {
    return this.wallets.filter((w) => !w.Archived || w.UUID == this.walletFrom?.UUID || w.UUID == this.walletTo?.UUID);
  }

  get wallets(): Array<IWallet> {
    return store.state.wallets;
  }

  get walletFrom(): IWallet | undefined {
    return this.wallets.find(w => w.UUID === this.transfert.From.WalletUUID);
  }

  get walletTo(): IWallet | undefined {
    return this.wallets.find(w => w.UUID === this.transfert.To.WalletUUID);
  }

  get date(): string {
    return moment(this.transfert.Date).format("YYYY-MM-DD");
  }

  get fromPrice(): number {
    return this.transfert.From.Price;
  }
  set fromPrice(fromPrice: number) {
    if (
      this.walletFrom &&
      this.walletTo &&
      this.walletFrom.Currency.Code === this.walletTo.Currency.Code
    ) {
      this.transfert.To.Price = fromPrice;
    }
    this.transfert.From.Price = fromPrice;
  }

  set date(date: string) {
    this.transfert.Date = new Date(date);
    this.formErrors.date = isNaN(this.transfert.Date.getTime());
  }

  created() {
    if (this.$route.query && _.isString(this.$route.query.wallet)) {
      this.transfert.From.WalletUUID = this.$route.query.wallet;
    }
    if (this.$route.params.transfert) {
      const transfert = store.state.transferts.find(
        $t => $t.UUID === this.$route.params.transfert
      );
      if (!transfert) {
        this.error = this.$t(this.$t.keys.errors.notFound);
        return;
      }
      this.transfert = { ...transfert };
    }

    const wallet = _.first(this.wallets);
    if (!wallet) {
      this.error = this.$t(this.$t.keys.errors.needWalletToAddTransfert);
      return;
    }
    if (!this.transfert.From.WalletUUID) {
      this.transfert.From.WalletUUID = wallet.UUID;
    }
    if (!this.transfert.To.WalletUUID) {
      this.transfert.To.WalletUUID = wallet.UUID;
    }

    const selectedIcons = [];
    if (this.$route.params.transfert) {
      selectedIcons.push({
        label: this.$t(this.$t.keys.common.delete),
        icon: "delete",
        click: () => (this.deletionPopup = true)
      });
    }
    selectedIcons.push({
        label: this.$t(this.$t.keys.common.save),
        icon: "check",
        click: () => this.save(false)
      });

    this.selectedIcons = selectedIcons;
  }

  save(andNew: boolean) {
    if (isNaN(this.transfert.Date.getTime())) {
      this.error = this.$t(this.$t.keys.errors.invalidDate);
      return;
    }

    this.loading = true;

    const savePromise: Promise<ITransfert[]> =
      this.$route.params && this.$route.params.transfert
        ? Models.UpdateTransfert(this.$route.params.transfert, this.transfert)
        : Models.CreateTransfert(this.transfert);
    savePromise
      .then(transferts => {
        store.commit.setTransferts(transferts);
        store.dispatch.loadWallets().then(() => store.dispatch.sync());

        if (!andNew) {
          this.$router.back();
        } else {
          this.transfert = { ...emptyTransfert };
          this.$router.replace({
            name: "addTransfert",
            query: { ...this.$route.query }
          })
        }
      })
      .catch(
        (err: any) =>
          (this.error = this.$t(this.$t.keys.errors.saveError, { err: err }))
      );
  }

  deleteTransfert() {
    Models.DeleteTransfert(this.$route.params.transfert).then(transferts => {
      store.commit.setTransferts(transferts);
      this.deletionPopup = false;
      setTimeout(() => this.$router.back(), 0);
      store.dispatch.sync();
    });
  }
}
</script>