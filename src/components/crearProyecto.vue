<template>
  <div class="text-center  ">
    <div class="mt-5">
    <h2 class="display-4 m-5">Nuevo proyecto</h2>

    <form class="d-flex flex-column  align-items-center gap-3" novalidate @submit.prevent="submitForm">
      <div class="mb-3 w-50">
        <div class="input-group input-group-sm  ">
          <span class="input-group-text px-3" id="inputGroup-sizing-sm" style="width: 7rem;">Título proyecto</span>
          <input v-model="titulo" type="text" class="form-control" id="titulo">
        </div>
        <span class="mb-3 mt-0" v-if="msg.titulo">{{msg.titulo}}</span>
      </div>

      <div class="mb-3 w-50">
        <div class="input-group input-group-sm">
          <span class="input-group-text px-3" style="width: 7rem;">Descripción</span>
          <textarea v-model="descripcion" id="descripcion" class="form-control"></textarea>
        </div>
        <span v-if="msg.descripcion">{{msg.descripcion}}</span>
      </div>

      <!--botones-->
      <div class="m-3 mb-5">
        <a class="btn btn-outline-secondary m-2 " data-bs-toggle="collapse" href="#crearEquipo" role="button" aria-expanded="false" aria-controls="collapseExample">
          Crear equipo
        </a>
        <input type="submit" class="btn btn-outline-secondary m-2" value="Guardar" />
        <p v-if="msg.miembros">{{msg.miembros}}</p>
      </div>
    </form>

    <!--Crear Equipo-->
    <CrearEquipo
        :addToTeam="addToTeam"
        :removeToTeam="removeToTeam"
        :team="team"
        class="mt-5"
    />
    </div>
  </div>
</template>

<script>
/**
 * @file crearProyecto.vue - Vista de creación del Proyecto
 * @author Laura Rodríguez
 */

import CrearEquipo from "@/components/crearEquipo.vue";
import axios from "axios";
import API from "@/routes/API";
import {isEmpty, validDescription,  validName} from "@/utils/validations";

/**
 * @vue-data {Array} team - Array con los ids de los miembros del equipo del proyecto
 * @vue-data {String}[titulo = ""] - Título del proyecto
 * @vue-data {String}[descripcion = ""] - Descripcion del proyecto
 * @vue-data {Object}[msg = {}] - Almacena los mensajes de error del formulario
 *
 * @vue-event titulo - valida el input del título
 * @vue-event descripcion - valida el input de la descripción
 * @vue-event addToTeam - añade un usuario al equipo
 * @vue-event removeToTeam - elimina un usuario al equipo
 * @vue-event submitForm - envia una petición post a la API con los datos del nuevo proyecto
 */
export default {
  data() {
    return {
      team: [],
      titulo      : "",
      descripcion : "",
      miembros    : [],
      msg: {
        titulo      : "",
        descripcion : "",
        miembros    : "",
      },
      newProyect: {}
    };
  },
  components:{
    CrearEquipo
  },
  watch: {
    team() {
      this.$forceUpdate();
    },
    titulo(value){
      this.titulo = value;
      this.msg.titulo = validName(value)
    },
    descripcion(value){
      this.descripcion = value;
      this.msg.descripcion = validDescription(value)
    }

  },
  methods: {
    addToTeam(user) {
      if( this.team.includes(user))
        return false
      this.team.push(user);
    },
    removeToTeam(user) {
      if( !this.team.includes(user))
        return false
      this.team = this.team.filter((usr)=> usr.id != user.id )
    },
    submitForm() {

      //almaceno los miembros del equipo en el formulario que se enviará a la API
      this.team.map(member =>{
        this.miembros.push(member.id)
      })

      //se comprueba que los campos no vayan vacios
      this.msg.titulo       = this.msg.titulo       || isEmpty(this.titulo);
      this.msg.descripcion  = this.msg.descripcion  || isEmpty(this.descripcion)
      this.msg.miembros     = (this.team.length ==0)? "Debe tener formar su equipo antes de crear el proyecto." : "";

      if(Object.values(this.msg).every((err)=> err.length===0)){
        axios.post(API +"/proyectos", {
          titulo      : this.titulo,
          descripcion : this.descripcion,
          miembros    : this.miembros,
          creador     : 1
        }).then((result) => {
            if(result.status == 200)
              this.$router.push({name   : 'proyecto',
                                params  : { id: result.data.createdProyect.id }
              })
            console.log(result.status)
          }).catch(error => {
            console.log(error);
          });
      }
    },
  }
};
</script>

<style scoped>
  ul li {
    list-style: none;
  }
  span, input, textarea{
    font-size: 1rem !important;
  }
</style>