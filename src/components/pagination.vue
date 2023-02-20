<template >
  <nav aria-label="Page navigation example" >
    <ul class="pagination" style="color: #64D7B1 !important;">
      <li v-if="pagination.previous !== null" class="page-item">
        <button @click="gotoPage(pagination.previous)"
                class="page-link fs-4"
                style="color: #64D7B1 !important;">
          Previous
        </button>
      </li>
      <li class="page-item disabled"><a class="page-link fs-4" href="#">{{pagination.actualPage}}</a></li>
      <li v-if="pagination.next !== null" class="page-item">
        <button @click="gotoPage(pagination.next)"
                class="page-link fs-4" style="color: #64D7B1 !important;">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
*{
  margin-bottom: 2rem !important;
}
</style>

<script>
  export default {
    props: {
      pagination:{
        type: Object,
        required: true
      },
    },
    data(){
      return {
        prevPageUrl: null,
        nextPageUrl: null
      }
    },
    methods: {
      gotoPage(pagina) {
        // Emitimos un evento al componente padre con la URL de la página a la que el usuario quiere ir
        this.$emit('go-to-page', pagina);
      }
    }
  };
</script>