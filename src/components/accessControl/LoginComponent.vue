<template>
  <div>
    <div
      class="alert alert-dismissible fade show"
      :class="{
        'alert-success': message.info,
        'alert-danger': message.error,
      }"
      v-if="message.info || message.error"
      role="alert"
    >
      <span v-if="message.info">{{ message.info }}</span>
      <span v-if="message.error">{{ message.error }}</span>
      <button type="button" class="close" v-on:click="closeMessage()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="form-group">
      <input
        type="email"
        class="form-control input-ui"
        placeholder="Email"
        v-model="credential.email"
        v-on:blur="checkForm()"
        required
      />
    </div>
    <div class="form-group">
      <div ref="recaptchaElement"></div>
    </div>
    <div class="form-group">
      <button
        type="submit"
        class="btn btn-primary btn-block"
        v-on:click="validateReCaptcha()"
        v-bind:disabled="loading || !credential.email"
      >
        <span v-if="!loading"> Participar </span>
        <span v-if="loading">
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Autenticando...
        </span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      credential: { email: "", tokenRecaptcha: "" },
      message: { error: "", info: "" },
      loading: false,
      formChecked: false,
      recaptchaInstance: {},
    };
  },
  methods: {
    login() {
      this.loading = true;

      this.$http
        .post(this.$APIUri("/users/signup"), this.credential)
        .then((response) => response.json())
        .then((response) => {
          localStorage.setItem("token", response.token);
          window.location.href = "/instructions";
        })
        .catch((response) => response.json())
        .then((message) => {
          this.message.error = message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validateReCaptcha() {
      if (grecaptcha) {
        var response = grecaptcha.getResponse(this.recaptchaInstance);

        if (response.length == 0) {
          this.message.error = "Por favor, marque o reCAPTCHA";
          return;
        }

        this.credential.tokenRecaptcha = response;
        this.login();
      }
    },
    checkForm() {
      this.formChecked = false;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmailValid = emailRegex.test(
        String(this.credential.email).toLowerCase()
      );

      if (!isEmailValid) {
        this.message.error = "Please inform a valid  mail!";
        return false;
      }

      this.formChecked = true;

      return true;
    },
    closeMessage() {
      this.message = { infor: "", error: "" };
    },
  },
  watch: {
    isRecaptchaValid(oldValue, newValue) {
      this.isRecaptchaValid = newValue;
    },
  },
  created() {
    setTimeout(() => {
      if (window.grecaptcha) {
        var recaptchaElement = this.$refs.recaptchaElement;
        this.recaptchaInstance = grecaptcha.render(recaptchaElement, {
          sitekey: "6LcaxygaAAAAAE2lvfVzMW4TqGWpm_7lSa5e5hCW",
        });
      }
    }, 500);
  },
};
</script>
