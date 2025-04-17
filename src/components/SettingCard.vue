<template>
  <v-btn
    variant="text"
    icon="mdi-cog-outline"
    @click="overlay = !overlay"
  ></v-btn>

  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-card max-width="400" class="mx-auto w-75">
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <p class="text-center text-sm-left mb-3">focus time</p>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="focusTime.minute"
              :type="'number'"
              :rules="rules"
              label="minutes"
              name="input-focus-minute"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="focusTime.second"
              :type="'number'"
              :rules="rules"
              label="seconds"
              name="input-focus-second"
            ></v-text-field>
          </v-col>
        </v-row>
        <p class="text-center text-sm-left mb-3">break time</p>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="breakTime.minute"
              :type="'number'"
              :rules="rules"
              label="minutes"
              name="input-focus-minute"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="breakTime.second"
              :type="'number'"
              :rules="rules"
              label="seconds"
              name="input-focus-second"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" @click="onSubmit" :disabled="!isUpdateValid"
          >Update</v-btn
        >
        <v-btn color="red" @click="overlay = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTimerStore } from "../stores/TimerStore";

const timerStore = useTimerStore();
const overlay = ref(false);
const focusTime = ref({
  minute: 25,
  second: 0,
});
const breakTime = ref({
  minute: 5,
  second: 0,
});

const rules = [(v) => !!v || "Time cannot be null"];

const isUpdateValid = computed(() => {
  return (
    focusTime.value.minute >= 0 &&
    focusTime.value.minute !== "" &&
    focusTime.value.second >= 0 &&
    focusTime.value.second !== "" &&
    breakTime.value.minute >= 0 &&
    breakTime.value.minute !== "" &&
    breakTime.value.second >= 0 &&
    breakTime.value.second !== ""
  );
});

const onSubmit = () => {
  timerStore.updateTime(
    focusTime.value.minute,
    focusTime.value.second,
    breakTime.value.minute,
    breakTime.value.second
  );
  overlay.value = false;
};
</script>
