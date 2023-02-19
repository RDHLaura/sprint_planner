import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css';
import router from "./routes/routes";
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router).mount('#app')


import "bootstrap/dist/js/bootstrap.js";