<template>
    <div v-bind:class="alertClass" role="alert">
              <slot></slot>
              <button
                type="button"
                class="close"
                v-on:click="$emit('close')"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { login } from "../lib/oauth";
import store from "../appVue/store";
import { GoogleSync } from "../lib/sync";
@Component({})
export default class Alert extends Vue {
    type: 'danger' | 'success' = "danger";
    
    get alertClass() : any {
        return ["alert", `alert-${this.type}`].join(" ");
    }
}
</script>