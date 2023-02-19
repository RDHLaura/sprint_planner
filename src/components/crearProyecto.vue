<template>
  <div class="text-center  ">
    <div class="mt-5">
    <h1 class="display-4 m-5">Nuevo proyecto</h1>

    <form class="d-flex flex-column  align-items-center gap-3"   novalidate @submit.prevent="submitForm">
      <div class="input-group input-group-sm mb-3 w-50 ">
        <span class="input-group-text px-3" id="inputGroup-sizing-sm" style="width: 12rem;">Título proyecto</span>
        <input v-model="formData.titulo" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
      </div>
      <div class="input-group input-group-sm mb-3 w-50">
        <span class="input-group-text px-3" style="width: 12rem;">Descripción</span>
        <textarea v-model="formData.descripcion" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <div class="m-3 mb-5">
        <a class="btn btn-outline-secondary m-2 fs-4" data-bs-toggle="collapse" href="#crearEquipo" role="button" aria-expanded="false" aria-controls="collapseExample">
          Crear equipo
        </a>
        <input type="submit" class="btn btn-outline-secondary m-2" value="Guardar" />
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
import CrearEquipo from "@/components/crearEquipo.vue";
import axios from "axios";
import API from "@/routes/API";
export default {
  data() {
    return {
      team: [],
      searchTerm: '',
      formData: {
        titulo: "",
        descripcion: "",
        miembros: [],
        creador: 1
      },
      msg: {
        titulo: "",
        descripcion: "",
        miembros: "",
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
      this.team.map(member =>{
        this.formData.miembros.push(member.id)
      })
      if(this.formData.titulo !== "" && this.formData.descripcion !== "" && this.formData.miembros.length!=0){
         axios.post(API +"/proyectos", this.formData).then((result) => {
          //si el objeto se ha creado correctamente redirige a la pág del proyecto
          if(result.status == 200){
            this.$router.push({name: 'proyecto', params: { id: result.data.createdProyect.id }})
          }
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