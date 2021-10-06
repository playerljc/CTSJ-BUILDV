import MyCom2 from './MyCom2';

// @ts-ignore
import styles from './MyCom1.less';

export default {
  props: {
    name: {
      type: String,
    },
    sex: {
      type: String,
    },
    birthDay: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    displayCount() {
      // @ts-ignore
      return this.count;
    },
  },
  mounted() {
    // @ts-ignore
    console.log(this.$slots);
  },
  render() {
    return (
      <div class={styles.Wrap}>
        {/*@ts-ignore*/}
        <p>{this.name}</p>
        {/*@ts-ignore*/}
        <p>{this.sex}</p>
        {/*@ts-ignore*/}
        <p>{this.birthDay}</p>
        {/*@ts-ignore*/}
        <p>{this.address}</p>
        <p
          onClick={() => {
            // @ts-ignore
            this.count += 1;
          }}
        >
          {
            // @ts-ignore*
            this.displayCount
          }
        </p>
        {/*@ts-ignore*/}
        <p>{this.$slots.default}</p>
        {/*@ts-ignore*/}
        <p>{this.$slots.name1}</p>
        <p>
          {/*@ts-ignore*/}
          {this.$scopedSlots.name2({
            // @ts-ignore*
            name: this.name,
          })}
        </p>
        {/*@ts-ignore*/}
        <MyCom2 />
      </div>
    );
  },
};
