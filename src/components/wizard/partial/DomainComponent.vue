<template>
  <div>
    <div class="mb-4">
      <blockquote class="blockquote">
        <p class="mb-4 display-5 lead text-muted">
          Selecione até três categorias de seu interesse para gerarmos
          recomendações
        </p>
      </blockquote>
      <button
        v-for="domain in domains"
        :key="domain.id"
        v-on:click="selectDomain(domain)"
        v-bind:disabled="domain.disabled"
        class="btn m-1"
        :class="{
          'btn-primary': domain.selected,
          'btn-outline-primary': !domain.selected,
        }"
      >
        {{ domain.name }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    domains: Array,
    isLoading: Boolean,
  },
  data() {
    return {
      selectedDomain: Object,
    };
  },
  methods: {
    selectDomain(domain) {
      this.selectedDomain = domain;

      this.$set(domain, "selected", true);
      this.domains.forEach((currentDomain, index) => {
        if (!(currentDomain.id === domain.id)) {
          this.$set(currentDomain, "selected", false);
        }
      });

      //this.$parent.clearSelectedEntity();
      this.getEntities();
    },
    getEntities() {
      this.$parent.getEntitiesByDomain(this.selectedDomain);
    },
  },
  mounted() {
    this.domains.forEach((currentDomain, index) => {
      this.$set(currentDomain, "selected", false);
    });
  },
};
</script>