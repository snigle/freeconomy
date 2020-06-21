<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
}
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-1">
        <button class="btn btn-light" v-on:click="$refs.PeriodInput.previousRange()">
          <span class="material-icons">navigate_before</span>
        </button>
      </div>
      <h3
        class="col"
      >{{$t($t.keys.common.totalPeriod)}}: {{displayPrice(income + outcome)}} {{currency.Symbol}}</h3>
      <div class="col-xs-1">
        <button class="btn btn-light" v-on:click="$refs.PeriodInput.nextRange()">
          <span class="material-icons">navigate_next</span>
        </button>
      </div>
    </div>
    <PeriodInput
      ref="PeriodInput"
      v-bind:periods="periods"
      v-bind:from="dateFrom"
      v-bind:to="dateTo"
      v-on:input="updatePeriod($event)"
    />
    <div class="list-group">
      <router-link
        v-for="line in stats"
        v-bind:key="line.Category.UUID"
        class="list-group-item list-group-item-action"
        :to="line.Link"
      >
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
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Location } from "vue-router";
import Component from "vue-class-component";
import store from "./store";
import { ICategory, displayPrice } from "../lib/types";
import Transactions, { ILine } from "./transactions.vue";
import PeriodInput from "../components/periodInput.vue";
import _ from "lodash";
import moment from "moment";

export interface ICategoryStats {
  Category: ICategory;
  Link: Location;
  Total: number;
  Percent: number;
}
interface IRange {
  label: string;
  from: Date;
  to: Date;
}

@Component({ methods: { displayPrice }, components: { PeriodInput } })
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

  get queryDateFrom(): string {
    return moment(this.dateFrom).format("YYYY-MM-DD");
  }
  get queryDateTo(): string {
    return moment(this.dateTo).format("YYYY-MM-DD");
  }

  updatePeriod({ from, to }: { from: Date; to: Date }) {
    this.dateFrom = from;
    this.dateTo = to;
    this.$router.replace({
      name: this.$route.name || "",
      query: {
        ...this.$route.query,
        statsBeginDate: moment(this.dateFrom).format("YYYY-MM-DD"),
        statsEndDate: moment(this.dateTo).format("YYYY-MM-DD"),
        transactionFrom: this.queryDateFrom,
        transactionTo: this.queryDateTo
      }
    });
  }

  created() {
    this.dateFrom = this.$route.query.statsBeginDate
      ? moment(this.$route.query.statsBeginDate as string).toDate()
      : this.periods[0].from;
    this.dateTo = this.$route.query.statsEndDate
      ? moment(this.$route.query.statsEndDate as string).toDate()
      : this.periods[0].to;
    this.$emit("title", this.title);
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
        Percent: 100,
        Link: {
          name: "transactions",
          query: {
            ...this.$route.query,
            category: group[0].Category.UUID,
            description: undefined,
            transactionFrom: this.queryDateFrom,
            transactionTo: this.queryDateTo
          }
        }
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