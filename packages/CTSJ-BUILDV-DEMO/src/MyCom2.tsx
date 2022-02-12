import { defineComponent } from 'vue';

import My1 from './My1';

export default defineComponent({
  render() {
    return (
      <div>
        我是MyCom2
        {/*@ts-ignore*/}
        <My1 />
      </div>
    );
  },
});
