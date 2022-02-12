import { createApp, h } from 'vue';
import Antd from 'ant-design-vue';

// @ts-ignore
import Package from '@ctsj/buildv-package';

console.log('Package', Package);

import App from './App.vue';
import My1 from './My1';

import 'ant-design-vue/dist/antd.css';
import './index.less';

console.log('App', App);

createApp({
  render() {
    return h(App as any);
  },
})
  .use(Antd)
  .use(Package)
  .component('my1', My1)
  .mount('#app');

// app.config.productionTip = false;

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');
