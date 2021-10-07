// import Com from './index.vue';
import Com from './component';

Com.install = function (Vue) {
  Vue.component(Com.name, Com);
};

export default Com;
