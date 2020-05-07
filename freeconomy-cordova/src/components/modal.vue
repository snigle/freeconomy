<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal modal show"
      id="modal"
      tabindex="-1"
      role="dialog"
      v-bind:style="{display:'block'}"
      v-on:click="backdropClick()"
    >
      <div class="modal-dialog modal-lg" role="document" v-on:click.stop.prevent="() => {}">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header"></slot>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import $ from "jquery";

@Component({})
export default class Modali extends Vue {
  backdropClick() {
    this.$emit("backdropClick");
  }
  close() {
    this.$emit("close");
  }
}
</script>