export default {
  name: 'my-component',
  methods: {
    renderInner(h) {
      return <div>我是JSX写的组件666</div>;
    },
  },
  render(h) {
    return this.renderInner(h);
  },
};
