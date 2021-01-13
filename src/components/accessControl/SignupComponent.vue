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
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Dados da sua conta</h5>
        <div class="form-group">
          <label>Email</label>
          <input
            :class="{
              'is-valid': emailChecked,
              'is-invalid': !emailChecked,
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
          <label>Nome</label>
          <input
            :class="{
              'is-valid': nameChecked,
              'is-invalid': !nameChecked,
            }"
            type="text"
            class="form-control"
            placeholder="Name"
            v-model="credential.name"
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
          <label>Confirme o Password</label>
          <input
            :class="{
              'is-valid': confirmPasswordChecked,
              'is-invalid': !confirmPasswordChecked,
            }"
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            v-model="credential.confirmPassword"
            v-on:keyup="checkConfirmPassword()"
            required
          />
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn-outline-secondary"
      v-on:click="cancel()"
    >
      Cancelar
    </button>
    <button
      type="submit"
      class="btn btn-primary"
      v-on:click="save()"
      v-bind:disabled="loading"
    >
      <span v-if="!loading"> Salvar </span>
      <span v-if="loading">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Salvando...
      </span>
    </button>
  </div>
</template>
<script>
export default {
  name: "signupComponent",
  props: {
    isNewCredential: Boolean,
    cancel: Function,
  },
  data() {
    return {
      credential: { email: "", password: "" },
      message: { error: "", info: "" },
      loading: false,
      formChecked: false,
      confirmPasswordChecked: false,
      emailChecked: false,
      nameChecked: false,
    };
  },
  methods: {
    save() {
      if (this.checkForm()) {
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
      }
    },
    checkConfirmPassword() {
      this.confirmPasswordChecked = false;

      if (
        this.credential.password != "" &&
        this.credential.confirmPassword === this.credential.password
      ) {
        this.confirmPasswordChecked = true;

        this.closeMessage();
      } else {
        this.message.error = "Por favor informe um password correto";
      }
    },
    checkForm() {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var isEmailValid = emailRegex.test(
        String(this.credential.email).toLowerCase()
      );

      if (!isEmailValid) {
        this.message.error = "Por favor informe um e-mail válido";
        return false;
      } else {
        this.emailChecked = true;
      }

      if (!this.credential.name) {
        this.message.error = "Campo 'Nome' é obrigatório";
        return false;
      } else {
        this.nameChecked = true;
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
