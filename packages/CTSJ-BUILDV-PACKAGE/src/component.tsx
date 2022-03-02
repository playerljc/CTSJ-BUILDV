import { defineComponent, PropType } from 'vue';
import { Button } from 'ant-design-vue';

interface IDataItem {
  key: string;
  name: string;
  age: null;
  address: string;
  tags: string[];
}

export default defineComponent({
  name: 'my-component',
  props: {
    data: {
      type: Array as PropType<IDataItem[]>,
      default: () => [],
    },
  },
  render() {
    return (
      <div class="my-component">
        <p>我是JSX写的组件666</p>
        <Button>Button</Button>
      </div>
    );
  },
});
