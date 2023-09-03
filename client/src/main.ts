import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import { router } from './router/index';
import { createPinia } from 'pinia';

import { Modal, Input, Switch, ConfigProvider, Space, Row, Col, Button, Layout, LayoutHeader, LayoutContent } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
const pinia = createPinia()

const AntDesignComponents = [
  Modal, Input, Switch,  Space, Row, Col, Button, Layout, LayoutHeader, LayoutContent, ConfigProvider
]

AntDesignComponents.forEach(component => {
  app.use(component)
})

app.use(router)
app.use(pinia)
app.mount('#app')
