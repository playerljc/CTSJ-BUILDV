import Vue from 'vue';
export default Vue.extend({
    render() {
        const { $slots } = this;
        return (<div>
        My2
        {$slots.self}
        {$slots.self1}
        {this.$scopedSlots.self2({ name: '111' })}
      </div>);
    },
});
//# sourceMappingURL=My2.jsx.map