
<template>
  <div>
    <newTask @actualizar="actualizar" class="square border border-secondary" v-if="showSquare" />
    <button id="toggle-square" @click="toggleSquare">
      <i v-if="!showSquare" class="bi bi-plus-square"></i>
      <i v-if="showSquare" class="bi bi-x-square"></i>
    </button>
  </div>
</template>

<script>
/**
 * @file button_newTask.vue - Botón que abre la vista de creación de la tarea
 * @author Laura Rodríguez
 */

  import newTask from "@/components/taskForm.vue";

/**
 * @vue-data {Boolean}[showSquare = false] - Almacena true o false si el componente CrearProyecto esta visible
 * @vue-event toggleSquare - cambia el valor a showSquare
 */
  export default {
    data() {
      return {
        showSquare: false,
      };
    },
    methods: {
      toggleSquare() {
        this.showSquare = !this.showSquare;
      },
      actualizar() {
        // lógica de la acción
        this.showSquare = !this.showSquare;
        this.$emit('componenteCreado')
      },
    },
    components:{
      newTask,
    }
  };
</script>

<style scoped>
  #toggle-square {
    position: fixed;
    top: 10rem;
    right: 10%;
    width: 4rem;
    height: 4rem;
    border-radius: 20px;
    color: black;
    background-color:  #C6EDE2;
    transition: all 0.3s ease-in-out;
    font-size: 2rem;
    border-width: 0px;
    z-index: 100;
  }
  #toggle-square:hover {
    transform: translateY(-10px);
    font-size: 1.7rem;
    cursor: pointer;
  }

  .square {
    position: fixed !important;
    top: 51%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw !important;
    height: 75vh !important;
    background-color: #F8F9FA;
    border-radius: 20px;
    padding: 20px;
    overflow: scroll;
    overflow-x: hidden;

  }
</style>