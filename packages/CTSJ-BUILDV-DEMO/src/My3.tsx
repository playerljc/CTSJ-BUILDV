export default {
  props: ['name'],
  // @ts-ignore*
  render(h) {
    return (
      <div>
        {/*@ts-ignore**/}
        {this.name}
      </div>
    );
  },
};
