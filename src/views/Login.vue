<template>
  <div>
    <div
      class="jumbotron jumbotron-fluid card-shadow card-tweet-timeline text-center"
      style="background-color: #ffffff"
    >
      <div class="container">
        <h1 class="display-4">Bem-vindo(a)</h1>
        <p class="lead">
          Este sistema é um experimento para o desenvolvimento do meu Doutorado
          em Ciência da Computação. Para mais informações
        </p>
        <a href="/instructions" class="btn btn-outline-secondary">
          Leia as Instruções
        </a>
        <hr class="my-4" />
        <div class="text-center">
          <span class="text-center lead display-7">Ou</span>
          <p class="display-6">Informe seu email abaixo</p>
          <login-component></login-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginComponent from "@/components/accessControl/LoginComponent.vue";

export default {
  name: "LoginView",
  data() {
    return {};
  },
  components: { LoginComponent },
};
</script>