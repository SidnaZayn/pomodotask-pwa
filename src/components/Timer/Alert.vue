<template>
  <v-btn
    v-if="!timerStore.timeUp"
    variant="text"
    size="large"
    density="compact"
    :icon="timerStore.silentMode?'mdi-bell-off' :'mdi-bell'"
    @click="timerStore.silentMode = !timerStore.silentMode"
  >
  </v-btn>
  <v-btn
    v-else
    variant="text"
    size="large"
    density="compact"
    :icon="timerStore.silentMode?'mdi-bell-off' :'mdi-bell'"
    class="bell-ring"
    color="red"
  >
  </v-btn>
</template>

<script setup>
import { useTimerStore } from "../../stores/TimerStore.js";

const timerStore = useTimerStore();
</script>

<style scoped>
@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.bell-ring {
  animation: ring 0.5s infinite;
}
</style>
