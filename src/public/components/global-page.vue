<template>
  <div class="global-page">
    <el-row>
      <div  class="global-page__title">
        {{ title }}
      </div>
    </el-row>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'globalPage',
  props: {
    title: {
      type: String
    }
  }
}
</script>
<style scoped lang="scss">
  .global-page {
    &__title {
      color: #a6a6a6;
      font-size: 18px;
      font-weight: 500;
    }
  }
</style>
