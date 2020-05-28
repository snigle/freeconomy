<template>
  <div>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <router-link v-bind:to="{...$route, query:{...$route.query, stats: undefined, statsBeginDate: undefined, statsEndDate: undefined}}" class="nav-link" v-bind:class="{active:!$route.query.stats}">Categories</router-link>
  </li>
    <li class="nav-item">
    <router-link v-bind:to="{...$route, query:{...$route.query, stats: 'beneficiary', statsBeginDate: undefined, statsEndDate: undefined}}" class="nav-link">Bénéficiaire</router-link>
  </li>
  <li class="nav-item">
    <router-link v-bind:to="{...$route, query:{...$route.query, stats: 'chart', statsBeginDate: undefined, statsEndDate: undefined}}" class="nav-link">Chart</router-link>
  </li>
</ul>
<CategoryStats v-if="!$route.query.stats" />
<BeneficiaryStats v-else-if="$route.query.stats === 'beneficiary'" />
<ChartStats v-else-if="$route.query.stats === 'chart'" />
  </div>
</template>
<script
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CategoryStats from "./categoryStats.vue";
import BeneficiaryStats from "./beneficiaryStats.vue";
import ChartStats from "./chartStats.vue";

@Component({
    components: {CategoryStats,BeneficiaryStats, ChartStats}
})
export default class Stats extends Vue {

};
</script>