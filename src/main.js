import { createApp } from 'vue'

import App from './App.vue'
import router from "./router/index";




import ArcoVueIcon from  '@arco-design/web-vue/es/icon';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
const app  = createApp(App)
app.use(ArcoVue);
app.use(router)
app.use(ArcoVueIcon);
app.mount('#app')



