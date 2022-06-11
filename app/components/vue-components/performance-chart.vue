<template>
  <div class="c-chart__container">

    <div class="c-chart__filter">
      <div class="c-chart__start">
        <label for="start">Start date:</label>
        <input type="date" id="start" name="trip-start" min="1950-01-01" v-model="startDate" @input="dateFliter()">
      </div>

      <div class="c-chart__end">
        <label for="end">End date:</label>
        <input type="date" id="end" name="trip-end" min="1950-01-01" v-model="endDate" @input="dateFliter()">
      </div>
    </div>
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import axios from 'axios';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },

  data() {
    return {
      chartData: [],
      chartDataBackup: [],
      startDate: '',
      endDate: ''
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
    },

    xAxisData() {
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    getChartData() {
      axios.get(`https://fe-task.getsandbox.com/performance`)
        .then(res => {
          console.log(res.data)
          this.chartData = [...this.chartData, ...res.data]
          this.chartDataBackup = [...this.chartDataBackup, ...res.data]
        })
    },
    dateFliter() {
      const start_date = new Date(this.startDate).getTime()
      const end_date = new Date(this.endDate).getTime()

      if(start_date && end_date) {
        this.chartData = this.chartDataBackup.filter(item => item.date_ms >= start_date && item.date_ms <= end_date)
      }

    }
  },

  mounted() {
    this.getChartData();
  }
};
</script>
