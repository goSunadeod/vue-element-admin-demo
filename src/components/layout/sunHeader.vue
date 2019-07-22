<template>
  <div class="fix-header" >
    <div class="navbar">
      <div class="menu-fold" @click="toggleClick">
        <i class="fold-icon" :class="sidebar ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
      </div>
      <div class="avatar-content">
        <screenfull class="right-menu-item hover-effect" />
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <el-avatar :src="src" :size="40" class="avatar-image"></el-avatar>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-check">Amazing</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Screenfull from '@/components/Screenfull'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'sunHeader',
  components: {Screenfull},
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  data () {
    return {
      src: require('../../assets/images/avatar.png')
    }
  },
  methods: {
    toggleClick() {
      if (this.sidebar) {
        this.setSidebar(0)
      } else {
        this.setSidebar(1)
      }
    },
    ...mapMutations({
      setSidebar: 'SET_SIDEBAR'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .fix-header {
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    height: 50px;
    width: calc(100% - #{$sideBarWidth});
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
  .navbar {
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
      display: flex;
      align-items: center;
      .right-menu-item {
        padding: 0 12px;
        margin-right: 5px;
        height: 100%;
        font-size: 22px;
        color: #5a5e66;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }
    }
    .el-icon-caret-bottom {
      position: absolute;
      font-size: 12px;
      right: -8px;
      top: 21px;
      cursor: pointer;
    }
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      padding-right: 8px;
    }
  }
</style>
