<template>
  <div class="row align-items-start text-center collapse mb-4" id="crearEquipo">
    <div class=" col align-items-center justify-content-center">
      <h2 class="mb-4 fs-2 fw-bold">Usuarios registrados</h2>
      <input class="form-control w-75 d-inline mb-4" type="text" v-model="searchTerm" placeholder="Buscar usuario">
      <div class="list-group" v-for="user in filteredUsers" :key="user.id" @click="addToTeam(user)">

        <div class="list-group-item list-group-item-action pt-3 px-3" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1 fs-4">{{ user.username }}</h3>
            <small>{{ user.email }}</small>
          </div>
          <p class="blockquote-footer">Github: <span class="mx-2">@{{user.github_username }}</span></p>


        </div>
      </div>
    </div>

    <div class=" col align-items-center justify-content-center">
      <h3 class="mb-4 fs-2 fw-bold">Miembros del equipo</h3>
      <div class="list-group" v-for="member in team" :key="member.id" @click="removeToTeam(member)">

        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ member.username }}</h5>
            <small>{{ member.email }}</small>
          </div>
          <small>Github: {{ member.github_username }}</small>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import usersData from "../database/usuarios.json";
export default {
  name: "crearEquipo",
  data(){
    return{
      users: usersData,
      searchTerm: ''
    }
  },
  props: {
    team: {
      type: Array
    },
    addToTeam: {
      type: Function
    },
    removeToTeam:{
      type: Function
    }
  },
  watch: {
    team() {
      this.$forceUpdate();
    }
  },
  computed: {
    filteredUsers() {
      return Object.values(this.users).filter(user => {
        return user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
}
</script>

<style scoped>
span, input{
  font-size: 1rem !important;
}
</style>