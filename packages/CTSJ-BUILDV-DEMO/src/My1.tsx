import { defineComponent } from 'vue';

import My2 from './My2';
// import My3 from './My3';
import Fragment from './Fragment';

import { /*Modal, */ Button } from 'ant-design-vue';

export default defineComponent({
  methods: {
    // @ts-ignore
    renderFooter() {
      return (
        <div>
          <Button>ok</Button>
          <Button>cancel</Button>
          <Button>111</Button>
        </div>
      );
    },
  },
  render() {
    // const config = {
    //   props: {
    //     closable: false,
    //     maskClosable: false,
    //     title: '提示',
    //     width: 300,
    //     zIndex: 1000,
    //     centered: true,
    //     wrapClassName: 'adherev-ui-messagedialog',
    //     visible: true,
    //   },
    // };

    // const aaa = {
    //   scopedSlots: {
    //     default: (props) => <My3 name={props.name} />,
    //   },
    // };

    const slots = {
      self: () => <Fragment>111----------11111111111</Fragment>,
      self1: () => <div>222</div>,
      self2: (props: any) => <div>{props.name}</div>,
    };

    return (
      <div>
        <div>My1</div>
        {/*@ts-ignore*/}
        <My2 v-slots={slots}>{/* <My3 slot="self" /> */}</My2>

        {/*<Modal
          // closable={false}
          // maskClosable={false}
          // title='提示'
          // width={300}
          // zIndex={1000}
          // centered={true}
          // wrapClassName="adherev-ui-messagedialog"
          // onCancel={() => {}}
          // visible

          {
            ...config
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <Fragment slot="title">222222</Fragment>
          <Fragment slot="footer">{this.renderFooter(h)}</Fragment>
        </Modal>*/}
      </div>
    );
  },
});
