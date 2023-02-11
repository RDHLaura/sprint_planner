<template>
  <div class="register-form">
    <form novalidate @submit.prevent="submitForm">

      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <span v-if="msg.email">{{msg.email}}</span>

      <label for="clave">Clave:</label>
      <input type="password" id="password" v-model="password" required />
      <span v-if="msg.password">{{msg.password}}</span>

      <input type="submit" value="Entrar" />
    </form>
  </div>
</template>

<script>


import {isEmpty, validEmail, validPassword} from "@/utils/validations";
export default {
  data() {
    return {
      email: "",
      password: "",
      msg: {
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
      this.msg.password = validPassword(value);
    }
  },
  methods: {
    submitForm() {
      //se comprueba que los campos no vayan vacios
      this.msg.email = this.msg.email || isEmpty(this.email);
      this.msg.password = this.msg.password || isEmpty(this.password);

      if(Object.values(this.msg).every((err)=> err.length===0))
        this.$router.push("/proyectos")
    },

  }
};
</script>

<style scoped>
@import '../assets/form.css';
</style>