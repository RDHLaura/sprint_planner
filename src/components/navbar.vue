<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light position-nav mb-5">
    <div class="container-fluid">
      <a class="navbar-brand mx-5 fs-2 fw-semibold" @click="gotoDashboard" style="color: #454545 !important; ">
        SprintPlanner
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex  mb-2 mb-lg-0 mx-5">
          <li class="nav-item mx-2">
            <router-link to="/contacto" class="nav-link fs-4">Contacto </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link to="/perfil" class="nav-link fs-4">Perfil </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>


export default {
  name: "Navbar",
  methods:{
    gotoDashboard(){
      this.$router.push("/proyectos");
    }
  }
}
</script>
<style scoped>
.position-nav {
  position: sticky !important;
  top: 0;
  z-index: 10;
}
</style>