<template>
  <v-container class="text-center">
    <v-card class="mx-auto" max-width="400">
      <v-card-title>Timer</v-card-title>
      <v-card-subtitle>
        <div class="d-flex justify-center ga-3">
          <v-btn variant="tonal" :disabled="timerStore.focusTime" @click="toFocusTime"
            >Focus Time</v-btn
          >
          <v-btn variant="tonal" :disabled="timerStore.breakTime" @click="toBreakTime"
            >Break Time</v-btn
          >
        </div>
      </v-card-subtitle>
      <v-card-text>
        <h1>{{ formattedTime }}</h1>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="startTimer" :disabled="timerStore.isRunning"
          >Start</v-btn
        >
        <v-btn color="error" @click="stopTimer" :disabled="!timerStore.isRunning"
          >Stop</v-btn
        >
        <v-btn color="secondary" @click="resetTimer">Reset</v-btn>
        <SettingCardButton />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
import SettingCardButton from "./SettingCard.vue";
import { useTimerStore } from "../../stores/TimerStore.js";

const timerStore = useTimerStore();
const timer = ref(null);

const formattedTime = computed(() => {
  const minutes = String(Math.floor(timerStore.time / 60)).padStart(2, "0");
  const seconds = String(timerStore.time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  if (!timerStore.isRunning) {
    timerStore.isRunning = true;
    timer.value = setInterval(() => {
      if (timerStore.time <= 0) {
        clearInterval(timer.value);
        timerStore.isRunning = false;
        if (timerStore.focusTime) {
          toBreakTime(); // Switch to break time
        } else {
          toFocusTime(); // Switch to focus time
        }
        alert("Time's up!");
      } else {
        timerStore.time--;
      }
    }, 1000);
  }
};

const stopTimer = () => {
  timerStore.isRunning = false;
  clearInterval(timer.value);
};

const resetTimer = () => {
  stopTimer();
  timerStore.time = timerStore.timeFocusBase; // Reset to 25 minutes
};

const toBreakTime = () => {
  timerStore.focusTime = false;
  timerStore.breakTime = true;
  stopTimer();
  timerStore.time = timerStore.timeBreakBase; // Set to 5 minutes for break time
};

const toFocusTime = () => {
  timerStore.focusTime = true;
  timerStore.breakTime = false;
  stopTimer();
  timerStore.time = timerStore.timeFocusBase; // Set to 25 minutes for focus time
};

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style scoped>
h1 {
  font-size: 3rem;
  margin: 0;
}
</style>
