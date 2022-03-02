import Vue from 'vue';

export default Vue.extend({
  props: ['name'],
  render() {
    return <div>{this.name}</div>;
  },
});
