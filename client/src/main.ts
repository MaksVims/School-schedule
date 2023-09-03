import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import { router } from './router/index';
import { createPinia } from 'pinia';

import { Modal, Input, Switch, ConfigProvider, Space, Row, Col, Button, Layout, LayoutHeader, LayoutContent } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Modal)
app.use(Input)
app.use(Switch)
app.use(Space)
app.use(Row)
app.use(Col)
app.use(Button)
app.use(Layout)
app.use(LayoutHeader)
app.use(LayoutContent)
app.use(ConfigProvider)
app.mount('#app')
