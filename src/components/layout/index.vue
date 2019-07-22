<template>
  <div class="app-wrapper" :class="sidebar ? 'openSideBar' : 'closeSideBar'">
    <div class="sidebar-container">
      <sun-menu></sun-menu>
    </div>
    <div class="main-container">
      <sun-header></sun-header>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import SunHeader from './sunHeader.vue'
import SunMenu from './sunMenu.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Layout',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  components: {SunHeader, SunMenu}
}
</script>

<style scoped lang="scss">
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .sidebar-container {
      transition: width 0.28s;
      width: $sideBarWidth;
      background-color: $menuBg;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      /deep/ .el-menu {
        width: 100% !important;
        border: none;
      }
    }
    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: $sideBarWidth;
      position: relative;
    }
    .app-main {
      /* navbar height = 50 */
      height: calc(100vh - 50px);
      overflow-y: scroll;
      width: 100%;
      margin-top: 50px;
      position: relative;
    }
  }
  .closeSideBar {
    > .sidebar-container {
      width: $closeSideBarWidth;
      /deep/ .menu-wrapper {
        overflow-x: hidden;
        .el-submenu__title {
          padding: 0 !important;
          .svg-icon {
            margin-left: 20px;
          }
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
    > .main-container {
      margin-left: $closeSideBarWidth;
    }
    /deep/ .fix-header {
      width: calc(100% - #{$closeSideBarWidth});
    }
  }
</style>
