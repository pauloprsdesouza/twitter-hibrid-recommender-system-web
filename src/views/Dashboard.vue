<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-header">Resumo do Banco de Dados</div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Descrição</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Total de Participantes</th>
                  <td>{{ dataSummary.totalUsers }}</td>
                </tr>
                <tr>
                  <th scope="row">Total de Recomendações</th>
                  <td>{{ dataSummary.totalRecommendations }}</td>
                </tr>
                <tr>
                  <th scope="row">Total de Tweets</th>
                  <td>{{ dataSummary.totalTweets }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Métricas utilizadas</div>
      <div class="card-body">
        <div class="mb-5">
          <ul class="list-group">
            <li class="list-group-item active">Legenda</li>
            <li class="list-group-item">
              <strong>SC - Social Capital</strong>
            </li>
            <li class="list-group-item">
              <strong>SCSA - Social Capital with Sentiment Analysis</strong>
            </li>
            <li class="list-group-item">
              <strong>CS - Cosine Similarity</strong>
            </li>
            <li class="list-group-item"><strong>BA - Baseline 01</strong></li>
          </ul>
        </div>
        <div class="row mb-5">
          <chart-component
            class="col"
            :labels="labels"
            :typeChart="'bar'"
            :datasets="datasetsMAP"
            :title="'Mean Average Precision (MAP)'"
            :loading="loading"
            :legend="false"
          ></chart-component>
          <chart-component
            class="col"
            :labels="labels"
            :typeChart="'bar'"
            :datasets="datasetsMRR"
            :title="'Mean Reciprocal Rank (MRR)'"
            :loading="loading"
            :legend="false"
          ></chart-component>
        </div>
        <div class="row mb-5">
          <chart-component
            class="col"
            :labels="labelsPrecision"
            :typeChart="'line'"
            :datasets="datasetsPrecision"
            :title="'Precision@10'"
            :loading="loading"
            :legend="true"
          ></chart-component>
          <chart-component
            class="col"
            :labels="labels"
            :datasets="datasetsSPS"
            :typeChart="'bar'"
            :title="'Spearman\'s Correlation'"
            :loading="loading"
            :legend="false"
          ></chart-component>
        </div>
        <div class="row">
          <chart-component
            line-chart-component
            class="col"
            :labels="[1, 2, 3, 4, 5]"
            :typeChart="'bar'"
            :datasets="datasetsByRating"
            :title="'Ratings Frequency'"
            :loading="loading"
            :legend="true"
          ></chart-component>
          <chart-component
            class="col"
            :typeChart="'bar'"
            :labels="labels"
            :datasets="datasetsNDCG"
            :title="'Normalized Discounted cumulative gain (DCG)'"
            :loading="loading"
            :legend="false"
          ></chart-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartComponent from "@/components/dashboardResults/ChartComponent.vue";
import LineChartComponent from "@/components/dashboardResults/LineChartComponent.vue";
export default {
  data() {
    return {
      labelsPrecision: [
        "P@1",
        "P@2",
        "P@3",
        "P@4",
        "P@5",
        "P@6",
        "P@7",
        "P@8",
        "P@9",
        "P@10",
      ],
      labels: [],
      datasetsMAP: [],
      datasetsMRR: [],
      datasetsSPS: [],
      datasetsNDCG: [],
      datasetsPrecision: [],
      datasetsByRating: [],
      loading: false,
      dataSummary: {},
    };
  },
  components: {
    ChartComponent,
    LineChartComponent,
  },
  methods: {
    generateResults() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/evaluations/generate"))
        .then((response) => response.json())
        .then((json) => {
          this.datasetsByRating = json.resultsByRatings;
          this.labels = json.labels;
          this.datasetsNDCG.push(json.ndcg);
          this.datasetsSPS.push(json.sps);
          this.datasetsMAP.push(json.map);
          this.datasetsMRR.push(json.mrr);
          this.datasetsPrecision = json.precision;
          this.dataSummary = json.dataSummary;
        })
        .catch((response) => response.json())
        .then((response) => {})
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.generateResults();
  },
};
</script>