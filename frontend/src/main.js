import { createAPP } from "vue";
import { createPinia } from "pinia";
import app from "./App.vue";
import router from "./router"

const app = createAPP(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
