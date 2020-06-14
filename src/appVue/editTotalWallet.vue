<template>
  <div class="m-2" v-if="wallet">
    <h4>{{$t($t.keys.updateSoldeView.title, { name: wallet.Name })}}</h4>
    <Alert v-if="error" v-on:close="error=null">{{error}}</Alert>
    <div>
      {{$t($t.keys.updateSoldeView.currentBalance)}}
      {{wallet.Total}} {{wallet.Currency.Symbol}}
    </div>
    <form class="form" v-on:submit.prevent="updateSolde()">
      <div class="form-group">
        <label for="newTotal">{{$t($t.keys.updateSoldeView.newBalance)}}</label>
        <input
          name="newTotal"
          id="newTotal"
          class="form-control"
          type="number"
          step="0.01"
          v-model.number="newTotal"
          v-bind:placeholder="$t($t.keys.updateSoldeView.newBalance)"
        />
      </div>

      <div class="float-left">
        <button
          type="button"
          class="btn btn-danger"
          v-on:click="$router.back()"
        >{{$t($t.keys.common.cancel)}}</button>
      </div>
      <div class="float-right">
        <button type="submit" class="btn btn-primary">{{$t($t.keys.common.save)}}</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store, { IWalletWithTotalToCome } from "./store";
import Alert from "../components/alert.vue";
import { IconType, IWalletInput, IWallet } from "../lib/types";
import * as Models from "../lib/models";

@Component({
  components: { Alert }
})
export default class EditTotalWallet extends Vue {
  newTotal = 0;
  error = "";

  get wallet(): IWalletWithTotalToCome | undefined {
    if (this.$route.params.wallet) {
      return store.getters.walletsWithPriceToCome.find(
        c => c.UUID === this.$route.params.wallet
      );
    }
  }

  created() {
    if (!this.wallet) {
      this.error = this.$t(this.$t.keys.errors.notFound);
      return;
    }
  }

  async updateSolde() {
    console.log("update solde");
    if (!this.wallet) {
      return;
    }
    let input = {...this.wallet};
    input.Solde =
      this.wallet.Solde +
      this.newTotal - this.wallet.Total;
    
    input.Solde = Math.round(input.Solde * 100) / 100;
    const wallets = await Models.UpdateWallet(this.wallet.UUID, input)
    store.commit.setWallets(wallets);
    store.dispatch.sync();
    this.$router.back();
  }

}
</script>