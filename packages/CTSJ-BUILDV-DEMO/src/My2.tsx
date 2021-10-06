export default {
  // @ts-ignore
  render(h) {
    // @ts-ignore
    const { $slots } = this;

    return (
      <div>
        My2
        {$slots.self}
        {$slots.self1}
        {/* @ts-ignore*/}
        {this.$scopedSlots.self2({ name: '111' })}
      </div>
    );
  },
};
