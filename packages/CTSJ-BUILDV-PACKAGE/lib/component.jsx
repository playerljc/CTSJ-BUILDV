import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
export default defineComponent({
    name: 'my-component',
    props: {
        data: {
            type: Array,
            default: function () { return []; },
        },
    },
    render: function () {
        return (<div class="my-component">
        <p>我是JSX写的组件666</p>
        <Button>Button</Button>
      </div>);
    },
});
//# sourceMappingURL=component.jsx.map