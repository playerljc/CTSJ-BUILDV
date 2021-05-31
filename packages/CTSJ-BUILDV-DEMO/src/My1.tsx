import My2 from './My2';
// import My3 from './My3';
import Fragment from './Fragment';

import { Modal, Button } from 'ant-design-vue';

export default {
  methods: {
    renderFooter(h) {
      return (
        <div>
          <Button key="ok">ok</Button>
          <Button key="cancel">cancel</Button>
          <Button>111</Button>
        </div>
      );
    },
  },
  render(h) {
    const config = {
      props: {
        closable:false,
        maskClosable:false,
        title:'提示',
        width:300,
        zIndex:1000,
        centered:true,
        wrapClassName:"adherev-ui-messagedialog",
        visible: true,
      }
    }

    return (
      <div>
        <div>My1</div>
        <My2>
          {/* <My3 slot="self" /> */}
          <Fragment slot="self">111----------11111111111</Fragment>
          <div slot="self1">222</div>
        </My2>

        <Modal
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
        </Modal>
      </div>
    );
  },
};
