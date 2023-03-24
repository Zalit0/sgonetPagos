import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import Aos from 'aos';
import 'aos/dist/aos.css';



import './assets/css/mobirise2.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import './assets/css/dropdown/css/style.css'
import './assets/css/socicon/css/styles.css'
import './assets/css/style.css'
import './assets/css/mbr-additional.css'
import 'bootstrap/dist/js/bootstrap.min.js';

Aos.init();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
