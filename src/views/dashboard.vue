<template>
  <Navbar />
  <main class="container-fluid vh-100 w-75">
    <h1 class="display-3 text-center fw-semibold" style="color: #454545 !important;">SprintPlanner</h1>
    <ListadoProyectos />
  </main>

  <ButtonNewProject />
</template>

<script>
/**
 * @file dashboard.vue - Vista del listado de proyectos en los que participa o es creador el usuario logueado
 * @author Laura Rodríguez
 */

import ListadoProyectos from "../components/listadoProyectos.vue";
import ButtonNewProject from "../components/button_newProject.vue";
import Navbar from "@/components/navbar.vue";

export default {
  name: "dashboard",

  components:{
    ListadoProyectos,
    ButtonNewProject,
    Navbar,
  }
}
</script>
