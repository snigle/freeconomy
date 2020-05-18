<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 10px;
}
</style>
<template>
  <div>
    <div class="row">
      <div class="col-sm-1">
        <button class="btn btn-light" v-on:click="previousRange()">
          <span class="material-icons">navigate_before</span>
        </button>
      </div>
      <h3
        class="col"
      >{{$t($t.keys.common.total)}} {{income}} - {{Math.abs(outcome)}} = {{displayPrice(income + outcome)}} {{currency.Symbol}}</h3>
      <div class="col-sm-1">
        <button class="btn btn-light" v-on:click="nextRange()">
          <span class="material-icons">navigate_next</span>
        </button>
      </div>
    </div>
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
    <div class="list-group">
      <div v-for="line in stats" v-bind:key="line.Category.UUID" class="list-group-item">
        <div class="container">
          <div class="row">
            <div class="icon-md" v-bind:style="{backgroundColor: line.Category.Icon.Color}">
              <span class="material-icons">{{$iconMap(line.Category.Icon.Name)}}</span>
            </div>
            <div class="col">
              <div>{{line.Category.Name}}: {{line.Total}} {{currency.Symbol}}</div>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  v-bind:style="{width: `${line.Percent}%`}"
                  v-bind:class="line.Total > 0? 'bg-success' : 'bg-danger'"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
import { ICategory, displayPrice } from "../lib/types";
import Transactions, { ILine } from "./transactions.vue";
import _ from "lodash";
import moment from "moment";

interface ICategoryStats {
  Category: ICategory;
  Total: number;
  Percent: number;
}
interface IRange {
  label: string;
  from: Date;
  to: Date;
}

@Component({ methods: { displayPrice } })
export default class CategoryStats extends Transactions {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  periods = [
    {
      label: this.$t(this.$t.keys.reportPie.thisMonth),
      from: moment()
        .startOf("month")
        .toDate(),
      to: moment()
        .startOf("month")
        .add(1, "month")
        .toDate()
    },
    {
      label: this.$t(this.$t.keys.reportPie.lastMonth),
      from: moment()
        .startOf("month")
        .add(-1, "month")
        .toDate(),
      to: moment()
        .startOf("month")
        .toDate()
    },
    {
      label: this.$t(this.$t.keys.reportPie.thisYear),
      from: moment()
        .startOf("year")
        .toDate(),
      to: moment()
        .startOf("year")
        .add(1, "year")
        .toDate()
    },
    {
      label: this.$t(this.$t.keys.reportPie.lastYear),
      from: moment()
        .startOf("year")
        .add(-1, "year")
        .toDate(),
      to: moment()
        .startOf("year")
        .toDate()
    }
  ];

  custom = {
    label: this.$t(this.$t.keys.reportPie.customRange),
    from: this.dateFrom,
    to: this.dateTo
  };

  setDateFrom(d: Date) {
    this.dateFrom = d;
    this.custom.from = d;
  }

  setDateTo(d: Date) {
    this.dateTo = d;
    this.custom.to = d;
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
  }

  created() {
    this.dateFrom = this.periods[0].from;
    this.dateTo = this.periods[0].to;
  }

  get fromDateString(): string {
    return moment(this.dateFrom).format("YYYY-MM-DD");
  }

  get timeRange(): IRange {
    let resp = _.find(
      this.periods,
      p => p.from === this.dateFrom && p.to === this.dateTo
    );
    if (!resp) {
      resp = this.custom;
    }
    return resp as IRange;
  }

  get toDateString(): string {
    return moment(this.dateTo).format("YYYY-MM-DD");
  }

  get linesFrom(): Array<ILine> {
    return this.lines.filter(l => {
      const date = moment(l.Date);
      return (
        date.isSameOrAfter(this.dateFrom) && date.isSameOrBefore(this.dateTo)
      );
    });
  }

  get incomeLines(): Array<ILine> {
    return this.linesFrom.filter(l => l.Price > 0);
  }

  get outcomeLines(): Array<ILine> {
    return this.linesFrom.filter(l => l.Price < 0);
  }

  get stats(): Array<ICategoryStats> {
    if (!this.linesFrom.length) {
      return [];
    }
    const groups = _(this.linesFrom)
      .groupBy(l => l.Category.UUID)
      .values()
      .map(group => ({
        Category: group[0].Category,
        Total: displayPrice(_.sumBy(group, g => g.Price)),
        Percent: 100
      }))
      .sortBy(g => Math.abs(g.Total))
      .reverse()
      .value();
    const max = groups[0].Total;
    _.forEach(groups, g => (g.Percent = Math.abs(g.Total / max) * 100));
    return groups;
  }

  get income(): number {
    return displayPrice(_.sumBy(this.incomeLines, g => g.Price));
  }
  get outcome(): number {
    return displayPrice(_.sumBy(this.outcomeLines, g => g.Price));
  }
}
</script>