<template>
  <div class="dashboard-admin">
    <div class="text-center">dashboard admin（动态组件</div>
    <div class="dashboard-admin-wrapper">
      <div class="line">
        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {}
  }
}
</script>

<style lang="scss" soped>
  .dashboard-admin {
    &-wrapper {
      width: 90%;
      margin: 0 auto;
      height: 150px;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      .line {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #bfbfbf;
      }
    }
  }
</style>
