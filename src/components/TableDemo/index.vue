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
        <el-table-column prop="code" label="编号" align="center">
          <template slot-scope="scope">
            <router-link to="/demoTableDetail" class="link">{{scope.row.code}}</router-link>
          </template>
        </el-table-column>
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
        {name: '1', sex: 'man', code: 'love', love: '知男而上'},
        {name: '2', sex: 'unknown', code: 'hate'}
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
  .link {
    color: #2cb044;
    transition: 600ms ease all;
    &:hover {
      color: #ff3f3c;

      &:before,
      &:after {
        width: 100%;
        transition: 600ms ease all;
      }
    }
  }
</style>
