<style lang="scss" scoped>
h3 {
  text-align:center;
}
</style>
<template>
  <div>
    <div class="row">
      <div class="col-sm-1">
        <button class="btn btn-light" v-on:click="$refs.PeriodInput.previousRange()">
          <span class="material-icons">navigate_before</span>
        </button>
      </div>
      <h3
        class="col"
      >{{$t($t.keys.common.totalPeriod)}}: {{totalPeriod}} {{currency.Symbol}}</h3>
      <div class="col-sm-1">
        <button class="btn btn-light" v-on:click="$refs.PeriodInput.nextRange()">
          <span class="material-icons">navigate_next</span>
        </button>
      </div>
    </div>
    <PeriodInput ref="PeriodInput" v-bind:periods="periods" v-bind:from="dateFrom" v-bind:to="dateTo" v-on:input="updatePeriod($event)"/>
    <canvas id="incomeChart"></canvas>
    <canvas id="balanceChart"></canvas>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Chart from "chart.js";
import Component from "vue-class-component";
import Transactions, {ILine} from "./transactions.vue";
import PeriodInput from "../components/periodInput.vue"
import store from "./store";
import moment from "moment";
import _ from "lodash";
import { displayPrice } from "../lib/types";

@Component({
  watch: { linesFrom: "watchLines" },
  components:{PeriodInput},
})
export default class chartStats extends Transactions {
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  periods = [
    {
      label: this.$t(this.$t.keys.balanceReport.last6months),
      from: moment()
        .startOf("month")
        .add(-6,"month")
        .toDate(),
      to: moment()
        .startOf("month")
        .add(1, "month")
        .toDate()
    },
    {
      label: this.$t(this.$t.keys.balanceReport.last2Years),
      from: moment()
        .startOf("year")
        .add(-2, "year")
        .toDate(),
      to: moment()
        .startOf("month")
        .add(1, "month")
        .toDate()
    },
    {
      label: this.$t(this.$t.keys.reportPie.all),
      from: moment(0)
        .toDate(),
      to: moment()
        .startOf("year")
        .add(1, "year")
        .toDate()
    },
  ];


  updatePeriod({from, to}: {from:Date, to:Date}) {
    this.dateFrom = from;
    this.dateTo = to;
    this.$router.replace({
      name: this.$route.name || "",
      query: {
        ...this.$route.query,
        statsBeginDate: moment(this.dateFrom).format("YYYY-MM-DD"),
        statsEndDate: moment(this.dateTo).format("YYYY-MM-DD")
      }
    });
  }

  created() {
    this.dateFrom = this.$route.query.statsBeginDate
      ? moment(this.$route.query.statsBeginDate as string).toDate()
      : this.periods[2].from;
    this.dateTo = this.$route.query.statsEndDate
      ? moment(this.$route.query.statsEndDate as string).toDate()
      : this.periods[2].to;
  }

  incomeChart?: Chart;
  balanceChart?: Chart;

  get linesFrom(): Array<ILine> {
    return this.lines.filter(l => {
      const date = moment(l.Date);
      return (
        date.isSameOrAfter(this.dateFrom) && date.isSameOrBefore(this.dateTo)
      );
    });
  }

  get totalPeriod(): number {
    return displayPrice(_.sumBy(this.lines, l => l.Price));
  }

  watchLines() {
    const groupByMonth = _(this.linesFrom)
      .groupBy(l =>
        moment(l.Date)
          .startOf("month")
          .unix()
      )
      .values()
      .map(group => ({
        Month: moment(group[0].Date).format("MMM (YY)"),
        Income: _.sum(group.map(l => l.Price).filter(l => l > 0)),
        Outcome: _.sum(group.map(l => l.Price).filter(l => l < 0)),
        TotalPrice: 0
      }))
      .value();

    let totalPrice = _.sumBy(this.wallets, w => w.Solde);
    _.forEach(groupByMonth, l => {
      totalPrice += l.Income + l.Outcome;
      l.TotalPrice = totalPrice;
    });

    this.incomeChart?.destroy();
    this.incomeChart = new Chart("incomeChart", {
      type: "line",
      data: {
        labels: groupByMonth.map(l => l.Month),
        datasets: [
          {
            label: this.$t(this.$t.keys.common.outcome),
            data: groupByMonth.map(l => displayPrice(Math.abs(l.Outcome))),
            borderWidth: 1,
            backgroundColor: ["rgba(255, 193, 7, 0.2)"],
            borderColor: ["rgba(255, 193, 7, 1)"]
          },
          {
            label: this.$t(this.$t.keys.common.income),
            data: groupByMonth.map(l => displayPrice(l.Income)),
            borderWidth: 1,
            backgroundColor: ["rgba(40, 167, 69, 0.2)"],
            borderColor: ["rgba(40, 167, 6, 1)"]
          }
        ]
      }
    });

    this.balanceChart?.destroy();
    this.balanceChart = new Chart("balanceChart", {
      type: "line",
      data: {
        labels: groupByMonth.map(l => l.Month),
        datasets: [
          {
            label: this.$t(this.$t.keys.common.total),
            data: groupByMonth.map(l => displayPrice(l.TotalPrice)),
            borderWidth: 1,
            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"]
          }
        ]
      }
    });
  }
  mounted() {
    this.watchLines();
  }
}
</script>