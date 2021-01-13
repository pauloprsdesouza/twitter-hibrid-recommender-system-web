<template>
  <div>
    <div v-for="(reply, index1) in replies" :key="index1">
      <div class="media mb-4">
        <img :src="reply.profileImage" class="mr-3 rounded-circle" alt="..." />
        <div class="media-body">
          <h5 class="mt-0">
            {{ reply.whoPosted.name }}
            <small>
              <a
                class="text-secondary"
                target="_blank"
                v-bind:href="
                  'https://twitter.com/' + reply.whoPosted.screenName
                "
                >&#64;{{ reply.whoPosted.screenName }}</a
              >
              <span class="text-secondary">
                · {{ reply.registrationDate }}</span
              >
            </small>
          </h5>
          <p
            class="text-justify"
            v-html="replaceHahsTagsMentionsAndUrls(reply.text)"
          ></p>

          <div class="mb-3">
            <div class="d-flex justify-content-around">
              <span>
                <i class="far fa-heart pr-2"></i>{{ reply.totalLikes }}
              </span>
              <span>
                <i class="fas fa-retweet pr-2"></i>{{ reply.totalRetweets }}
              </span>
              <span>
                <i class="far fa-comments pr-2"></i
                >{{ reply.totalRepliesWhoPosted }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="reply.replies.length > 0">
        <replied-by-component
          style="clear: both"
          class="clearfix"
          :replies="reply.replies"
          :replace-hahs-tags-mentions-and-urls="replaceHahsTagsMentionsAndUrls"
        ></replied-by-component>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "repliedByComponent",
  props: {
    replies: Array,
    replaceHahsTagsMentionsAndUrls: Function,
  },
  data() {
    return {};
  },
};
</script>