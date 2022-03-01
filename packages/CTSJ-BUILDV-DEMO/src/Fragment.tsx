import { defineComponent } from 'vue';

export default defineComponent({
  // @ts-ignore
  render() {
    // @ts-ignore
    return this.$slots.default;
  },
});
