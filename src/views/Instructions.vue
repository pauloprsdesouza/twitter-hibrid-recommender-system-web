<template>
  <div>
    <div class="mb-4 card card-shadow p-4">
      <h1>Olá!</h1>

      <p class="text-justify lead">
        Eu me chamo
        <a target="_blank" href="http://lattes.cnpq.br/6583921321802015"
          >Paulo Roberto</a
        >
        e sou aluno do curso de Doutorado do
        <a target="_blank" href="http://pgcomp.dcc.ufba.br/">
          Programa de Pós-Graduação em Ciência da Computação (PGCOMP)
        </a>
        da
        <a target="_blank" href="http://wiki.dcc.ufba.br/DCC/">
          Universidade Federal da Bahia-UFBA</a
        >. Primeiramente, seja bem-vindo(a) e muito obrigado pela sua
        disponibilidade em participar deste experimento. Será uma satisfação te
        ter como voluntário, saiba que sua avaliação é muito importante.
      </p>
      <div class="d-flex flex-row text-dark">
        <div class="mr-3">
          <a
            href="https://twitter.com/pauloprsdesouza"
            target="_blank"
            class="text-primary"
            ><i class="fab fa-twitter-square fa-2x"></i
          ></a>
        </div>
        <div class="mr-3">
          <a
            href="http://paulorsouza.com.br"
            target="_blank"
            class="text-primary"
            ><i class="fas fa-globe fa-2x"></i
          ></a>
        </div>
        <div>
          <a
            href="https://github.com/pauloprsdesouza"
            target="_blank"
            class="text-primary"
            ><i class="fab fa-github-square fa-2x"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>O que é o sistema</h2>
      <p class="text-justify lead">
        Este Sistema de Recomendação (RS) foi desenvolvido como proposta inicial
        e essencial para a condução e desenvolvimento do meu trabalho de
        Doutorado.
      </p>
      <p class="text-justify lead">
        Em muitos casos, encontrar o que queremos de forma simples e rápida de
        acordo com nossos interesses/preferências torna-se uma tarefa cansativa.
      </p>
      <p class="text-justify lead">
        Nas redes sociais por exemplo, somos alvos de muitas postagens que nem
        sempre são apresentadas na ordem de relevância que gostaríamos. Logo,
        precisamos procurar ou rolar uma página inteira até encontrar algo que
        nos interesse.
      </p>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Qual o seu objetivo</h2>
      <p class="text-justify lead">
        Este experimento visa recomendar notícias de acordo com seus
        interesses/preferências a fim de avaliar a
        <span class="text-primary"> qualidade </span> e a
        <span class="text-primary"> relevância </span> que essas recomendações
        geradas tiveram para você.
      </p>
      <p class="text-justify lead">
        As recomendações serão geradas e relacionadas a partir de categorias que
        você irá selecionar como gênero musical, entretenimento, esportes, etc.
        Vale lembrar, que você precisa avaliar essas recomendações de acordo com
        o que você selecionou e gostaria de receber HOJE, por exemplo.
      </p>
      <p class="text-justify lead">
        Diante disso, 4 listas serão geradas contendo 10 notícias cada. Vale
        ressaltar que você poderá participar do experimento quantas vezes
        quiser, para isso, basta utilizar o seu email cadastrado na tela de
        acesso.
      </p>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Veja este vídeo tutorial</h2>
      <p class="text-justify lead">
        Este vídeo apresenta de forma bem simples e em poucos segundos a
        utilização do sistema.
      </p>
      <div class="embed-responsive embed-responsive-16by9">
        <iframe
          class="embed-responsive-item"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/BdpSjzixhbc"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Caso tenha alguma dúvida</h2>
      <p class="text-justify lead">
        Ou se algo não tenha ficado claro e/ou até mesmo se estiver enfrentando
        algum problema com o experimento, por favor entre em contato comigo
        <a href="mailto:paulo.prsdesouza@gmail.com">
          paulo.prsdesouza@gmail.com
        </a>
      </p>
    </div>
    <div class="mb-5 mt-5 text-center" v-if="userLogged">
      <button
        class="btn btn-primary btn-lg btn-block"
        v-on:click="updateViewInstructions()"
        v-bind:disabled="isLoading"
      >
        <span v-if="!isLoading" class="align-middle"
          >CLIQUE AQUI E VAMOS COMEÇAR!
        </span>
        <span v-if="isLoading">
          Carregando <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "instructions",
  data() {
    return {
      userLogged: false,
      isLoading: false,
    };
  },
  methods: {
    updateViewInstructions() {
      this.isLoading = true;

      this.$http
        .get(this.$APIUri("/users/view-instructions"))
        .then((json) => {
          window.location.href = "/recommendations-wizard";
        })
        .catch((response) => response.json())
        .then((response) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.userLogged = localStorage.getItem("user-logged");
  },
};
</script>
