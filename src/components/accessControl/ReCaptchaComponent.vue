<template>
  <div>
    <div ref="recaptchaElement"></div>
    <button class="btn btn-success" v-on:click="validate()">Teste</button>
  </div>
</template>
<script>
export default {
  name: "ReCaptchaComponent",
  props: { recaptchaInstance: Object },
  data() {
    return {};
  },
  methods: {},
  watch: {
    recaptchaInstance: function (el) {
      console.info(el);
    },
  },
  mounted() {
    if (window.grecaptcha) {
      var recaptchaElement = this.$refs.recaptchaElement;
      this.recaptchaInstance = grecaptcha.render(recaptchaElement, {
        sitekey: "6LcaxygaAAAAAE2lvfVzMW4TqGWpm_7lSa5e5hCW",
      });
    }
  },
};
</script>