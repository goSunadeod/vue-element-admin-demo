<template>
  <div class="navbar navbar-show" >
    <div class="menu-fold">
      <i class="el-icon-s-fold fold-icon"></i>
    </div>
    <div class="avatar-content">
      <el-avatar :src="src" :size="40"></el-avatar>
      <i class="el-icon-caret-bottom"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: require('../../assets/images/avatar.png')
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    position: fixed;
    z-index: 99;
    top: 0;
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu-fold {
      padding: 0 15px;
      cursor: pointer;
      line-height: 60px;
      height: 100%;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    .fold-icon {
        font-size: 28px;
        color: #606266;
      }
    }
    .avatar-content {
      margin-right: 40px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: 22px;
      top: 28px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .navbar-show {
    width: calc(100% - 210px);
  }
</style>
