import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import Package from '@ctsj/buildv-package';
import App from './App.vue';
import My1 from './My1';
// import Test from './Test';
import 'ant-design-vue/dist/antd.css';
import './index.less';
// console.log('App', App);
createApp(App)
    .use(Antd)
    // @ts-ignore
    .use(Package)
    .component('my1', My1)
    .mount('#app');
// app.config.productionTip = false;
// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');
//# sourceMappingURL=index.jsx.map