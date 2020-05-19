<template>
    <div class="form-row">
      <div class="form-group col-sm-4">
        <label for="timeRange">{{$t($t.keys.common.timeRange)}}</label>
        <select
          class="form-control"
          id="timeRange"
          v-bind:value="timeRange.label"
          v-on:change="setTimeRange($event.target.value)"
        >
          <option
            v-for="timeRange in periods"
            v-bind:key="timeRange.label"
            v-bind:value="timeRange.label"
          >{{timeRange.label}}</option>
          <option v-bind:value="custom.label">{{custom.label}}</option>
        </select>
      </div>
      <div class="form-group col-sm-4">
        <label for="begin">{{$t($t.keys.stats.begin)}}</label>
        <input
          type="date"
          class="form-control"
          id="begin"
          v-bind:value="fromDateString"
          v-on:input="setDateFrom(new Date($event.target.value))"
        />
      </div>
      <div class="form-group col-sm-4">
        <label for="end">{{$t($t.keys.stats.end)}}</label>
        <input
          type="date"
          class="form-control"
          id="end"
          v-bind:value="toDateString"
          v-on:input="setDateTo(new Date($event.target.value))"
        />
      </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "../appVue/store";
import moment from "moment";
import _ from "lodash";

interface IRange {
  label: string;
  from: Date;
  to: Date;
}

@Component({props:["periods", "from", "to"]})
export default class PeriodInput extends Vue {
    from!: Date;
    to!: Date;
  periods! : Array<{
      label: string;
      from: Date;
      to: Date;
    }>

dateFrom = new Date();
  dateTo= new Date();

  custom = {
    label: this.$t(this.$t.keys.reportPie.customRange),
    from: this.dateFrom,
    to: this.dateTo
  };

  created() {
      this.dateFrom = this.from;
      this.dateTo = this.to;
  }

  setDateFrom(d: Date) {
    this.dateFrom = d;
    this.custom.from = d;
    this.emitChange();
  }

  emitChange() {
    this.$emit("input", {from: this.dateFrom, to: this.dateTo})
  }

  setDateTo(d: Date) {
    this.dateTo = d;
    this.custom.to = d;
    this.emitChange();
  }

  previousRange() {
    const from = moment(this.dateFrom);
    const to = moment(this.dateTo);
    if (from.date() === to.date()) {
      this.dateFrom = moment(this.dateFrom)
        .add(from.diff(to, "month"), "month")
        .toDate();
    } else {
      this.dateFrom = moment(this.dateFrom)
        .add(from.diff(to))
        .toDate();
    }
    this.dateTo = from.toDate();
    this.emitChange();
  }

  nextRange() {
    const from = moment(this.dateFrom);
    const to = moment(this.dateTo);
    if (from.date() === to.date()) {
      this.dateTo = moment(this.dateTo)
        .add(to.diff(from, "month"), "month")
        .toDate();
    } else {
      this.dateFrom = moment(this.dateTo)
        .add(to.diff(from))
        .toDate();
    }
    this.dateFrom = to.toDate();
    this.emitChange();
  }

  setTimeRange(label: string) {
    const range = _.find(this.periods, p => p.label === label);
    if (range) {
      this.dateFrom = range.from;
      this.dateTo = range.to;
    } else {
      this.dateFrom = this.custom.from;
      this.dateTo = this.custom.to;
    }
    this.emitChange();
  }

  get fromDateString(): string {
    return moment(this.dateFrom).format("YYYY-MM-DD");
  }

  get timeRange(): IRange {
    let resp = _.find(
      this.periods,
      p =>
        p.from.getTime() === this.dateFrom.getTime() &&
        p.to.getTime() === this.dateTo.getTime()
    );
    if (!resp) {
      resp = this.custom;
    }
    return resp as IRange;
  }

  get toDateString(): string {
    return moment(this.dateTo).format("YYYY-MM-DD");
  }
}
</script>