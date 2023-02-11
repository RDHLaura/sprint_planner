<template>
  <h1>pagina dashboard</h1>
  <ListadoProyectos />
  <ButtonNewProyect />
</template>

<script>
import ListadoProyectos from "../components/listadoProyectos.vue";
import ButtonNewProyect from "../components/button_newProyect.vue"
export default {
  name: "dashboard",

  components:{
    ListadoProyectos,
    ButtonNewProyect
  },
  methods:{
    nuevoProyecto(){
      this.$router.push("/nuevoproyecto")
    }
  }
}
</script>
