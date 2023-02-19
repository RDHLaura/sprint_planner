<template >
  <nav aria-label="Page navigation example" >
    <ul class="pagination" style="color: #64D7B1 !important;">
      <li :class=" {
        'page-item disable' : pagination.previous === null,
        'page-item': pagination.previous !== null
      }" >
        <button
            @click="gotoPage(pagination.previous)"
            class="page-link fs-4"
            style="color: #64D7B1 !important;">
          Previous
        </button>
      </li>

      <li class="page-item disabled"><a class="page-link fs-4" href="#">{{pagination.actualPage}}</a></li>

      <li :class=" {
        'page-item disable' : pagination.next === null,
        'page-item': pagination.next !== null
      }">
        <button  @click="gotoPage(pagination.next)"
                 class="page-link fs-4"
                 style="color: #64D7B1 !important;">
          Next
        </button>
      </li>
      <!--  <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      -->
    </ul>
  </nav>
</template>

<style scoped>
*{
  margin-bottom: 5rem !important;
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