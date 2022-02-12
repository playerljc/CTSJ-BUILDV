import { defineComponent } from 'vue';

import My1 from './My1';

import {Button} from "ant-design-vue";

export default defineComponent({
  render() {
    return (
      <div>
        我是MyCom2
        {/*@ts-ignore*/}
        <My1 />

        <Button>JSX的ant-design-vue的Button</Button>
      </div>
    );
  },
});
