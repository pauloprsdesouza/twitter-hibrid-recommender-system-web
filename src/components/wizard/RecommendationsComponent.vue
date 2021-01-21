<template>
  <div ref="twitterWjs">
    <div
      style="background-color: #ffffff"
      v-for="(recommendation, index) in recommendations"
      :key="index"
      class="card card-shadow card-tweet-timeline"
    >
      <div class="card-body text-center">
        <span
          class="float-left text-muted mb-4"
          v-if="recommendation.retweetedBy"
          >Retuitado por

          {{ recommendation.retweetedBy.name
          }}<a
            :href="
              'https://twitter.com/' + recommendation.retweetedBy.screenName
            "
            target="_blank"
            >&nbsp;@{{ recommendation.retweetedBy.screenName }}</a
          ></span
        >
        <div
          :id="'teste' + recommendation.idTweet"
          :tweetID="recommendation.idTweet"
        ></div>
      </div>
      <div class="card-footer card-footer-dark-gray">
        <div style="font-size: 13pt">
          Quão relevante esta recomendação é para você?
          <div class="button-group text-center">
            <button
              v-for="rating in recommendation.ratings"
              :key="rating.id"
              type="button"
              class="btn btn"
              v-on:click="selectRatings(recommendation, rating)"
            >
              <i
                :class="{
                  'far fa-star fa-lg': !rating.selected,
                  'fas fa-star fa-lg': rating.selected,
                }"
                class="text-warning"
              ></i>
            </button>
            <i
              class="fas fa-spinner fa-pulse text-light align-middle"
              v-if="recommendation.updatingRating"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendationComponent",
  props: {
    recommendations: Array,
  },
  data() {
    return {
      message: { error: "", info: "" },
    };
  },
  methods: {
    selectRatings(recommendation, rating) {
      var ratings = recommendation.ratings;

      if (!rating.selected) {
        for (var i = 0; i < rating.id; i++) {
          ratings[i].selected = true;
        }
        this.$set(recommendation, "evaluated", true);
      } else {
        for (var i = 5; i > rating.id; i--) {
          ratings[i - 1].selected = false;
        }

        if (rating.id == 1) {
          ratings[0].selected = false;
          this.$set(recommendation, "evaluated", false);
        }
      }

      this.updateRating(recommendation, rating);
      this.$parent.checkEvaluatedRecommendations();
    },
    updateRating(recommendation, rating) {
      recommendation.updatingRating = true;

      this.$http
        .post(this.$APIUri("/recommendations/update-rating"), {
          idRecommendation: recommendation.idRecommendation,
          idTweet: recommendation.idTweet,
          rating: rating.selected ? rating.id : null,
        })
        .then(() => {})
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {
          recommendation.updatingRating = false;
        });
    },
    createTweets() {
      var index = 0;

      this.$nextTick(() => {
        this.recommendations.forEach((recommendation, index) => {
          var tweet = document.getElementById("teste" + recommendation.idTweet);
          var id = tweet.getAttribute("tweetID");
          twttr.widgets.createTweet(id, tweet, {
            //width: 550,
          });
        });
      });

      twttr.widgets.load(this.$refs.twitterWjs);
    },
  },
};
</script>