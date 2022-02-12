import { defineComponent } from 'vue';

export default defineComponent({
  props: ['name'],
  render() {
    return (
      <div>
        {/*@ts-ignore**/}
        {this.name}
      </div>
    );
  },
});
