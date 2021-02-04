<template>
  <div>
    <div class="mb-4">
      <blockquote class="blockquote" v-if="entities.length > 0">
        <p class="display-7 lead text-muted">E agora as categorias</p>
      </blockquote>
      <button
        v-for="entity in entities"
        :key="entity.id.idEntity"
        v-on:click="selectEntity(entity)"
        class="btn m-1"
        :class="{
          'btn-secondary': entity.selected,
          'btn-outline-secondary': !entity.selected,
        }"
      >
        {{ entity.name }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    entities: Array,
    isLoading: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    selectEntity(entity) {
      this.$set(entity, "selected", true);
      this.$parent.setSelectedEntity(entity);
    },
  },
};
</script>