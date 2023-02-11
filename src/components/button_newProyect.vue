
<template>
  <div>
    <CrearProyecto class="square" v-if="showSquare" />
    <button id="toggle-square" @click="toggleSquare"><i class="bi bi-plus-square"></i></button>
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

<style>
#toggle-square {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  width: 4rem;
  height: 4rem;
  border-radius: 20px;
  color: black; /* TODO color fondo*/
  transition: all 0.3s ease-in-out;
  font-size: 2rem;
  border-width: 0px;
}
#toggle-square:hover {
  transform: translateY(-10px);
  font-size: 2.2rem;
  cursor: pointer;
}

.square {
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw !important;
  height: 75vh !important;
  background-color: #F8F9FA;
  border-radius: 20px;
  padding: 20px;
  overflow: scroll;
}
</style>