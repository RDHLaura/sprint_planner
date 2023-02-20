<template >
    <div >
      <div v-if="proyectos.length === 0" class="rounded p-3 mb-2 fs-3 bg-danger-subtle bg-opacity-50 ">
        La API está cargando, esto puede llevar un par de minutos...
      </div>
      <div v-if="proyectos.length > 0" class="d-flex flex-wrap mt-5 justify-content-center w-100 h-75">
        <div class="card proyects-card m-2 mw-25" v-for="proyecto in proyectos" :key="proyecto.id">
          <router-link :to="{name: 'proyecto', params: { id: proyecto.id }}" class="col">
            <div class="card-header fw-bold fs-4" style="color: #454545 !important; background: #C6EDE2">
              {{ upper(proyecto.titulo) }}
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0 mt-4">
                <p class="fs-4" style="color: #454545 !important; ">{{ proyecto.descripcion }}</p>
                <footer class="blockquote-footer mt-3 fs-5">Creador: <cite title="Título de la fuente">{{ getUser(proyecto.creador) }}</cite></footer>
              </blockquote>
            </div>
          </router-link>
        </div>
      </div>
      <pagination
          :pagination="pagination"
          @go-to-page="gotoPage"
          class="d-flex flex-wrap my-5 justify-content-center"
      />
    </div>
</template>


<script>

import usuariosData from "../database/usuarios.json";
import axios from "axios";
import API from "@/routes/API";
import pagination from "@/components/pagination.vue";
import {getUserID} from "@/utils/login";
export default {
  name: "listadoProyectos",
  data(){
    return {
      proyectos : [],
      usuarios: usuariosData,
      pagination: {}
    }
  },
  components:{
    pagination
  },
  mounted() {
    axios.get(API + '/proyectos/?user='+ getUserID())
        .then(response => {
          this.proyectos = response.data.content;
          this.pagination = response.data.pagination
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    getUser (idUser){
      const user = this.usuarios[idUser]
      return user.username;
    },
    gotoPage(page) {
      axios.get(page)
        .then(response => {
          this.proyectos = response.data.content;
          this.pagination = response.data.pagination;
        })
        .catch(error => {
          console.log(error);
        });
    },
    upper(title){
      return title.toUpperCase()
    }
  }
}

</script>

<style scoped>

.proyects-card {
  align-items: center;
  text-align: center;
  width: 17rem;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>