<template>
  <div>
    <header>测试table</header>
    <div style="margin-top: 15px">
      <global-table
        ref="globalTable"
        showBottomPage
        :data="tableData"
        :cols="cols"
        :get-data="getData"
      >
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      </global-table>
    </div>
  </div>
</template>

<script>

const PrefixPlusText = {
  props: ['colConfig'],
  template: `
  <el-table-column :label="colConfig.label" align="center">
    <template v-slot="{row}">
      {{ (row[colConfig.prop] || '') + '你好' }}
    </template>
  </el-table-column>
`
}
export default {

  data () {
    return {
      tableData: [
        {name: '1', sex: 'man', age: 18, love: '知男而上'},
        {name: '2', sex: 'unknown', age: 20}
      ],
      cols: [
        {
          type: 'index'
        },
        {
          prop: 'name',
          label: '名字'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'love',
          label: '爱好',
          component: PrefixPlusText
        }]
    }
  },
  methods: {
    getData () {
      this.$message('分页查询')
    }
  }
}
</script>
<style scoped lang="scss">
</style>
