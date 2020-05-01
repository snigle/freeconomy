<template>
  <div class="container-fluid" v-if="!loading">
    <div class="row">
      <Wallets class="col-4" />
      <Transactions class="col-4" />
      <div class="col"></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Wallets from "./wallets.vue";
import Transactions from "./transactions.vue";
import store from "./store";

@Component({
  components: {
    Wallets,
    Transactions
  }
})
export default class Desktop extends Vue {
    loading = true
  created() {
    store.dispatch.loadData().then(() => {
        this.loading = false;
    });
  }
}
</script>