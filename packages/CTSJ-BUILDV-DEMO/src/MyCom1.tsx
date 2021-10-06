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
  // @ts-ignore
  render(h) {
    // @ts-ignore
    // @ts-ignore
    return (
      // @ts-ignore
      <div class={styles.Wrap}>
        <p>{this.name}</p>
        <p>{this.sex}</p>
        <p>{this.birthDay}</p>
        <p>{this.address}</p>
        <p
          onClick={() => {
            this.count += 1;
          }}
        >
          {this.displayCount}
        </p>
        <p>{this.$slots.default}</p>
        <p>{this.$slots.name1}</p>
        <p>
          {this.$scopedSlots.name2({
            name: this.name,
          })}
        </p>
        {/*@ts-ignore*/}
        <MyCom2 />
      </div>
    );
  },
};
