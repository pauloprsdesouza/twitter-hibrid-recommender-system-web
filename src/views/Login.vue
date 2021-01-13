<template>
  <div>
    <h3 class="text-center mb-5">
      Por favor, antes de começar leia as
      <a href="/instructions" class="btn btn-primary">INSTRUÇÕES</a>
    </h3>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 m-auto">
        <div class="card">
          <div class="card-header">
            <h5>Identificação do Participante</h5>
          </div>
          <div class="card-body">
            <signup-component
              v-if="isNewCredential"
              :isNewCredential="isNewCredential"
              :cancel="cancel"
            ></signup-component>
            <login-component v-if="!isNewCredential"></login-component>
          </div>
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
    return {
      isNewCredential: false,
    };
  },
  methods: {
    signup() {
      this.isNewCredential = true;
    },
    cancel() {
      this.isNewCredential = false;
    },
  },
  components: { LoginComponent },
};
</script>