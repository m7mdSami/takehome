import Vue from 'vue';
import * as Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chartData: [],
    chartDataBackup: [],
  },
  mutations: {
    GET_CHARTDATA(state, payload) {
      state.chartData = payload;
      state.chartDataBackup = payload;
    },
  },
  actions: {
    getChartData(context) {
      axios.get('https://fe-task.getsandbox.com/performance')
        .then(res => {
          context.commit('GET_CHARTDATA', res.data);
        });
    },
    filterChartData(context, payload) {
      const startDate = new Date(payload.startDate).getTime();
      const endDate = new Date(payload.endDate).getTime();

      if (startDate && endDate) {
        const chartData = context.state.chartDataBackup.filter(
          (item) => item.date_ms >= startDate && item.date_ms <= endDate
        );
        console.log(chartData);
        context.commit('GET_CHARTDATA', chartData);
      }
    },
  },
});
