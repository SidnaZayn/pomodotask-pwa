<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import PWABadge from "./components/PWABadge.vue";
import DarkMode from "./components/DarkMode.vue";
import SettingCard from "./components/SettingCard.vue";
import Timer from "./components/Timer/Main.vue";
import Todo from "./components/Todo/Main.vue";
import { computed, ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const currentTheme = computed(() => {
  return theme.global.current.value.dark ? "light" : "dark";
});
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="currentTheme">
      {{ currentTheme }}
      <v-container>
        <a href="https://vite.dev" target="_blank">
          <img src="/favicon.svg" class="logo" alt="pomodotask logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
        <h1>pomodotask</h1>
        <h3>pomodoro + task app</h3>
      </v-container>
      <div class="d-flex justify-center">
        <DarkMode />
        <SettingCard />
      </div>
      <Timer />
      <v-container>
        <Todo />
      </v-container>
      <HelloWorld />
      <PWABadge />
    </v-app>
  </v-responsive>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
