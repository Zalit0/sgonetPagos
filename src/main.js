import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import Aos from 'aos';
import 'aos/dist/aos.css';

Aos.init();
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
