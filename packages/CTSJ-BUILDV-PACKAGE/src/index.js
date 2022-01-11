// .vue
// import Com from './index.vue';

// jsx
import Com from './component.jsx';

// @ts-ignore
Com.install = function(Vue) {
  Vue.component(Com.name, Com);
};

export default Com;
