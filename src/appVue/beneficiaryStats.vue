<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "./store";
import { ICategory, displayPrice } from "../lib/types";
import Transactions, { ILine } from "./transactions.vue";
import CategoryStats from "./categoryStats.vue";

import _ from "lodash";
import moment from "moment";

interface ICategoryStats {
  Category: ICategory;
  Total: number;
  Percent: number;
}

@Component({ methods: { displayPrice } })
export default class BeneficiaryStats extends CategoryStats {

  get stats(): Array<ICategoryStats> {
    if (!this.linesFrom.length) {
      return [];
    }
    const groups = _(this.linesFrom)
      .groupBy(l => l.Description.toLowerCase())
      .values()
      .map(group => ({
        Category: { ...group[0].Category, Name: group[0].Description, UUID: group[0].UUID},
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

  created() {
    this.$emit("title", this.title);
  }

}
</script>