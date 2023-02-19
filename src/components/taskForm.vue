<template>
  <div class="d-flex flex-column text-center align-items-center justify-content-center">
    <h2 class="display-5 my-5">Nueva tarea</h2>

    <form class="d-flex flex-column text-center align-items-center justify-content-center px-5 gap-3 w-75"  novalidate @submit.prevent="submitForm">

      <div class="input-group input-group-sm w-75">
        <span class="input-group-text p-2" id="inputGroup-sizing-sm" style="width: 7rem;">Título tarea</span>
        <input v-model="formData.titulo" type="text" class="form-control " >
      </div>

      <div class="input-group input-group-sm w-75">
        <span class="input-group-text p-2" id="inputGroup-sizing-sm" style="width: 7rem;">Asignada a:</span>
        <select v-model="formData.asignada_a" class="form-select " aria-label="Default select example" id="asignedTo">
          <option selected>Miembro equipo </option>
          <option v-for="member in proyecto.miembros" :key="member" :value="member">{{ getUser(member) }}</option>
        </select>
      </div>

      <div class="input-group input-group-sm w-75">
        <span class="input-group-text p-2" style="width: 7rem;">Descripción</span>
        <textarea v-model="formData.descripcion" class="form-control" aria-label="With textarea"></textarea>
      </div>

      <div class="input-group input-group-sm w-75">
        <span class="input-group-text p-2 " style="width: 7rem;"> Entrega: </span>
        <input v-model="formData.fecha_entrega" id="startDate" class="form-control" type="date" />
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


export default {
  name: "taskForm",
  data(){
      return {
        formData: {
          "titulo": "",
          "asignada_a": null,
          "descripcion": "",
          "fecha_entrega": "",
          "id_proyecto": null,
          "estado": "no-empezado"
        },
        usuarios: usuariosData,
        proyecto:{}
      }
  },
  mounted() {
    const route = useRoute();
    axios.get(API + '/proyectos/'+ route.params.id)
      .then(response => {
        this.proyecto= response.data;
        this.formData.id_proyecto = this.proyecto.id;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    submitForm() {

      if(this.formData.titulo !== "" && this.formData.descripcion !== "" && this.formData.asignada_a !==null && this.formData.fecha_entrega !== ""){
        axios.post(API +"/tareas", this.formData).then((result) => {
          //si el objeto se ha creado correctamente redirige a la pág del proyecto
          if(result.status == 200){
            this.$emit('actualizar')
          }
        });
      }else{
        console.log("Faltan datos")
      }
    },
    getUser (idUser){
      return  this.usuarios[idUser].username
    }
  }
}
</script>

<style scoped>

span,input, select, textarea{
  font-size: 1rem !important;
}
</style>