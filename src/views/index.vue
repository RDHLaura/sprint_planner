<template>



  <main class="container text-center">

  <h1>pagina index</h1>
  <div class="register-form">
    <LoginForm v-if="!estaRegistrado"/>
    <RegistroForm v-if="estaRegistrado" />
    <button class="btn btn-link align-middle" type="button" @click="toLogin">{{ (!estaRegistrado? "¿Aún no tienes cuenta?" : "Ya tengo cuenta" )}}</button>
  </div>
  </main>
</template>

<script>
import RegistroForm from "../components/registro-form.vue";
import LoginForm from "../components/login-form.vue";
export default {
  name: 'IndexPage',
  data(){
    return {
      estaRegistrado : false
    }
  },
  components: {
    RegistroForm,
    LoginForm,

  },
  methods: {
    toLogin(){
      this.estaRegistrado = !this.estaRegistrado
    }
  }
}
</script>

<style scoped>
@import '../assets/form.css';

</style>