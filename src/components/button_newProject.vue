
<template>
  <div>
    <CrearProyecto class="square border border-secondary" v-if="showSquare" />
    <button id="toggle-square" @click="toggleSquare">
      <i v-if="!showSquare" class="bi bi-plus-square"></i>
      <i v-if="showSquare" class="bi bi-x-square"></i>
    </button>
  </div>
</template>

<script>
import CrearProyecto from "./crearProyecto.vue"
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
  },
  components:{
    CrearProyecto
  }
};
</script>

<style scoped>
#toggle-square {
  position: fixed;
  top: 2rem;
  left: calc(50% - 1.5rem);
  width: 3rem;
  height: 3rem;
  border-radius: 20px;
  color: black; /* TODO color fondo*/
  transition: all 0.3s ease-in-out;
  font-size: 1.5rem;
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
  top: 51% ;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw !important;
  height: 75vh !important;
  background-color: #F8F9FA;
  border-radius: 20px;
  padding: 20px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>