export default {
  render(h) {
    const { $slots } = this;

    return (
      <div>
        My2
        {$slots.self}
        {$slots.self1}
        {this.$scopedSlots.self2({name:'111'})}
      </div>
    );
  },
};
