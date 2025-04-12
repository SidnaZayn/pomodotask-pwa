import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const timeFocusBase = ref(25 * 60);
  const timeBreakBase = ref(5 * 60);
  const time = ref(timeFocusBase.value); // Current time in seconds
  const isRunning = ref(false); // Timer running state
  let timerInterval = null;

  const focusTime = ref(true);
  const breakTime = ref(false);

  const startTimer = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      timerInterval = setInterval(() => {
        time.value++;
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning.value) {
      isRunning.value = false;
      clearInterval(timerInterval);
    }
  };

  const resetTimer = () => {
    stopTimer();
    time.value = 0;
  };

  const updateTime = (focusMin, focusSec, breakMin, breakSec) => {
    timeFocusBase.value = focusMin * 60 + focusSec;
    timeBreakBase.value = breakMin * 60 + breakSec;
    if (focusTime.value) time.value = timeFocusBase.value;
    if (breakTime.value) time.value = timeBreakBase.value;
  };

  return {
    time,
    isRunning,
    timeBreakBase,
    timeFocusBase,
    focusTime,
    breakTime,
    startTimer,
    stopTimer,
    resetTimer,
    updateTime,
  };
});
