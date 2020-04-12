<template>
  <div class="hello">
    <section>
      <p style="display: flex; justify-content: space-between">
        <span>1111121212122121</span>
        <span>99989889898989898</span>
      </p>
      <header :class="$style.title">Hello World</header>
      <div>
        <p :class="$style['div-content']">哈哈哈哈</p>
      </div>
      <xh-table :columns="columns1" :data="data1" height="250px"></xh-table>
    </section>
  </div>
</template>

<script>
import xhTable from '@/components/xh-table'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'CSS module',
      columns1: [
        {
          type: 'selection',
          width: 60
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        },
        {
          name: '周小伟2',
          age: 26,
          address: '深圳市南山区深南大道'
        },
        {
          name: '周小伟3',
          age: 26,
          address: '深圳市南山区深南大道'
        },
        {
          name: '周小伟4',
          age: 26,
          address: '深圳市南山区深南大道'
        },
        {
          name: '周小伟5',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    }
  },
  components: {
    xhTable
  }
}
</script>

<!-- css modules  -->
<style module>
  .title {
    color: red;
  }
  .div-content {
    font-weight: 600;
    font-size: 20px;
  }
</style>
