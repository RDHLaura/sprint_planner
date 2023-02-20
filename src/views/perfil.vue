<template>
  <Navbar />
  <main class="d-flex flex-row m-5 justify-content-center">
    <div class="row mx-5 gap-5 w-100 mt-5">
      <div class="col d-flex flex-column text-center align-items-center vw-50">
        <h1>Perfil de usuario</h1>
        <img :src="image" class="rounded mx-auto mt-5" style="max-width: 20rem"/>
      </div>
      <div class="col w-50" >
        <div>
          <h1>Datos de contacto</h1>
          <div class="bg-light m-3 px-5 py-4 rounded">
            <h2 class="h3 mb-3 fw-bold">Nombre de usuario:</h2>
            <p class="fs-4 mx-4">{{ user.username }}</p>
            <h2 class="h3 mb-3 fw-bold">Email:</h2>
            <p  class="fs-4 mx-4">{{ user.email }} </p>
            <h2 class="h3 mb-3 fw-bold">Github:</h2>
            <p  class="fs-4 mx-4">{{ user.github_username }} </p>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
/**
 * @file perfil.vue - Vista del perfil del usuario
 * @author Laura Rodríguez
 */
import Navbar from "../components/navbar.vue";
import image from "../assets/sample_avatars/avatar001.png";
import usuariosData from "../database/usuarios.json";

/**
 * @vue-data {image}[image = image] - Almacena la imagen de perfil del usuario
 * @vue-data {Object}[user = {}] - Almacena los datos del usuario registrado
 * @vue-data {Object}[usuarios = usuariosData] - Almacena los datos de los usuarios registrados.
 */
export default {
  name: 'perfil',
  components: {
    Navbar
  },
  data(){
    return{
      image     : image,
      usuarios  : usuariosData,
      user      : {},
    }
  },
  mounted() {
    const usuarioLogueado = 1
    this.user = this.usuarios[usuarioLogueado]
  }


}
</script>