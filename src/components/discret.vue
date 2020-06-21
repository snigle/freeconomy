<template>
    <span v-if="$store.state.settings.discretMode">***</span>
    <span v-else><slot /></span>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "../appVue/store";
@Component({})
export default class Discret extends Vue {
}

export const discret = (total: number): string => store.state.settings.discretMode ? "***" : `${total}`;
</script>