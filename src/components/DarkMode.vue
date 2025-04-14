<template>
  <v-btn
    @click="toggleTheme"
    variant="text"
    :icon="
      theme.global.name.value === 'light'
        ? 'mdi-weather-sunny'
        : 'mdi-weather-night'
    "
  ></v-btn>
</template>

<script setup>
import { ref } from "vue";

import { useTheme } from "vuetify";

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<style scoped>
v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
