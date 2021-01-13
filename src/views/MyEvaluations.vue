<template>
  <div class="card">
    <div class="card-header"><h5>Minhas recomendações avaliadas</h5></div>
    <div class="card-body">
      <div v-if="loading" class="text-center">
        <span
          class="spinner-border spinner-border align-middle"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="font-weight-bold align-middle ml-2">Loading...</span>
      </div>

      <div
        id="accordion"
        v-for="(recommendation, index) in recommendations"
        :key="index"
      >
        <div
          class="card mb-1"
          v-for="recommendationByDate in recommendation.recommendationsByDate"
          :key="recommendationByDate.id"
        >
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Collapsible Group Item #1
              </button>
            </h5>
          </div>
          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div class="card-body">
              <div class="media">
                <img
                  :src="recommendationByDate.tweet.profileImage"
                  class="mr-3 rounded-circle"
                  :alt="recommendationByDate.tweet.whoPosted"
                />
                <div class="media-body">
                  <h5>{{ recommendationByDate.tweet.whoPosted }}</h5>
                  <div>
                    <button
                      v-for="rating in recommendationByDate.ratings"
                      :key="rating.id"
                      type="button"
                      class="btn btn-sm"
                    >
                      <i
                        :class="{
                          'far fa-star': !rating.selected,
                          'fas fa-star': rating.selected,
                        }"
                        class="text-warning"
                      ></i>
                    </button>
                    <span class="font-weight-bold align-middle"
                      >Evaluated at:
                      {{ recommendationByDate.registrationRating }}</span
                    >
                  </div>
                  <span
                    v-for="annotation in recommendationByDate.tweet
                      .contextAnnotations"
                    :key="annotation.id"
                    class="badge badge-secondary mr-1"
                  >
                    {{ annotation.entity.name }}
                  </span>
                  <p class="text-justify">
                    {{ recommendationByDate.tweet.text }}
                    <span
                      class="btn btn-sm btn-link mr-1"
                      v-for="tag in recommendationByDate.tweet.hashtags"
                      :key="tag.id"
                    >
                      #{{ tag.name }}
                    </span>
                  </p>

                  <div
                    class="media"
                    v-for="(reply, index1) in recommendationByDate.tweet
                      .replies"
                    :key="index1"
                  >
                    <img
                      :src="reply.profileImage"
                      class="mr-3 rounded-circle"
                      alt="..."
                    />
                    <div class="media-body">
                      <h5 class="mt-0">{{ reply.whoPosted }}</h5>
                      <p class="text-justify">
                        {{ reply.text }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-around">
              <span>
                <i class="far fa-heart pr-2"></i
                >{{ recommendationByDate.tweet.totalLikes }}
              </span>
              <span>
                <i class="fas fa-retweet pr-2"></i
                >{{ recommendationByDate.tweet.totalRetweets }}
              </span>
              <span>
                <i class="far fa-comments pr-2"></i
                >{{ recommendationByDate.tweet.totalRepliesWhoPosted }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="recommendations.length == 0">
        <h3>You don't have any recommendations yet</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myRecommendationsComponent",
  data() {
    return {
      recommendations: [],
      message: { info: "", error: [] },
      loading: false,
    };
  },
  methods: {
    getRecommendations() {
      this.loading = true;

      this.$http
        .get(this.$APIUri("/recommendations/my-recommendations"))
        .then((response) => response.json())
        .then((json) => {
          this.recommendations = json.recommendations;

          this.recommendations.forEach((recommendation, indexA) => {
            recommendation.recommendationsByDate.forEach(
              (recommmendationByDate, indexB) => {
                if (recommmendationByDate.rating) {
                  this.$set(recommmendationByDate, "ratings", [
                    { id: 1, selected: recommmendationByDate.rating >= 1 },
                    { id: 2, selected: recommmendationByDate.rating >= 2 },
                    { id: 3, selected: recommmendationByDate.rating >= 3 },
                    { id: 4, selected: recommmendationByDate.rating >= 4 },
                    { id: 5, selected: recommmendationByDate.rating >= 5 },
                  ]);
                } else {
                  this.$set(recommmendationByDate, "ratings", [
                    { id: 1, selected: false },
                    { id: 2, selected: false },
                    { id: 3, selected: false },
                    { id: 4, selected: false },
                    { id: 5, selected: false },
                  ]);
                }
              }
            );
          });
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getRecommendations();
  },
};
</script>
