<template>
  <div>
    <div class="media" v-for="(retweet, index1) in retweets" :key="index1">
      <img :src="retweet.profileImage" class="mr-3 rounded-circle" alt="..." />
      <div class="media-body">
        <h5 class="mt-0">
          {{ retweet.whoPosted.name }}
          <small>
            <a
              class="text-secondary"
              target="_blank"
              v-bind:href="
                'https://twitter.com/' + retweet.whoPosted.screenName
              "
              >&#64;{{ retweet.whoPosted.screenName }}</a
            >
            <span class="text-secondary">
              · {{ retweet.registrationDate }}</span
            >
          </small>
        </h5>

        <p
          class="text-justify"
          v-html="replaceHahsTagsMentionsAndUrls(retweet.text)"
        ></p>
        <div class="mb-3">
          <div class="d-flex justify-content-around">
            <span>
              <i class="far fa-heart pr-2"></i>{{ retweet.totalLikes }}
            </span>
            <span>
              <i class="fas fa-retweet pr-2"></i>{{ retweet.totalRetweets }}
            </span>
            <span>
              <i class="far fa-comments pr-2"></i
              >{{ retweet.totalRepliesWhoPosted }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "retweetMediaComponent",
  props: {
    retweets: Array,
    replaceHahsTagsMentionsAndUrls: Function,
  },
  data() {
    return {};
  },
};
</script>