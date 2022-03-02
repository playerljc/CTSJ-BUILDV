import { defineComponent } from 'vue';

export default defineComponent({
  props: ['name'],
  render() {
    return <div>{this.name}</div>;
  },
});
