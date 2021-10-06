export default {
  props: ['name'],
  render() {
    return (
      <div>
        {/*@ts-ignore**/}
        {this.name}
      </div>
    );
  },
};
