<style lang="scss" scoped>
.fab {
  z-index: 2;
}
.mdc-fab {
  margin-top: 10px;
}
</style>
<template>
  <div ref="fab" class="float-right fab">
    <div class="actions" :hidden="!displayActions">
      <div v-for="action in actions" :key="action.label">
        <button
          class="mdc-fab mdc-fab--absolute"
          data-toggle="tooltip"
          data-placement="left"
          :data-trigger="actions.length === 1? 'hover focus' : 'manual'"
          :title="action.label"
          :class="action.class"
        >
          <span
            class="material-icons mdc-fab__icon"
            v-on:click.prevent.stop="click(action)"
          >{{action.icon}}</span>
        </button>
      </div>
    </div>

    <button
      class="mdc-fab mdc-fab--absolute"
      v-if="actions.length !== 1"
      v-on:click="toggleActions"
      v-on-clickaway="clickAway"
    >
      <span class="material-icons mdc-fab__icon">more_vert</span>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import $ from "jquery";
import { mixin as clickaway } from "vue-clickaway";

export interface IAction {
  click: () => void;
  label: string;
  icon: string;
  class?: string;
}

@Component({
  props: ["actions"],
  mixins: [clickaway]
})
export default class Fab extends Vue {
  actions!: Array<IAction>;
  displayActions = false;

  created() {
    if (this.actions.length === 1) {
      this.displayActions = true;
    }
  }

  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
    const fabElement = this.$refs["fab"] as Element;
    const position = fabElement.getBoundingClientRect();
    console.log("position", position);
    (fabElement as any).style.position = "fixed";
    (fabElement as any).style.bottom = "15px";
    (fabElement as any).style.left = `${position.left - 15}px`;
  }

  destroyed() {
    // Will remove all tooltip :/
    $('.tooltip.show').remove();
  }

  click(action: IAction) {
    if (this.actions.length !== 1) {
      this.clickAway();
    }
    $(this.$refs["fab"])
      .find('[data-toggle="tooltip"]')
      .tooltip("hide");
    action.click();
  }

  clickAway() {
    this.displayActions = false;
    $(this.$refs["fab"])
      .find('[data-toggle="tooltip"]')
      .tooltip("hide");
  }

  toggleActions() {
    this.displayActions = !this.displayActions;
    $(this.$refs["fab"])
      .find('[data-toggle="tooltip"]')
      .tooltip("toggle");
  }
}
</script>