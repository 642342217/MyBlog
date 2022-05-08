import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/index';
import router from './router/index';
// import 'element-plus/dist/index.css'
import './assets/reset.css';
import './assets/iconfont/iconfont.css';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
