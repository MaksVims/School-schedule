import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import { router } from './router/index';
import { createPinia } from 'pinia';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
