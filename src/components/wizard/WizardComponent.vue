<template>
  <div class="text-center">
    <div class="row">
      <ul class="step d-flex flex-nowrap mb-4">
        <li class="step-item" :class="{ active: tab.index == 0 }">
          <a href="#!">Assunto</a>
        </li>
        <li class="step-item" :class="{ active: tab.index == 1 }">
          <a href="#!">Lista 1</a>
        </li>
        <li class="step-item" :class="{ active: tab.index == 2 }">
          <a href="#!">Lista 2</a>
        </li>
        <li class="step-item" :class="{ active: tab.index == 3 }">
          <a href="#!">Lista 3</a>
        </li>
        <li class="step-item" :class="{ active: tab.index == 4 }">
          <a href="#!">Lista 4</a>
        </li>
        <li class="step-item" :class="{ active: tab.index == 5 }">
          <a href="#!"
            ><i
              class="fas fa-check"
              :class="{ 'text-success': tab.index == 5 }"
            ></i
          ></a>
        </li>
      </ul>
    </div>
    <div
      id="selected-subject"
      v-if="tab.index == 0"
      class="col p-4 card-shadow"
      style="background-color: #ffffff"
    >
      <domain-component
        :domains="domains"
        :is-loading="isLoading"
      ></domain-component>

      <entity-component
        :entities="entitiesByDomain"
        :is-loading="isLoading"
        v-if="selectedEntities.length < 3"
      ></entity-component>
      <div class="mb-5" v-if="selectedEntities.length > 0">
        <h1 class="display-5 lead text-muted">Você selecionou</h1>
        <p>
          <button
            class="btn btn-secondary mr-2 mb-2"
            v-for="entity in selectedEntities"
            :key="entity.id"
            v-on:click="removeSelectedEntity(entity)"
          >
            {{ entity.name }}&nbsp;
            <i class="fas fa-times"></i>
          </button>
        </p>
      </div>

      <div v-if="selectedEntities.length == 3">
        <h1 class="display-5 lead text-muted">Pronto!</h1>
        <p>
          Agora vamos avaliar 4 listas de notícias que serão recomendadas de
          acordo com seus interesses
          <span
            v-for="entity in selectedEntities"
            :key="entity.id"
            class="badge badge-primary mr-2"
          >
            {{ entity.name }}
          </span>
        </p>

        <hr class="my-4" />
        <button
          class="btn btn-primary btn-lg"
          v-on:click="generateRecommendations()"
          v-bind:disabled="isLoading"
        >
          <span v-if="!isLoading"> Vamos lá! </span>
          <span v-if="isLoading">
            Gerando recomendações&nbsp;
            <i class="fas fa-spinner fa-pulse"></i>
          </span>
        </button>
      </div>
    </div>
    <div v-if="tab.index > 0 && tab.index < 5">
      <blockquote class="blockquote mb-4 mt-4 display-7 lead text-muted">
        Avalie essas recomendações que foram geradas para esses três assuntos
        <span
          v-for="entity in selectedEntities"
          :key="entity.id"
          class="badge badge-primary mr-2"
        >
          {{ entity.name }}
        </span>
      </blockquote>
    </div>
    <div id="recommendations">
      <div
        class="card card-shadow card-tweet-timeline"
        v-if="
          tab.index > 0 &&
          tab.index < 5 &&
          recommendations.length == 0 &&
          !isLoading
        "
      >
        <div class="card-body text-center">
          Nenhuma recomendação foi gerada para esta lista
        </div>
      </div>
      <div
        class="card card-shadow card-tweet-timeline"
        v-if="tab.index > 0 && tab.index < 5 && isLoading"
      >
        <div class="card-body text-center">
          <div>
            <span style="font-weight: 700"
              >Estamos processando <i class="fas fa-spinner fa-pulse"></i
            ></span>
          </div>
          <div>
            <span style="font-weight: 400"
              >Agradeço a compreensão. Isso pode levar alguns minutinhos</span
            >
          </div>
          <div>
            <span style="font-weight: 400">Obrigado!</span>
          </div>
        </div>
      </div>
      <div
        v-if="tab.index > 0 && tab.index < 5"
        v-bind:class="{
          'twitter-visibility-visible': isRendered,
          'twitter-visibility-hidden': !isRendered,
        }"
      >
        <recommendations-component
          :recommendations="recommendations"
        ></recommendations-component>
      </div>
      <button
        v-bind:class="{
          'twitter-visibility-visible': !isLoading,
          'twitter-visibility-hidden': isLoading,
        }"
        v-if="tab.index > 0 && tab.index < 4"
        class="btn btn-primary btn-block button-width-widget"
        v-on:click="generateRecommendations()"
        v-bind:disabled="!recommendationsEvaluated"
      >
        <span v-if="!isLoading"> Vamos para a Lista {{ tab.index + 1 }}! </span>
        <span v-if="isLoading">
          Carregando&nbsp;
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </button>
      <button
        v-if="tab.index == 4"
        class="btn btn-primary btn-block button-width-widget"
        v-on:click="acknowledgments()"
        v-bind:disabled="!recommendationsEvaluated"
      >
        <span v-if="!isLoading">Finalizar</span>
        <span v-if="isLoading">
          Carregando&nbsp;
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </button>
    </div>

    <div v-if="tab.index === 5">
      <div class="card card-shadow card-tweet-timeline">
        <div class="card-body text-center">
          <i class="fas fa-check text-success fa-3x mb-4"></i>
          <h1 class="display-5 lead text-primary">
            Experimento Finalizado<br />
            <small class="text-muted"> Muito Obrigado! </small>
          </h1>
          <h1 class="display-5 lead text-primary"></h1>
        </div>
        <div class="card-footer text-right">
          <button
            class="btn btn-outline-secondary"
            v-on:click="finishExperiment()"
            v-bind:disabled="isLoading"
          >
            <span v-if="!isLoading">Fechar e Salvar</span>
            <span v-if="isLoading">
              Estamos salvando...&nbsp;
              <i class="fas fa-spinner fa-pulse"></i>
            </span>
          </button>
          <button class="btn btn-primary" v-on:click="newParticipation()">
            Participar de novo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RecommendationsComponent from "@/components/wizard/RecommendationsComponent.vue";
import DomainComponent from "@/components/wizard/partial/DomainComponent.vue";
import EntityComponent from "@/components/wizard/partial/EntityComponent.vue";
import Vue from "vue";

export default {
  name: "WizardComponent",
  data() {
    return {
      heightTwitter: 0,
      isRendered: false,
      recommendations: [],
      recommendationsEvaluated: false,
      isLoading: false,
      tab: {
        index: 0,
      },
      domains: [],
      entitiesByDomain: [],
      message: { info: "", error: "" },
      selectedEntities: [],
    };
  },
  components: {
    RecommendationsComponent,
    DomainComponent,
    EntityComponent,
  },
  methods: {
    newParticipation() {
      this.isLoading = true;

      this.$http
        .get(this.$APIUri("/recommendations/finished-evaluations"))
        .then(() => {
          this.recommendations = [];
          this.selectedEntities = [];
          this.entitiesByDomain = [];
          this.tab.index = 0;
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          this.isLoading = false;
        });

      this.getAllDomains();
    },
    acknowledgments() {
      this.tab.index++;
    },
    getEntitiesByDomain(domain) {
      this.entitiesByDomain = domain.entities;
    },
    checkEvaluatedRecommendations() {
      this.recommendationsEvaluated = true;

      this.recommendations.forEach((recommendation, id) => {
        if (!recommendation.evaluated) {
          this.recommendationsEvaluated = false;
        }
      });
    },
    clearSelectedEntity() {
      this.selectedEntities = [];
    },
    setSelectedEntity(entity) {
      var index = this.selectedEntities.indexOf(entity);

      if (index < 0 && this.selectedEntities.length < 3) {
        this.selectedEntities.push(entity);
      }

      if (this.selectedEntities.length == 3) {
        this.domains.forEach((domain, index) => {
          domain.selected = false;
          this.$set(domain, "disabled", true);
        });
      }
    },
    removeSelectedEntity(entity) {
      entity.selected = false;

      var index = this.selectedEntities.indexOf(entity);
      this.selectedEntities.splice(index, 1);

      if (this.selectedEntities.length < 3) {
        this.domains.forEach((domain, index) => {
          domain.disabled = false;
        });
      }
    },
    generateRecommendations() {
      this.isRendered = false;
      this.isLoading = true;
      this.tab.index++;

      this.recommendationsEvaluated = false;

      this.recommendations = [];

      var recommendationType = this.getURLRecommendations();

      var idsEntities = [];

      this.selectedEntities.forEach((entity, index) => {
        idsEntities.push(entity.id);
      });

      this.$http
        .post(this.$APIUri("/recommendations/bytype"), {
          idsEntities: idsEntities,
          recommendationType: recommendationType,
        })
        .then((response) => response.json())
        .then((recommendationsJson) => {
          this.recommendations = recommendationsJson;

          if (this.recommendations.length === 0 && this.tab.index < 5) {
            this.recommendationsEvaluated = true;
          }

          this.recommendations.forEach((recommendation, id) => {
            this.$set(recommendation, "updatingRating", false);

            if (recommendation.rating) {
              this.$set(recommendation, "ratings", [
                { id: 1, selected: recommendation.rating >= 1 },
                { id: 2, selected: recommendation.rating >= 2 },
                { id: 3, selected: recommendation.rating >= 3 },
                { id: 4, selected: recommendation.rating >= 4 },
                { id: 5, selected: recommendation.rating >= 5 },
              ]);
            } else {
              this.$set(recommendation, "ratings", [
                { id: 1, selected: false },
                { id: 2, selected: false },
                { id: 3, selected: false },
                { id: 4, selected: false },
                { id: 5, selected: false },
              ]);
            }
          });

          this.$children[0].createTweets();
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          this.scrollToTop();
        });

      var that = this;
      twttr.events.bind("rendered", function (event) {
        that.isRendered = true;
        that.isLoading = false;
      });
    },
    setIsLoading(value) {
      this.isLoading = value;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    finishExperiment() {
      this.isLoading = true;

      this.$http
        .get(this.$APIUri("/recommendations/finished-evaluations"))
        .then(() => {
          window.location.href = "/";
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getURLRecommendations() {
      switch (this.tab.index) {
        case 1:
          return "SC";
        case 2:
          return "SCSA";
        case 3:
          return "CS";
        case 4:
          return "B1";
      }
    },
    getAllDomains() {
      this.isLoading = true;

      this.$http
        .get(this.$APIUri("/domains/all"))
        .then((response) => response.json())
        .then((domains) => {
          this.domains = domains;
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  watch: {
    "window.isRendered": (data) => {
      console.info(data);
    },
  },
  mounted() {
    this.getAllDomains();
  },
};
</script>