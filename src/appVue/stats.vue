<template>
  <div>
      <Navbar v-if="!hideNav" :title="title"/>

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
<CategoryStats ref="category" v-if="!$route.query.stats" @title="setTitle"/>
<BeneficiaryStats v-else-if="$route.query.stats === 'beneficiary'" @title="setTitle"/>
<ChartStats v-else-if="$route.query.stats === 'chart'" @title="setTitle"/>
  </div>
</template>
<script
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CategoryStats from "./categoryStats.vue";
import BeneficiaryStats from "./beneficiaryStats.vue";
import ChartStats from "./chartStats.vue";
import Navbar from "../components/navbar-mobile.vue";

@Component({
    components: {CategoryStats,BeneficiaryStats, ChartStats, Navbar},
    props: ["hideNav"]
})
export default class Stats extends Vue {
  hideNav! : boolean;
  title: string = "";

  // Get title from tab component
  setTitle(title : string) {
   this.title = title;
  }
  mounted() {
    console.log("this")
  }
};
</script>