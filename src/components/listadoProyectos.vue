<template >
    <div class="container px-4 text-center mt-5" >
      <div class="row gx-5 ">
        <div class="card proyects-card m-2" v-for="proyecto in proyectos" :key="proyecto.id">
          <router-link :to="{name: 'proyecto', params: { id: proyecto.id }}" class="col">
            <div class="card-header">
              {{ proyecto.titulo }}
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{{ proyecto.descripcion }}</p>
                <footer class="blockquote-footer">Creador: <cite title="Título de la fuente">{{ getUser(proyecto.creador) }}</cite></footer>
              </blockquote>
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>


<script>

import json from "../database/proyectos.json";
import usuariosData from "../database/usuarios.json";
export default {
  name: "listadoProyectos",
  data(){
    return {
      proyectos : json,
      usuarios: usuariosData,
    }
  },
  methods: {
    getUser (idUser){
      const user = this.usuarios.filter((user)=> user.id == idUser);
      return user[0].username;
    }
  }
}

</script>

<style scoped>

.proyects-card {

  align-items: center;
  text-align: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}



</style>