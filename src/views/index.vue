<template>
  <main class="d-flex flex-row m-5 justify-content-center">
    <div class="row mx-5">
      <div class="col d-flex flex-column text-center align-items-center vw-50">
        <h1 class="display-3">Organiza a tu equipo.</h1>
        <p class="w-75 m-3 fs-4">Plataforma de trabajo colaborativo online, para pequeños equipos que se inician en las metodologías ágiles.
          Permite organizar tus Sprints con tu equipo de forma sencilla. </p>
        <img :src="image" class="rounded mx-auto mt-5" style="max-width: 30rem"/>
      </div>
      <div class="col register-form mt-5 vw-50">
        <LoginForm :isRegistered="isRegistered" v-if="!estaRegistrado"/>
        <RegistroForm :isRegistered="isRegistered" v-if="estaRegistrado" />
      </div>
    </div>
  </main>


</template>

<script>

/**
 * @file index.vue - Página de inicio
 * @author Laura Rodríguez
 */



import RegistroForm from "../components/registro-form.vue";
import LoginForm from "../components/login-form.vue";
import image from "../assets/19719.jpg"

/**
 * @vue-data {Boolean}[estaRegistrado = false] - Controla si aparece el formulario de login o de registro
 * @vue-data {image}[submitted = false] - Maneja el submit del formulario
 * @vue-event isRegistered - Si el usuario está registrado muestra el formulario de login o de registro en caso contrario
 */
export default {
  name: 'IndexPage',
  data(){
    return {
      estaRegistrado : false,
      image: image
    }
  },
  components: {
    RegistroForm,
    LoginForm,

  },
  methods: {
    isRegistered(){
      this.estaRegistrado = !this.estaRegistrado
    }
  }
}
</script>

<style scoped>
main{
  margin-top: 5vh !important;
}
</style>