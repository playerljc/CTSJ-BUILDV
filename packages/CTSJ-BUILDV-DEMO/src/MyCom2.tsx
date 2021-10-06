import My1 from './My1';

export default {
  render() {
    return (
      <div>
        我是MyCom2
        {/*@ts-ignore*/}
        <My1 />
      </div>
    );
  },
};
