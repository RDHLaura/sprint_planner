<template>

  <form class="row align-items-start text-center collapse text-center"  id="crearTarea" novalidate @submit.prevent="submitForm">

    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm">Título tarea</span>
      <input v-model="formData.titulo" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
    </div>

    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm">Asignada a:</span>
      <select v-model="formData.asignada_a" class="form-select" aria-label="Default select example" id="asignedTo">
        <option selected >Miembro equipo </option>
        <option :value=" member.id " v-for="member in team" :key="member.id">{{ member.username }}</option>
      </select>
    </div>

    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text">Descripción</span>
      <textarea v-model="formData.descripcion" class="form-control" aria-label="With textarea"></textarea>
    </div>

    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text p-3 pb-2 pt-2"> Entrega: </span>
      <input v-model="formData.fecha_entrega" id="startDate" class="form-control" type="date" />
    </div>

    <input type="submit" value="Guardar" class="btn btn-outline-secondary" />

  </form>
</template>

<script>

export default {
  name: "createTaskForm",
  data(){

      return {
        formData: {
          "id": null,
          "titulo": "",
          "asignada_a": null,
          "descripcion": "",
          "fecha_entrega": "",
          "id_proyecto": 1,
          "estado": "en-proceso"
        }
      }

  },
  props:['team'],
  watch: {
    team() {
      this.$forceUpdate();
    }
  },
  methods:{
    submitForm() {
      console.log(JSON.stringify(this.formData));
    },
  }

}
</script>

<style scoped>

</style>