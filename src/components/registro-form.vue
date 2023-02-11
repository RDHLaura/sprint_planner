<template>
  <div class="register-form">
    <form novalidate @submit.prevent="submitForm">
      <label for="nombre">Nombre de usuario:</label>
      <input type="text" id="nombre" v-model="nombre" required />
      <span v-if="msg.nombre">{{msg.nombre}}</span>

      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <span v-if="msg.email">{{msg.email}}</span>


      <label for="userGithub">Nombre de usuario de Github:</label>
      <input type="text" id="userGithub" v-model="userGithub" required />

      <label for="clave">Clave:</label>
      <input type="password" id="password" v-model="password" required />
      <span v-if="msg.password">{{msg.password}}</span>

      <input type="submit" value="Registrarse" />

    </form>

  </div>
</template>

<script>

import {validEmail, validPassword, validNombreUsu, isEmpty} from "@/utils/validations";

export default {

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
</style>