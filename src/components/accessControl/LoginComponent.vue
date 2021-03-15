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
        v-model="credential.username"
        v-on:blur="checkForm()"
        required
      />
    </div>
    <div class="form-group">
      <div id="testere" ref="recaptchaElement"></div>
    </div>
    <div class="form-group">
      <button
        type="submit"
        class="btn btn-primary btn-block"
        v-on:click="login()"
        v-bind:disabled="loading || !credential.username || !tokenRecaptcha"
      >
        <span v-if="!loading"> Participar </span>
        <span v-if="loading">
          Autenticando...
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </button>
    </div>
    <div
      class="modal fade"
      id="similarUsersModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Qual destes emails é seu?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tr v-for="user in similarUsers" :key="user.id">
                <td>
                  {{ user.username }}
                </td>
                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    v-on:click="setLoggedUser(user)"
                    v-bind:disabled="user.loading"
                  >
                    <span v-if="!user.loading">Este</span>
                    <span v-if="user.loading">
                      Carregando&nbsp;
                      <i class="fas fa-spinner fa-pulse"></i>
                    </span>
                  </button>
                </td>
              </tr>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      credential: { username: "" },
      message: { error: "", info: "" },
      loading: false,
      formChecked: false,
      recaptchaInstance: {},
      similarUsers: [],
      tokenRecaptcha: "",
    };
  },
  methods: {
    login() {
      this.loading = true;

      this.$http
        .post(this.$APIUri("/users/login"), this.credential)
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user-logged", true);

            if (response.viewInstructions) {
              window.location.href = "/recommendations-wizard";
            } else {
              window.location.href = "/instructions";
            }
          } else {
            this.similarUsers = response.users;
            $("#similarUsersModal").modal("show");
          }
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

        this.tokenRecaptcha = response;
      }
    },
    checkForm() {
      this.formChecked = false;

      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmailValid = emailRegex.test(
        String(this.credential.username).toLowerCase()
      );

      if (!isEmailValid) {
        this.message.error = "Por favor, informe um email válido";
        return false;
      }

      this.formChecked = true;

      return true;
    },
    closeMessage() {
      this.message = { infor: "", error: "" };
    },
    render() {
      var recaptchaElement = this.$refs.recaptchaElement;
      this.recaptchaInstance = grecaptcha.render(recaptchaElement, {
        sitekey: "6LcaxygaAAAAAE2lvfVzMW4TqGWpm_7lSa5e5hCW",
        callback: (response) => {
          this.validateReCaptcha();
        },
      });
    },
  },
  mounted() {
    window.ReCaptchaLoaded = this.render;

    var script = document.createElement("script");

    script.src =
      "https://www.google.com/recaptcha/api.js?onload=ReCaptchaLoaded&render=explicit";
    document.head.appendChild(script);
  },
};
</script>
