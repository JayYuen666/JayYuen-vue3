import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import App from './App.vue';
import store from './store/index.ts';
import router from './router/index.ts';

import 'element-plus/dist/index.css';
import '@/assets/main.css';
import '@/style/index.less';
import '@/common/default.less';

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount('#app');
