<template>
  <div v-if="checkLoading()" class="row mb-2">
    <div v-for="step in steps" :key="step.id" class="col-6 text-center">
      <div>
        <button
          type="button"
          :class="{
            'btn-secondary': step.waiting,
            'btn-success': step.completed,
            'btn-primary': step.loading,
          }"
          class="btn btn-circle btn-lg mb-3"
        >
          <span
            class="spinner-border"
            role="status"
            aria-hidden="true"
            v-if="step.loading"
          ></span>
          <h3 v-if="step.waiting">
            {{ step.id }}
          </h3>
          <i v-if="step.completed" class="fas fa-check"></i>
        </button>
        <div>
          <span
            :class="{ 'font-weight-bold': step.loading }"
            class="align-middle"
          >
            {{ step.message }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loadingStepsComponent",
  props: ["steps"],
  methods: {
    checkLoading() {
      return this.steps[0].loading || this.steps[1].loading;
    },
  },
};
</script>