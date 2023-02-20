<template>
  <Navbar />
  <main class="d-flex flex-row m-5 justify-content-center">
    <div class="row mx-5">
      <div class="col d-flex flex-column text-center align-items-center vw-50">
        <h1>pagina de contacto</h1>
        <p class="w-75 m-3 fs-4">Plataforma de trabajo colaborativo online, para pequeños equipos que se inician en las metodologías ágiles.
          Permite organizar tus Sprints con tu equipo de forma sencilla. </p>
        <img :src="image" class="rounded mx-auto mt-5" style="max-width: 30rem"/>
      </div>
      <div class="col register-form mt-5 vw-50 register-form" >

       <h1>Formulario de contacto</h1>
      </div>
    </div>
  </main>


</template>

<script>

import Navbar from "../components/navbar.vue";
import image from "../assets/19719.jpg"
export default {
  name: 'contacto',
  components: {
    Navbar
  },
  data(){
    return{
      image: image
    }
  },


}
</script>