<template>
  <div class="text-center">
    <h1>Crea un nuevo proeycto</h1>
    <div class="m-3">
      <a class="btn btn-outline-secondary m-2" data-bs-toggle="collapse" href="#crearEquipo" role="button" aria-expanded="false" aria-controls="collapseExample">
        Crear equipo
      </a>
      <a class="btn btn-outline-secondary m-2" data-bs-toggle="collapse" href="#crearTarea" role="button" aria-expanded="false" aria-controls="collapseExample">
        Añadir tarea
      </a>
    </div>

    <!--Crear Equipo-->
    <!--
    <div class="row align-items-start text-center collapse mb-4" id="crearEquipo">
      <div class=" col align-items-center justify-content-center">
        <h3 class="mb-4">Usuarios registrados</h3>
        <input class="form-control w-75 d-inline mb-4" type="text" v-model="searchTerm" placeholder="Buscar usuario">
        <div class="list-group" v-for="user in filteredUsers" :key="user.id" @click="addToTeam(user)">

          <a href="#" class="list-group-item list-group-item-action" aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ user.username }}</h5>
              <small>{{ user.email }}</small>
            </div>
            <small>Github: {{ user.github_username }}</small>
          </a>
        </div>
      </div>

      <div class=" col align-items-center justify-content-center">
        <h3 class="mb-4">Miembros del equipo</h3>
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
  -->
    <CrearEquipo :addToTeam="addToTeam" :removeToTeam="removeToTeam" :team="team"/>
    <!--Crear tarea-->
    <FormTask :team="team"/>

  </div>
</template>

<script>

import usersData from "../database/usuarios.json";
import FormTask from "./createTaskForm.vue";
import CrearEquipo from "@/components/crearEquipo.vue";
export default {
  data() {
    return {
      users: usersData,
      team: [],
      searchTerm: ''
    };
  },
  components:{
    FormTask,
    CrearEquipo
  },
  watch: {
    team() {
      this.$forceUpdate();
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
  methods: {
    addToTeam(user) {
      if( this.team.includes(user))
        return false
      this.team.push(user);
    },
    removeToTeam(user) {
      if( this.team.includes(user))
        this.team = this.team.filter((usr)=> usr.id != user.id )

    }
  }
};
</script>

<style>

ul li {
  list-style: none;
}
</style>