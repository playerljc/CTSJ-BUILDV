import { defineComponent } from 'vue';

export default defineComponent({
  render() {
    return (
      <div>
        My2
        {this.$slots.self()}
        {this.$slots.self1()}
        {this.$slots.self2({ name: '111' })}
      </div>
    );
  },
});
