<template>
  <v-overlay :model-value="props.overlay" class="align-center justify-center">
    <v-card max-width="400" class="mx-auto">
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <p>Settings content goes here.</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="overlay = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup>
// overide overlay ref to become props
const props = defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:overlay"]);

</script>
