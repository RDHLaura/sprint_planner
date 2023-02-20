<template >
  <div class="mt-5 ">
  <h2 class="my-4  display-4">Listado de tareas:</h2>
  <div v-if="msg !==''" class="p-3 mb-2" style="background-color: #C6EDE2">{{ this.msg }}</div>

  <h3 v-if="tareas.length === 0 && propietario" class="my-4 fs-3"> Aún no has creado tareas</h3>
  <h3 v-if="tareas.length === 0 && !propietario" class="my-4 fs-3"> Aún no se te han asignado tareas</h3>

  <table v-if="tareas.length !==0" class="table">
    <thead class="table-light fs-5 fw-bold">
    <tr class=" proyects-card">
      <th scope="col w-25" style="width: 40%;">Título
      <button type="button" class="btn" @click="sorteBy('descripcion')">
        <i :class="{'bi bi-sort-down'     : isSortedAsc.descripcion===false,
                    'bi bi-sort-down-alt' : isSortedAsc.descripcion}">
        </i>
      </button>
      </th>

      <th scope="col" style="width: 20%">Entrega
        <button type="button" class="btn" @click="sorteBy('fecha_entrega')">
          <i :class="{
                'bi bi-sort-down'     : isSortedAsc.fecha_entrega===false,
                'bi bi-sort-down-alt' : isSortedAsc.fecha_entrega
              }">
          </i>
        </button>
      </th>
      <th scope="col" style="width: 20%" >Estado
        <button type="button" class="btn" @click="sorteBy('estado')">
          <i :class="{
                'bi bi-sort-down'     : isSortedAsc.estado===false,
                'bi bi-sort-down-alt' : isSortedAsc.estado
              }">
          </i>
        </button>
      </th>
      <th scope="col" style="width: 20%">Asignada a
        <button type="button" class="btn" @click="sorteBy('nameUserAsigned')">
          <i :class="{
                'bi bi-sort-down'     : isSortedAsc.nameUserAsigned===false,
                'bi bi-sort-down-alt' : isSortedAsc.nameUserAsigned
              }">
          </i>
        </button>
      </th>
    </tr>
    </thead>

    <tbody >
        <tr v-for="(todo) in tareas" :key="todo.id" >
          <td class="pt-3 fs-3"  >{{ todo.titulo }}
          <p class="fs-5" >{{ todo.descripcion }}</p>
          </td>
          <td class="pt-3 fs-5"> {{ todo.fecha_entrega}}</td>
          <td class="pt-3">
            <div class="d-flex justify-content-start align-items-center">
              <div class="status-indicator mb-1 me-2"
                  :class="{
                    'status-indicator-todo'     : todo.estado === 'no-empezado',
                    'status-indicator-ongoing'  : todo.estado === 'en-proceso',
                    'status-indicator-finished' : todo.estado === 'terminada',}">
              </div>
              <div class="status-text"
                  @click="changeStatus(todo.id, todo.estado)"
                  :class="{
                      'status-text-todo'    : todo.estado === 'no-empezado',
                      'status-text-ongoing' : todo.estado === 'en-proceso',
                      'status-text-finished': todo.estado === 'terminada',}">
                <p class="fs-5">{{ todo.estado }}</p>
              </div>
            </div>
          </td>
          <td class="pt-3 fs-5">{{ todo.nameUserAsigned}}</td>
          <td v-if="propietario" class="pt-3"><a @click="eliminar(todo.id)" class="bi bi-x-octagon fs-4 status-text-todo"></a></td>
        </tr>
    </tbody>
  </table>
    <pagination
        :pagination="pagination"
        @go-to-page="gotoPage"
        class="d-flex flex-wrap mt-5 justify-content-center"
    />
  </div>

</template>


<script>
/**
 * @file listadoTareas.vue - Lista las tareas obtenidas desde la API
 * @author Laura Rodríguez
 */

import usuariosData from "../database/usuarios.json";
import {useRoute} from "vue-router";
import sortJsonArray from 'sort-json-array';
import axios from "axios";
import API from "@/routes/API";
import {esUsuarioRegistrado } from "@/utils/login";
import pagination from "@/components/pagination.vue";

/**
 * @vue-prop {Boolean} propietario - Indica si el usuario registrado es el propietario del proyecto
 *
 * @vue-data {Object} [data - {}] - Almacena la respuesta de la API
 * @vue-data {Object}[pagination = {}] - Almacena la paginación que devuelve la API.
 * @vue-data {Array}[tareas = []] - Almacena las tareas devueltas por la API ya filtradas para el usuario registrado.
 * @vue-data {Object}[usuarios = usuariosData] - Almacena los datos de los usuarios registrados.
 * @vue-data {Array}[todoStatus = ["no-empezado", "en-proceso", "terminada"]] - Almacena los posibles estados de las tareas.
 * @vue-data {Object}[isSortedAsc = {"descripcion": true, "fecha_entrega":true,"estado": true,"nameUserAsigned": true}] - Almacena los filtros de ordenación de las tareas.
 *
 * @vue-event sorteBy - Ordena la tabla de tareas según el filtro pasado por parámetro
 * @vue-event changeStatus - Cambia el estado de la tarea
 * @vue-event getUser - Devuelve el nombre de usuario del usuario registrado
 * @vue-event eliminar - Elimina una tarea
 * @vue-event gotoPage - pide los proyectos de la siguiente página a la API
 */
export default {
  name: "ListadoTareas",
  props:{
    propietario:{
      type: Boolean
    }
  },
  data(){
    return {
      data        : {},
      pagination  : {},
      tareas      : [],
      usuarios    : usuariosData,
      todoStatus  : ["no-empezado", "en-proceso", "terminada"],
      isSortedAsc : {"descripcion": true, "fecha_entrega":true,"estado": true,"nameUserAsigned": true},
      esCreador   : false,
      msg         : ""
    }
  },
  components:{
    pagination
  },
  mounted() {
    const route = useRoute();

    axios.get(API + '/tareas?proyecto='+ route.params.id)
        .then(response => {
          this.data       = response.data
          this.pagination = response.data.pagination
          response.data.content.map(tarea =>{
            if(this.propietario)
              this.tareas.push({...tarea, nameUserAsigned: this.usuarios[tarea.asignada_a].username})
            else if(esUsuarioRegistrado(tarea.asignada_a))
              this.tareas.push({...tarea, nameUserAsigned: this.usuarios[tarea.asignada_a].username})

          })
        })
        .catch(error => {
          console.log(error);
        });
  },

  methods : {
    sorteBy(property){
      (this.isSortedAsc[property]) ?
          sortJsonArray(this.tareas, property, "asc") :
          sortJsonArray(this.tareas, property, "des") ;
      this.isSortedAsc[property] = !this.isSortedAsc[property]
    },
    changeStatus(index, estado) {
      let statusIndex = this.todoStatus.indexOf(estado);
      if (++statusIndex > 2) statusIndex = 0;

      this.tareas.map(task =>{
        if(task.id == index)
          task.estado = this.todoStatus[statusIndex]
      })
    },
    getUser (idUser){
      return  this.usuarios[idUser].username
    },
    eliminar(idTarea){

      axios.delete(API + '/tareas/'+ idTarea)
        .then(response => {
          if(response.status==200){
            this.msg= "Tarea borrada correctamente."
            this.$emit('componenteCreado');
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    gotoPage(page) {
      axios.get(page)
          .then(response => {
            this.proyectos  = response.data.content;
            this.pagination = response.data.pagination;
          })
          .catch(error => {
            console.log(error);
          });
    },
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
  color: blue;
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
  background: blue;
}
.status-indicator-finished {
  background: green;
}

</style>