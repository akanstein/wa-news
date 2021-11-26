import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import 'v-tooltip/dist/v-tooltip.css';
import "vue-toastification/dist/index.css";
import './index.css'

import { Tooltip } from 'v-tooltip';
import Toast from "vue-toastification";

const app = createApp(App);

app.component('VTooltip',Tooltip);
app.use(Toast);

app.use(router).mount('#app')
