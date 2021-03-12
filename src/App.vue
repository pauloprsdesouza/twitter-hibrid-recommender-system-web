<template>
  <div id="app-twitter">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <a class="navbar-brand" href="/recommendations-wizard" v-if="isLogged"
          >Rec-Social</a
        >
        <a class="navbar-brand" href="/" v-if="!isLogged">Rec-Social</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li
            class="nav-item item-highlight"
            :class="{ active: isInstructions }"
          >
            <a class="nav-link" href="/instructions" v-if="isLogged"
              >Instruções</a
            >
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0" v-if="isLogged">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ user.email }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" v-on:click="logout()">
                <i class="fas fa-sign-out-alt"></i>&nbsp;Logout</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mb-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  data() {
    return {
      user: {},
      message: { error: null, info: null },
      isLogged: false,
      isInstructions: false,
      isMyEvaluations: false,
    };
  },
  methods: {
    verifyURL() {
      if (window.location.pathname === "/instructions") {
        this.isInstructions = true;
      } else {
        if (window.location.pathname === "/my-evaluations") {
          this.isMyEvaluations = true;
        }
      }
    },
    getActiveUser() {
      this.$http
        .get(this.$APIUri("/users/details"))
        .then((response) => response.json())
        .then((user) => {
          this.user = user;
        })
        .catch((response) => response.json())
        .then((response) => {
          this.message.error = response;
        })
        .finally(() => {});
    },
    logout() {
      this.$http
        .get(this.$APIUri("/users/logout"))
        .then(() => {
          window.location.href = "/";
        })
        .finally(() => {
          localStorage.removeItem("token");
        });
    },
  },
  mounted() {
    var token = localStorage.getItem("token");

    if (
      token != null &&
      window.location.pathname != "/" &&
      window.location.pathname != "/dashboard"
    ) {
      this.getActiveUser();
      this.isLogged = true;
    }

    this.verifyURL();
  },
};
</script>