<template>
  <div>
    <div class="form-group">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          id="repeat"
          v-model="repeat"
          aria-describedby="repeatHelp"
        />
        <label class="form-check-label" for="repeat">{{$t($t.keys.repeatInput.recurrenceCheckbox)}}</label>
        <small id="repeatHelp" class="form-text text-muted">{{$t($t.keys.repeatInput.repeatHelp)}}</small>
      </div>
    </div>

    <div v-if="repeat">
      <div class="form-group">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <label for="duration" v-bind:style="{margin:0}">{{$t($t.keys.repeatInput.repeat)}}</label>
          </div>
          <div class="col-auto">
            <input
              class="form-control sm-2"
              keyboardType="number-pad"
              type="number"
              id="duration"
              v-model.number="duration"
            />
          </div>
          <div class="col-auto">
            <select class="form-control sm-2" v-model="durationType">
              <option value="day">{{$t($t.keys.repeatInput.durations.day)}}</option>
              <option value="week">{{$t($t.keys.repeatInput.durations.week)}}</option>
              <option value="month">{{$t($t.keys.repeatInput.durations.month)}}</option>
              <option value="year">{{$t($t.keys.repeatInput.durations.year)}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="infinite" v-model="infinite" />
          <label class="form-check-label" for="infinite">{{$t($t.keys.repeatInput.infinite)}}</label>
        </div>
      </div>

      <div class="form-group" v-if="!infinite">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <label for="during" v-bind:style="{margin:0}">{{$t($t.keys.repeatInput.during)}}</label>
          </div>
          <div class="col-auto">
            <input
              type="number"
              class="form-control"
              id="during"
              keyboardType="number-pad"
              v-model.number="during"
            />
          </div>
          <div class="col-auto">{{$t($t.keys.repeatInput.durations[durationType])}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { login } from "../lib/oauth";
import store from "../appVue/store";
import { IRepeat } from "../lib/types";

@Component({
  watch: {
    repeatInput: "onChange",
  },
  props: ["value"]
})
export default class RepeatInput extends Vue {
  readonly value!: IRepeat | null;
  repeat: boolean = false;
  duration: number = 1;
  durationType: "day" | "week" | "month" | "year" = "month";
  infinite = true;
  during: number = 1;

  get repeatInput(): IRepeat | null {
    if (!this.repeat) {
      return null;
    }

    return {
      DurationType: this.durationType,
      Duration: this.duration,
      MaxOccurrence: this.infinite ? -1 : this.during
    };
  }

  created() {
    if (!this.value) {
      this.repeat = false;
      return;
    }
    this.repeat = true;
    this.durationType = this.value.DurationType;
    this.duration = this.value.Duration;

    if (this.value.MaxOccurrence == -1) {
      this.infinite = true;
      return;
    }
    this.infinite = false;
    this.during = this.value.MaxOccurrence;
  }

  onChange() {
    this.$emit("input", this.repeatInput);
  }
}
</script>