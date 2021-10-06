import My1 from './My1';

export default {
  // @ts-ignore
  render(h) {
    return (
      // @ts-ignore
      <div>
        我是MyCom2
        {/*@ts-ignore*/}
        <My1 />
      </div>
    );
  },
};
