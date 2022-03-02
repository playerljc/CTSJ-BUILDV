import Vue from 'vue';
import Antd from 'ant-design-vue';

import Package from '@ctsj/buildv-package';

import App from './App.vue';
import My1 from './My1';

import 'ant-design-vue/dist/antd.css';
import './index.less';

Vue.config.productionTip = false;
Vue.use(Antd);
// @ts-ignore
Vue.use(Package);
Vue.component('my1', My1);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
