<template>
  <div>
    <canvas ref="chartComponent" width="400" height="400"></canvas>
  </div>
</template>
<script>
export default {
  props: {
    labels: Array,
    datasets: Array,
    title: String,
    loading: Boolean,
    legend: Boolean,
    title: String,
    typeChart: String,
  },
  methods: {
    createChart() {
      Chart.defaults.global.defaultFontSize = 18;
      var ctx = this.$refs.chartComponent.getContext("2d");
      var myChart = new Chart(ctx, {
        type: this.typeChart,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            display: this.legend,
          },
          title: {
            display: true,
            text: this.title,
          },
        },
      });
    },
  },
  watch: {
    loading: function (loading) {
      if (!loading) {
        this.createChart();
      }
    },
  },
};
</script>