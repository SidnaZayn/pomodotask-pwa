<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div class="card">
    <v-btn type="button" variant="tonal" @click="count++">count is {{ count }}</v-btn>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
