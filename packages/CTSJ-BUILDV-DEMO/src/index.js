import Vue from 'vue';
import Antd from 'ant-design-vue';

import Package from '@ctsj/buildv-package';

console.log('Package', Package);

import App from './App.vue';

import 'ant-design-vue/dist/antd.css';
import './index.less';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Package);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
