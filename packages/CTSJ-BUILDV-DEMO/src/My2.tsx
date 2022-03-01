import { defineComponent } from 'vue';

export default defineComponent({
  render() {
    return (
      <div>
        My2
        {/* @ts-ignore*/}
        {this.$slots.self()}
        {/* @ts-ignore*/}
        {this.$slots.self1()}
        {/* @ts-ignore*/}
        {this.$slots.self2({ name: '111' })}
      </div>
    );
  },
});
