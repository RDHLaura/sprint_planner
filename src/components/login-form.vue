<template>
  <div class="register-form  mt-5">
    <form novalidate @submit.prevent="submitForm">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <span v-if="msg.email">{{msg.email}}</span>

      <label for="clave">Clave:</label>
      <input type="password" id="password" v-model="password" required />
      <span v-if="msg.password">{{msg.password}}</span>

      <button value="Entrar" class="btn btn-outline-secondary w-100 fs-4 fw-bold">Entrar</button>
      <button class="btn btn-link w-100 align-self-center fs-4"  type="button" @click="isRegistered" >¿Aún no tienes cuenta?</button>
    </form>
  </div>
</template>

<script>
/**
 * @file login-form.vue - Formulario de login
 * @author Laura Rodríguez
 */

import {isEmpty, validEmail, validPassword} from "@/utils/validations";
/**
 * @vue-prop {Function} isRegistered
 *
 * @vue-data {String}[email = ""] - Email del usuario
 * @vue-data {String}[password = ""] - Password
 * @vue-data {Object}[msg = {}] - Almacena los mensajes de error del formulario
 *
 * @vue-event email - valida el input del email
 * @vue-event password - valida el input del password
 * @vue-event submitForm - si los datos del formulario son correctos envia a la pág Dashboard
 */

export default {
  props:{
    isRegistered: {
      type: Function
    }
  },
  data() {
    return {
      email    : "",
      password : "",
      msg: {
        email   : "",
        password: "",
      },
    };
  },
  watch: {
    email(value){
      this.email     = value;
      this.msg.email = validEmail(value)
    },
    password(value){
      this.password     = value;
      this.msg.password = validPassword(value);
    }
  },
  methods: {
    submitForm() {
      //se comprueba que los campos no vayan vacios
      this.msg.email    = this.msg.email || isEmpty(this.email);
      this.msg.password = this.msg.password || isEmpty(this.password);

      if(Object.values(this.msg).every((err)=> err.length===0)){
        this.$router.push("/proyectos");
      }
    },

  }
};
</script>

<style scoped>
@import '../assets/form.css';
spam,input, select, textarea, a{
  font-size: 1.2rem !important;
}
</style>