<template >
  <main class="container w-75 vh-100">
    <h1 class="display-3 text-center fw-semibold mb-4" style="color: #454545 !important;">{{ proyecto.titulo }}</h1>
    <div class="bg-light m-3 px-5 py-4 rounded">
      <h2 class="h3 mb-3 fw-bold">Descripción del proyecto:</h2>
      <p class="fs-4 mx-4">{{ proyecto.descripcion }}</p>
      <h2 class="h3 mb-3 fw-bold">Participantes:</h2>
      <p  class="fs-4 mx-4"> <span v-for="miembro in proyecto.miembros" class="mx-3">{{ getUser(miembro) }}</span></p>
    </div>
    <div>
      <ListadoTareas v-if="renderComponent" :propietario="propietario" @componenteCreado="componenteCreado"/>
    </div>
    <p class="blockquote-footer fs-5 my-5">Encargado del proyecto: <span class="mx-3 ">{{ this.creador }}</span></p>
  </main>
  <ButtonNewTask v-if="propietario" @componenteCreado="componenteCreado" />
</template>

<script>

import ListadoTareas from "../components/listadoTareas.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import API from "@/routes/API";
import usuariosData from "../database/usuarios.json";
import ButtonNewTask from "../components/button_newTask.vue"
import { esCreador } from "@/utils/login";

export default {
  name: "proyecto",
  data(){
    return{
      proyecto: {},
      usuarios: usuariosData,
      creador: null,
      renderComponent: true,
      propietario: null
    }
  },
  mounted() {
    const route = useRoute()

    axios.get(API + '/proyectos/'+ route.params.id)
      .then(response => {
        this.proyecto= response.data;
        this.creador = this.usuarios[this.proyecto.creador].username
        this.propietario = esCreador(this.proyecto.creador)
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    ListadoTareas,
    ButtonNewTask
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
    }
  }

}

</script>

