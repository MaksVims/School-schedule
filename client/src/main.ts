import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import { router } from './router/index';
import { createPinia } from 'pinia';

import { Modal } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Modal)
app.mount('#app')
