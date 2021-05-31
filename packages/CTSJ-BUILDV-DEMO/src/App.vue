<template>
  <div id="container" :class="$style.container">
    <img alt="Vue logo" src="../assets/logo.ico" />
    <div :class="$style.Text1">111</div>
    <div class="Text2">222</div>
    <div id="container2">333</div>
    <my-component :data="data" />
    <my-jsx :name="name" :sex="sex" :address="address" :birth-day="birthDay">
      <div>我是defaultSlot</div>
      <template v-slot:name1>
        <div>我是slot=name1的slot</div>
      </template>
      <template v-slot:name2="slotProps">
        <div>{{ slotProps.name }}</div>
      </template>
    </my-jsx>
    <MyCom2 />
  </div>
</template>

<script>
import MyJSX from './MyCom1';
import MyCom2 from './MyCom2';

export default {
  data() {
    return {
      name: '张三',
      sex: '男',
      address: '和平区',
      birthDay: '2021-10-09',
      data: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ],
    };
  },
  components: {
    'my-jsx': MyJSX,
    MyCom2: MyCom2,
  },
};
</script>

<style lang="less" module>
.container {
  margin-top: 60px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  > .Text1 {
    color: @primary-color;
  }

  :global(> .Text2) {
    color: aqua;
  }
}
</style>

<style>
#container2 {
  background-color: red;
}
</style>
