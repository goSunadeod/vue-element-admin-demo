<template>
  <div>
    <p>我就是随便玩</p>
    <el-button type="primary" @click="$emit('click')">{{desc}}测试</el-button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'globalButton',
  props: {
    desc: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
</style>
