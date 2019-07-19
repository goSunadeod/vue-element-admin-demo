<template>
  <div class="menu-wrapper">
    <div v-for="item in 10" :key="item" class="el-submenu__titles">菜单</div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
  .menu-wrapper {
    height: 100%;
    position: relative;
    overflow: scroll;
    .el-submenu__titles {
      height: 56px;
      color: #f62dff;
      line-height: 56px;
      font-size: 14px;
      padding: 0 20px;
      list-style: none;
      cursor: pointer;
      position: relative;
      -webkit-transition: border-color .3s,background-color .3s,color .3s;
      transition: border-color .3s,background-color .3s,color .3s;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: nowrap;
    }
  }
</style>
