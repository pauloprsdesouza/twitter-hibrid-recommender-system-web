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
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>O Sistema</h2>
      <p class="text-justify lead">
        Este Sistema de Recomendação (RS) foi desenvolvido como proposta inicial
        e essencial para a condução e desenvolvimento do meu trabalho de
        Doutorado.
      </p>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Objetivo</h2>
      <p class="text-justify lead">
        Este experimento visa avaliar a
        <span class="text-primary"> qualidade </span> e a
        <span class="text-primary"> relevância </span> das recomendações geradas
        para você de acordo com os seus interesses.
      </p>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Vídeo Tutorial</h2>
    </div>
    <div class="mb-4 card card-shadow p-4">
      <h2>Dúvidas</h2>
      <p class="text-justify lead">
        Caso algo não tenha ficado claro ou até mesmo se estiver enfrentando
        algum problema com o experimento, por favor entre em contato comigo
        <a href="mailto:paulo.prsdesouza@gmail.com">
          paulo.prsdesouza@gmail.com </a
        >.
      </p>
    </div>
    <div class="mb-5 mt-5 text-center">
      <a
        href="/recommendations-wizard"
        class="btn btn-primary btn-lg button-width-widget"
      >
        😃 CLIQUE AQUI E VAMOS COMEÇAR!
      </a>
    </div>
    <h2>Sobre mim</h2>
    <div class="d-flex flex-row mb-5 text-dark">
      <div class="mr-3">
        <a
          href="https://twitter.com/pauloprsdesouza"
          target="_blank"
          class="text-primary"
          ><i class="fab fa-twitter-square fa-2x"></i
        ></a>
      </div>
      <div class="mr-3">
        <a href="http://paulorsouza.com.br" target="_blank" class="text-primary"
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
</template>
<script>
export default {
  name: "about",
  data() {
    return {};
  },
};
</script>
