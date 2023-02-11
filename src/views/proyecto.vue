<template class="container">
  <div class="mb-5 ">
    <h1 class="h1 mb-5 mp-5">Vista de proyecto</h1>
    <h2 class="h3 mb-3 mp-5">{{ proyecto.titulo }}</h2>
    <p>{{ proyecto.descripcion }}</p>
  </div>
<ListadoTareas />


</template>

<script>

import ListadoTareas from "../components/listadoTareas.vue";
import {useRoute} from "vue-router";
import proyectosData from "../database/proyectos.json"
export default {
  name: "proyecto",
  data(){
    return{
      proyecto: [],
    }
  },
  mounted(){
    const route = useRoute()
    this.proyecto = proyectosData[route.params.id -1]

  },
  components: {
    ListadoTareas
  },

}

</script>

