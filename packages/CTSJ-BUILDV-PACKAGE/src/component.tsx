import Vue from 'vue';

//name: 'my-component',
export default {
  component: Vue.extend({
    methods: {
      renderInner: function (h) {
        // @ts-ignore
        return <div>我是JSX写的组件666</div>;
      },
    },
    render: function (h) {
      // @ts-ignore
      return this.renderInner(h);
    },
  }),
  name: 'my-component'
}


// Object.assign(
//   Vue.extend({
//     methods: {
//       renderInner: function (h) {
//         // @ts-ignore
//         return <div>我是JSX写的组件666</div>;
//       },
//     },
//     render: function (h) {
//       // @ts-ignore
//       return this.renderInner(h);
//     },
//   }),
//   { name: 'my-component' },
// );