import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import '@mdi/font/css/materialdesignicons.css' 
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi",
  },
});

createApp(App).use(vuetify).use(pinia).mount("#app");
