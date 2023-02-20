<template>
  <div class="d-flex flex-column text-center align-items-center justify-content-center">
    <h2 class="display-5 my-5">Nueva tarea</h2>
    <span class="mb-3 mt-0" v-if="msg.faltanDatos">{{msg.faltanDatos}}</span>

    <form class="d-flex flex-column text-center align-items-center justify-content-center px-5 gap-3 w-75"  novalidate @submit.prevent="submitForm">
      <div class="mb-3 w-75">
        <div class="input-group input-group-sm ">
          <span class="input-group-text p-2" id="inputGroup-sizing-sm" style="width: 7rem;">Título tarea</span>
          <input v-model="titulo" id="titulo" type="text" class="form-control " >
        </div>
        <span class="mb-3 mt-0" v-if="msg.titulo">{{msg.titulo}}</span>
      </div>

      <div class="mb-3 w-75">
        <div class="input-group input-group-sm">
          <span class="input-group-text p-2" id="inputGroup-sizing-sm" style="width: 7rem;">Asignada a:</span>
          <select v-model="asignada_a" class="form-select " aria-label="Default select example" id="asignedTo">
            <option selected>Miembro equipo </option>
            <option v-for="member in proyecto.miembros" :key="member" :value="member">{{ getUser(member) }}</option>
          </select>
        </div>
        <span v-if="msg.asignada_a">{{msg.asignada_a}}</span>
      </div>


      <div class="mb-3 w-75">
        <div class="input-group input-group-sm">
          <span class="input-group-text p-2" style="width: 7rem;">Descripción</span>
          <textarea v-model="descripcion" class="form-control" aria-label="With textarea"></textarea>
        </div>
        <span v-if="msg.descripcion">{{msg.descripcion}}</span>
      </div>

      <div class="mb-3 w-75">
        <div class="input-group input-group-sm ">
          <span class="input-group-text p-2 " style="width: 7rem;"> Entrega: </span>
          <input v-model="fecha_entrega" id="fecha_entrega" class="form-control" type="date" />
        </div>
        <span v-if="msg.fecha_entrega">{{msg.fecha_entrega}}</span>
      </div>

      <input type="submit" value="Añadir tarea" class="btn btn-outline-secondary mt-4" />
    </form>
  </div>
</template>

<script>

import {useRoute} from "vue-router";
import axios from "axios";
import API from "@/routes/API";
import usuariosData from "../database/usuarios.json";
import {isEmpty, validDate, validDescription, validName} from "@/utils/validations";

export default {
  name: "taskForm",
  data(){
      return {
        titulo        : "",
        asignada_a    : "",
        descripcion   : "",
        fecha_entrega : "",

        msg: {
          titulo        : "",
          descripcion   : "",
          asignada_a    : "",
          fecha_entrega : "",
          faltanDatos : ""
        },
        usuarios: usuariosData,
        proyecto:{}
      }
  },
  watch: {
    titulo(value){
      this.titulo     = value;
      this.msg.titulo = validName(value)
    },
    descripcion(value){
      this.descripcion      = value;
      this.msg.descripcion  = validDescription(value)
    },
    asignada_a(value){
      this.asignada_a      = value;
      this.msg.asignada_a  = this.proyecto.miembros.includes(value)? "": "El usuario no pertenece a su equipo."
    },
    fecha_entrega(value){
      this.fecha_entrega      = value
      this.msg.fecha_entrega  = validDate(value)
    }

  },
  mounted() {
    const route = useRoute();
    const urlAPI = API + '/proyectos/'+ route.params.id
    axios.get(urlAPI).then(response => {
        this.proyecto = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    submitForm() {
      //se comprueba que los campos no vayan vacios
      this.msg.titulo         = this.msg.titulo         || isEmpty(this.titulo);
      this.msg.descripcion    = this.msg.descripcion    || isEmpty(this.descripcion)
      this.msg.asignada_a     = this.msg.asignada_a     || isEmpty(this.asignada_a);
      this.msg.fecha_entrega  = this.msg.fecha_entrega  || isEmpty(this.fecha_entrega)



      const urlAPI = API +"/tareas";
      const body =  {
                      titulo        : this.titulo,
                      asignada_a    : this.asignada_a,
                      descripcion   : this.descripcion,
                      fecha_entrega : this.fecha_entrega,
                      id_proyecto   : this.proyecto.id,
                      estado        : "no-empezado"
                    }
      if(Object.values(this.msg).every((err)=> err.length===0)){
        axios.post(urlAPI, body ).then((result) => {
          //si el objeto se ha creado correctamente redirige a la pág del proyecto
          if(result.status == 200){
            this.$emit('actualizar')
          }
        });
      }else{
        this.msg.faltanDatos = "Debe completar todos los campos para crear la tarea."
      }
    },
    getUser (idUser){
      return this.usuarios[idUser].username
    }
  }
}
</script>

<style scoped>

span,input, select, textarea{
  font-size: 1rem !important;
}
</style>