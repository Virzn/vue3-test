import { createApp,Vue } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './public-path';

//main.js
import htmlToPdf from './utils/htmlToPdf';
// Vue.use(htmlToPdf);


let app;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).use(store).use(htmlToPdf).use(router).mount('#app')
} else {
  renderWithQiankun({
    // 子应用挂载
    mount(props) {
      app = createApp(App);
      app.mount(props.container.querySelector('#app'));
    },
    // 只有子应用第一次加载会触发
    bootstrap() {
      console.log('vue app bootstrap');
    },
    // 更新
    update() {
      console.log('vue app update');
    },
    // 卸载
    unmount() {
      console.log('vue app unmount');
      app?.unmount();
    }
  });
}
