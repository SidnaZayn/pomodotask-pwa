<template>
  <v-container class="text-center">
    <v-card class="mx-auto" max-width="400">
      <v-card-title>Timer</v-card-title>
      <v-card-subtitle>
        <div class="d-flex justify-center ga-3">
          <v-btn variant="tonal" :disabled="focusTime" @click="toFocusTime"
            >Focus Time</v-btn
          >
          <v-btn variant="tonal" :disabled="breakTime" @click="toBreakTime"
            >Break Time</v-btn
          >
        </div>
      </v-card-subtitle>
      <v-card-text>
        <h1>{{ formattedTime }}</h1>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="startTimer" :disabled="isRunning"
          >Start</v-btn
        >
        <v-btn color="error" @click="stopTimer" :disabled="!isRunning"
          >Stop</v-btn
        >
        <v-btn color="secondary" @click="resetTimer">Reset</v-btn>
        <v-btn color="success" @click="overlay = !overlay">Setting</v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :model-value="overlay" class="align-center justify-center">
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
  </v-container>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from "vue";
const timeFocusBase = 25 * 60;
const timeBreakBase = 5 * 60;
const time = ref(timeFocusBase); // 25 minutes in seconds
const timer = ref(null);
const isRunning = ref(false);
  const overlay = ref(false);
const focusTime = ref(true);
const breakTime = ref(false);

const formattedTime = computed(() => {
  const minutes = String(Math.floor(time.value / 60)).padStart(2, "0");
  const seconds = String(time.value % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
});

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true;
    timer.value = setInterval(() => {
      if (time.value <= 0) {
        clearInterval(timer.value);
        isRunning.value = false;
        if (focusTime.value) {
          toBreakTime(); // Switch to break time
        } else {
          toFocusTime(); // Switch to focus time
        }
        alert("Time's up!");
      } else {
        time.value--;
      }
    }, 1000);
  }
};

const stopTimer = () => {
  isRunning.value = false;
  clearInterval(timer.value);
};

const resetTimer = () => {
  stopTimer();
  time.value = timeFocusBase; // Reset to 25 minutes
};

const toBreakTime = () => {
  focusTime.value = false;
  breakTime.value = true;
  stopTimer();
  time.value = timeBreakBase; // Set to 5 minutes for break time
};

const toFocusTime = () => {
  focusTime.value = true;
  breakTime.value = false;
  stopTimer();
  time.value = timeFocusBase; // Set to 25 minutes for focus time
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
