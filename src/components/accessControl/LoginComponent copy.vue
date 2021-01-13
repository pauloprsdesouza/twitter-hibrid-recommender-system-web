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
      <re-captcha-component></re-captcha-component>
      <label>Email</label>
      <input
        :class="{
          'is-valid': formChecked,
          'is-invalid': !formChecked,
        }"
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="credential.email"
        v-on:blur="checkForm()"
        required
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
        :class="{
          'is-valid': credential.password,
          'is-invalid': !credential.password,
        }"
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="credential.password"
        required
      />
    </div>

    <div class="form-group">
      <button
        type="submit"
        class="btn btn-primary btn-block"
        v-on:click="login()"
        v-bind:disabled="loading"
      >
        <span v-if="!loading"> Login </span>
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
  name: "LoginComponentCopy",
  data() {
    return {
      credential: { email: "", password: "" },
      message: { error: "", info: "" },
      loading: false,
      formChecked: false,
    };
  },
  methods: {
    login() {
      if (this.checkForm()) {
        this.loading = true;

        this.$http
          .post(this.$APIUri("/users/login"), this.credential)
          .then((response) => response.json())
          .then((response) => {
            localStorage.setItem("token", response.token);
            window.location.href = "/recommendations-wizard";
          })
          .catch((response) => response.json())
          .then((message) => {
            this.message.error = message;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    reCaptchaLogin() {
      grecaptcha.ready(function () {
        grecaptcha
          .execute("6LcNwCgaAAAAAF9mGy5zWLPkJRYF9nare0Qv1KDW", {
            action: "submit",
          })
          .then(function (token) {
            alert(123);
          });
      });
    },
    checkForm() {
      this.formChecked = false;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmailValid = emailRegex.test(
        String(this.credential.email).toLowerCase()
      );

      if (!isEmailValid) {
        this.message.error = "Please inform a valid email!";
        return false;
      }

      this.formChecked = true;

      return true;
    },
    closeMessage() {
      this.message = { infor: "", error: "" };
    },
  },
};
</script>
