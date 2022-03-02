import Vue from 'vue';

export default Vue.extend({
  render() {
    return this.$slots.default;
  },
});
