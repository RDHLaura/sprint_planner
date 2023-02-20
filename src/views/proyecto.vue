<template >
  <Navbar />
  <main class="container w-75 vh-100" >
    <h1 class="display-3 text-center fw-semibold mb-4" style="color: #454545 !important;">{{ proyecto.titulo }}</h1>
    <div class="bg-light m-3 px-5 py-4 rounded">
      <h2 class="h3 mb-3 fw-bold">Descripción del proyecto:</h2>
      <p class="fs-4 mx-4">{{ proyecto.descripcion }}</p>
      <h2 class="h3 mb-3 fw-bold">Participantes:</h2>
      <p  class="fs-4 mx-4"> <span v-for="miembro in proyecto.miembros" class="mx-3">{{ getUser(miembro) }}</span></p>
      <p class="blockquote-footer fs-5 mt-3 text-center" >Encargado del proyecto: <span class="mx-3 ">{{ this.creador }}</span></p>
      <p role="button" v-if="propietario" class="pt-3 text-center" @click="eliminar(proyecto.id)">
        <span class="pb-1 text-danger">Eliminar proyecto</span>
        <span  class="bi bi-x-octagon fs-4 text-danger mx-3"></span>
      </p>
    </div>
    <div>
      <ListadoTareas v-if="renderComponent" :propietario="propietario" @componenteCreado="componenteCreado"/>
     </div>
  </main>
  <ButtonNewTask v-if="propietario" @componenteCreado="componenteCreado" />
</template>

<script>
/**
 * @file proyecto.vue - Vista del proyecto
 * @author Laura Rodríguez
 */

import ListadoTareas from "../components/listadoTareas.vue";
import Navbar from "@/components/navbar.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import API from "@/routes/API";
import usuariosData from "../database/usuarios.json";
import ButtonNewTask from "../components/button_newTask.vue"
import { esCreador } from "@/utils/login";

/**
 * @vue-data {Object}[proyecto = {}] - Almacena los datos del proyecto obtenidos de la API
 * @vue-data {Object}[usuarios = usuariosData] - Almacena los datos de los usuarios registrados.
 * @vue-data {null}[creador = null] - Almacena el nombre del creador del proyecto
 * @vue-data {Boolean}[creador = null] - Indica si el usuario logueado es el creador del proyecto
 * @vue-event {Number} getUser - devuelve el id del usuario logueado
 * @vue-event eliminar - Elimina el proyecto actual
 */
export default {
  name: "proyecto",
  data(){
    return{
      proyecto: {},
      usuarios: usuariosData,
      creador: null,
      renderComponent: false,
      propietario: null
    }
  },
  mounted() {
    const route = useRoute()
    axios.get(API + '/proyectos/'+ route.params.id)
      .then(response => {
        this.proyecto= response.data;
        this.creador = this.usuarios[this.proyecto.creador].username
        this.propietario = esCreador(this.proyecto.creador);
        this.componenteCreado()
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    ListadoTareas,
    ButtonNewTask,
    Navbar
  },
  methods:{
    getUser (idUser){
      return  this.usuarios[idUser].username
    },
    async componenteCreado(){
      //elimina el componente del dom
      this.renderComponent = false;

      await this.$nextTick(() => {
        // Añade el componente de nuevo
        this.renderComponent = true;
      });
    },
    eliminar(idProject){
      axios.delete(API + '/proyectos/'+ idProject)
          .then(response => {
            if(response.status==200){
              this.$router.push("/proyectos");
            }
            console.log(response.status)
          })
          .catch(error => {
            console.log(error);
          });
    },
  }

}

</script>

