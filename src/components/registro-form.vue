<template>
  <div class= "register-form ">
    <form novalidate @submit.prevent="submitForm" >
      <label for="nombre">Nombre de usuario:</label>
      <input type="text" id="nombre" v-model="nombre" required />
      <span v-if="msg.nombre">{{msg.nombre}}</span>

      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <span v-if="msg.email">{{msg.email}}</span>

      <label for="clave">Contraseña:</label>
      <input type="password" id="password" v-model="password" required />
      <span v-if="msg.password">{{msg.password}}</span>

      <label for="clave">Repetir contraseña:</label>
      <input type="password" id="password" v-model="password" required />
      <span v-if="msg.password">{{msg.password}}</span>

      <button value="Entrar" class="btn btn-outline-secondary w-100 fs-4 fw-bold">Regístraste</button>
      <button class="btn btn-link w-100 align-self-center fs-4"  type="button" @click="isRegistered"> Ya tengo cuenta</button>

    </form>

  </div>
</template>

<script>

import {validEmail, validPassword, validNombreUsu, isEmpty} from "@/utils/validations";

export default {
  props:{
    isRegistered:{
      type: Function
    }
  },

  data() {
    return {
        nombre: "",
        email: "",
        userGithub: "",
        password: "",
        msg: {
          nombre: "",
          email: "",
          password: "",
        },
    };
  },
  watch: {
    email(value){
      this.email = value;
      this.msg.email = validEmail(value)
    },
    password(value){
      this.password = value;
      this.msg.password = validPassword(value)
    },
    nombre(value){
      this.nombre = value;
      this.msg.nombre = validNombreUsu(value) || isEmpty(value)
    }
  },
  methods: {
    submitForm() {
      //se comprueba que los campos no vayan vacios
      this.msg.email = this.msg.email || isEmpty(this.email);
      this.msg.nombre = this.msg.nombre || isEmpty(this.nombre)
      this.msg.password = this.msg.password || isEmpty(this.password)

      if(Object.values(this.msg).every((err)=> err.length===0))
        this.$router.push("/proyectos")
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