<script setup>
import { RouterView } from 'vue-router';
import Navbar from "@/components/navbar.vue";

</script>

<template >
  <Navbar />
  <main class="main">
    <RouterView />
  </main>

</template>

<style scoped>
.main{
  padding: 0 2rem;
  height: 90vh;
}




</style>
