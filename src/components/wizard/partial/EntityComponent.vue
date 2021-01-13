<template>
  <div>
    <div class="mb-4">
      <button
        v-for="entity in entities"
        :key="entity.id"
        v-on:click="selectEntity(entity)"
        class="btn m-1"
        :class="{
          'btn-primary': entity.selected,
          'btn-outline-primary': !entity.selected,
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