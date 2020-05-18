<template>
  <div>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <router-link v-bind:to="{...$route, query:{...$route.query, stats: undefined}}" class="nav-link" v-bind:class="{active:!$route.query.stats}">Categories</router-link>
  </li>
  <li class="nav-item">
    <router-link v-bind:to="{...$route, query:{...$route.query, stats: 'courbe'}}" class="nav-link">Courbe</router-link>
  </li>
</ul>
<CategoryStats v-if="!$route.query.stats" />
  </div>
</template>
<script
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CategoryStats from "./categoryStats.vue";

@Component({
    components: {CategoryStats}
})
export default class Stats extends Vue {

};
</script>