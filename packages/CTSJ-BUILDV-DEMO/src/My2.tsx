export default {
  render(h) {
    const { $slots } = this;

    return (
      <div>
        My2
        {$slots.self}
        {$slots.self1}
      </div>
    );
  },
};
