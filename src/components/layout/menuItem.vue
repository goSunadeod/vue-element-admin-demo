<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <el-submenu
      v-if="item.children && (item.children.length > 1 || (item.children.length === 1 && item.alwaysShow))"
      :key="item.path"
      :index="item.path"
      popper-append-to-body
    >
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <menu-item
        class="nest-menu"
        :base-path="`${parentPath}${child.path}`"
        v-for="child in item.children"
        :item="child"
        :key="child.path">
      </menu-item>
    </el-submenu>
    <el-menu-item v-else :key="item.path" :index="item.path" @click="navClick(item)">
      <template v-if="item.children && item.children.length === 1 && !item.alwaysShow">
        <item v-if="item.children[0].meta" :icon="item.children[0].meta && item.children[0].meta.icon" :title="item.children[0].meta.title" />
      </template>
      <template slot="title" v-else>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
    </el-menu-item>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'menuItem',
  components: { Item },
  props: {
    item: Object,
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    parentPath() {
      return this.basePath === '/' ? '/' : `${this.basePath}/`
    }
  },
  data() {
    return {
    }
  },
  methods: {
    navClick(item) {
      let path = this.basePath
      if (path !== '/' && path.endsWith('/')) {
        path = path.substring(0, path.length - 1)
      }
      this.$router.push(`${path}`)
    }
  }
}
</script>

<style scoped lang="scss">
  .el-menu-item {
    display: flex;
    align-items: center;
  }
</style>
