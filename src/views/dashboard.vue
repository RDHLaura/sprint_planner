<template>
  <main class="container-fluid vh-100 w-75">
    <h1 class="display-3 text-center fw-semibold" style="color: #454545 !important;">SprintPlanner</h1>
    <ListadoProyectos />
  </main>
  <ButtonNewProject />
</template>

<script>
import ListadoProyectos from "../components/listadoProyectos.vue";
import ButtonNewProject from "../components/button_newProject.vue"
export default {
  name: "dashboard",

  components:{
    ListadoProyectos,
    ButtonNewProject
  }
}
</script>
