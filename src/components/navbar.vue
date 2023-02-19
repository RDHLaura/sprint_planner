<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light position-nav mb-5">
    <div class="container-fluid">
      <a class="navbar-brand mx-5 fs-2 fw-semibold" href="/" style="color: #454545 !important; ">
        SprintPlanner
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav d-flex  mb-2 mb-lg-0 mx-5">
          <li class="nav-item mx-2">
            <a class="nav-link fs-4" href="#">Contacto</a>
          </li>
          <li class="nav-item mx-2">
            <a class="nav-link active fs-4" aria-current="page" href="#">Perfil</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script>
/**
 * TODO
 * Cambiar los enlaces de la navbar
 * Incluir el logo
 * Página de contacto
 *
 */
export default {
  name: "Navbar"
}
</script>
<style scoped>
.position-nav {
  position: sticky !important;
  top: 0;
  z-index: 10;
}
</style>