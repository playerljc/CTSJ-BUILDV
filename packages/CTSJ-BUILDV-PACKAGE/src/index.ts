// .vue
// @ts-ignore
// import Com from './index.vue';

// jsx
import Com from './component';

// @ts-ignore
Com.install = function (Vue) {
  Vue.component('my-component', Com);
};

export default Com;
