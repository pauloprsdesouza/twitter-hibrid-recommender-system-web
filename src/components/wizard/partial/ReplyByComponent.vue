<template>
  <div>
    <div class="media mb-4">
      <img :src="reply.tweet.profileImage" class="mr-3 rounded-circle" alt="..." />
      <div class="media-body">
           <div class="mb-2">
          <small class="text-muted font-weight-bold">
            <i class="fas fa-reply pr-2"></i>
            Replied by {{ reply.repliedBy }}
          </small>
        </div>
        <h5 class="mt-0">
          {{ reply.tweet.whoPosted.name }}
          <small>
            <a
              class="text-secondary"
              target="_blank"
              v-bind:href="'https://twitter.com/' + reply.tweet.whoPosted.screenName"
              >&#64;{{ reply.tweet.whoPosted.screenName }}</a
            >
            <span class="text-secondary"> · {{ reply.tweet.registrationDate }}</span>
          </small>
        </h5>
        <p
          class="text-justify"
          v-html="replaceHahsTagsMentionsAndUrls(reply.tweet.text)"
        ></p>

        <div class="mb-3">
          <div class="d-flex justify-content-around">
            <span>
              <i class="far fa-heart pr-2"></i>{{ reply.tweet.totalLikes }}
            </span>
            <span>
              <i class="fas fa-retweet pr-2"></i>{{ reply.tweet.totalRetweets }}
            </span>
            <span>
              <i class="far fa-comments pr-2"></i
              >{{ reply.tweet.totalRepliesWhoPosted }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "replydByComponent",
  props: {
    reply: Object,
    replaceHahsTagsMentionsAndUrls: Function,
  },
  data() {
    return {};
  },
};
</script>