<template >
  <table class="table">
    <thead class="table-light">
    <tr class=" proyects-card">
      <th scope="col">Descripción
      <button type="button" class="btn" @click="sorteBy('descripcion')">
        <i class="bi bi-sort-down"></i>
      </button>
      </th>
      <th scope="col">Fecha de entrega
        <button type="button" class="btn" @click="sorteBy('fecha_entrega')">
          <i class="bi bi-sort-down"></i>
        </button>
      </th>
      <th scope="col">Estado
        <button type="button" class="btn" @click="sorteBy('estado')">
          <i class="bi bi-sort-down"></i>
        </button>
      </th>
      <th scope="col">Asignada a
        <button type="button" class="btn" @click="sorteBy('nameUserAsigned')">
          <i class="bi bi-sort-down"></i>
        </button>
      </th>
    </tr>
    </thead>

    <tbody >
        <tr v-for="(todo, index) in tareas" :key="index" >
          <td class="pt-3"> {{ todo.descripcion }} </td>
          <td class="pt-3"> {{ todo.fecha_entrega}}</td>
          <td class="pt-3">
            <div class="d-flex justify-content-start align-items-center">

              <div
                  class="status-indicator mb-1 me-2"
                  :class="{
                    'status-indicator-todo': todo.estado === 'no-empezado',
                    'status-indicator-ongoing': todo.estado === 'en-proceso',
                    'status-indicator-finished': todo.estado === 'terminada',
                  }"
              ></div>
              <div
                  class="status-text"
                  @click="changeStatus(index)"
                  :class="{
                      'status-text-todo': todo.estado === 'no-empezado',
                      'status-text-ongoing': todo.estado === 'en-proceso',
                      'status-text-finished': todo.estado === 'terminada',
                    }">
                <p class="fs-6">{{ todo.estado }}</p>
              </div>
            </div>
          </td>
          <td class="pt-3">{{ todo.nameUserAsigned}}</td>

        </tr>
    </tbody>
  </table>
</template>


<script>
import tareasData from "../database/tareas.json";
import usuariosData from "../database/usuarios.json";
import {useRoute} from "vue-router";
import sortJsonArray from 'sort-json-array';

export default {
  name: "ListadoTareas",
  data(){
    return {
      tareas : [],
      usuarios: usuariosData,
      todoStatus: ["no-empezado", "en-proceso", "terminada"],
    }
  },
  mounted() {
    const route = useRoute()
    this.tareas = tareasData.filter((tarea)=> route.params.id == tarea.id_proyecto )
    this.tareas.map(tarea =>{
      tarea.nameUserAsigned = (this.usuarios.filter((user)=> user.id == tarea.asignada_a)[0].username)
    })


  },
  methods : {
    sorteBy(property){
      sortJsonArray(this.tareas, property);
    },
    changeStatus(index) {
      let statusIndex = this.todoStatus.indexOf(this.tareas[index].estado);
      if (++statusIndex > 2) statusIndex = 0;
      this.tareas[index].estado = this.todoStatus[statusIndex];
    },
    getUser (idUser){
      const user = this.usuarios.filter((user)=> user.id == idUser);
      return user[0].username
    }
  }
}

</script>

<style scoped>

.proyects-card {


  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/*Estados de la tarea*/
.status-text {
  font-weight: bold;
  cursor: pointer;
}
.status-text-todo {
  color: red;
}
.status-text-ongoing {
  color: yellow;
}
.status-text-finished {
  color: green;
}
.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.status-indicator-todo {
  background: red;
}
.status-indicator-ongoing {
  background: yellow;
}
.status-indicator-finished {
  background: green;
}

</style>