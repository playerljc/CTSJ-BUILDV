// import Vue from 'vue';

export default {
  // component: Vue.extend({
  //   methods: {
  //     renderInner: function () {
  //       // @ts-ignore
  //       return <div>我是JSX写的组件666</div>;
  //     },
  //   },
  //   render: function (h) {
  //     // @ts-ignore
  //     return this.renderInner(h);
  //   },
  // }),
  name: 'my-component',
  methods: {
    // @ts-ignore
    renderInner(h) {
      // @ts-ignore
      return <div>我是JSX写的组件666</div>;
    },
  },
  // @ts-ignore
  render(h) {
    // @ts-ignore
    return this.renderInner(h);
  },
};

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
