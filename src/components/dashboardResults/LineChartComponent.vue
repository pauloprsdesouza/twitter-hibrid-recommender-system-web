<template>
  <div>
    <canvas ref="lineChartComponent" width="400" height="400"></canvas>
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
  },
  methods: {
    createChart() {
      var ctx = this.$refs.lineChartComponent.getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [1, 2],
          datasets: [
            {
              label: "ok",
              data: [10, 20],
              backgroundColor: [
                pattern.draw("square", "#ff6384"),
                pattern.draw("circle", "#36a2eb"),
              ],
              errorBars: {
                10: { plus: 15, minus: -15 },
                20: { plus: 25, minus: -25 },
              },
            },
          ],
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