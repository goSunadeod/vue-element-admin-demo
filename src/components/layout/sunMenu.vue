<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <menu-item v-for="route in routes" :key="route.path" :item="route" :basePath="route.path"/>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import variables from '@/styles/variables.scss'
import MenuItem from './menuItem'
export default {
  name: 'sunMenu',
  components: {
    MenuItem
  },
  computed: {
    ...mapGetters([
      'routes',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      let defaultOpeneds = path.split('/')
      // 移除第一个空元素
      if (defaultOpeneds[0] === '') {
        defaultOpeneds.shift()
      }
      return defaultOpeneds[defaultOpeneds.length - 1]
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-wrapper {
    height: 100%;
    position: relative;
    overflow: scroll;
  }
</style>
