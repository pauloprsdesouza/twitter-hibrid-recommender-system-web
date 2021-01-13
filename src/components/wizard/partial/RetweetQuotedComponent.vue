<template>
  <div>
    <div class="media">
      <img
        :src="retweetQuoted.tweet.profileImage"
        class="mr-3 rounded-circle"
        alt="..."
      />
      <div class="media-body">
        <div class="mb-2">
          <small class="text-muted font-weight-bold">
            <i class="fas fa-retweet pr-2"></i>
            Retweeted and Quoted by {{ retweetQuoted.quotedBy }}
          </small>
        </div>
        <h5 class="mt-0">
          {{ retweetQuoted.tweet.whoPosted.name }}
          <small>
            <a
              class="text-secondary"
              target="_blank"
              v-bind:href="
                'https://twitter.com/' +
                retweetQuoted.tweet.whoPosted.screenName
              "
              >&#64;{{ retweetQuoted.tweet.whoPosted.screenName }}</a
            >
            <span class="text-secondary">
              · {{ retweetQuoted.tweet.registrationDate }}</span
            >
          </small>
        </h5>

        <p
          class="text-justify"
          v-html="replaceHahsTagsMentionsAndUrls(retweetQuoted.tweet.text)"
        ></p>
        <div class="mb-3">
          <div class="d-flex justify-content-around">
            <span>
              <i class="far fa-heart pr-2"></i
              >{{ retweetQuoted.tweet.totalLikes }}
            </span>
            <span>
              <i class="fas fa-retweet pr-2"></i
              >{{ retweetQuoted.tweet.totalRetweets }}
            </span>
            <span>
              <i class="far fa-comments pr-2"></i
              >{{ retweetQuoted.tweet.totalRepliesWhoPosted }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "retweetQuotedComponent",
  props: {
    retweetQuoted: Object,
    replaceHahsTagsMentionsAndUrls: Function,
  },
  data() {
    return {};
  },
};
</script>