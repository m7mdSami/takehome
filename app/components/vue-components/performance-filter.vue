<template>
  <div class="c-chart__filter">
    <div class="c-chart__start">
      <label for="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        min="1950-01-01"
        v-model="startDate"
        @input="dateFilter()"
      />
    </div>

    <div class="c-chart__end">
      <label for="end">End date:</label>
      <input
        type="date"
        id="end"
        name="trip-end"
        min="1950-01-01"
        v-model="endDate"
        @input="dateFilter()"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PerformanceFilterComponent",
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    ...mapActions(["getChartData", "filterChartData"]),
    dateFilter() {
      const startDate = new Date(this.startDate).getTime();
      const endDate = new Date(this.endDate).getTime();

      const filterDate = {
        startDate,
        endDate,
      };

      this.filterChartData(filterDate);
    },
  },
  created() {
    this.getChartData();
  },
};
</script>
