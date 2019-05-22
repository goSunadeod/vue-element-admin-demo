<!--
  使用方法：直接使用组件即可，支持所el-table自带的参数
  需要传入getData方法，用于在切换分页以后的回调
  demo:https://codesandbox.io/s/klpzy7l1o
-->
<template>
  <div>
    <el-pagination
      v-if="showTopPage || pageable"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="pageParams.pageNumber"
      :page-sizes="pageParams.pageSizes || [5,10,20,50,100]"
      :page-size="pageParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageParams.totalCount"
      style="text-align: right; margin-bottom: 20px;"
    ></el-pagination>
    <el-table
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :border="border"
      v-bind="$attrs"
    >
      <!-- 自定义列 -->
      <slot></slot>
      <!-- 根据参数渲染列 -->
      <template v-for="(col, index) in cols">
        <!-- 自定义组件。使用时在cols参数中增加component字段 -->
        <component v-if="col.component" :key="index" :is="col.component" :col-config="col"></component>
        <el-table-column v-else v-bind="col" :key="index" :align="col.align || 'center'"></el-table-column>
      </template>
      <slot name="after"></slot>
    </el-table>
    <el-pagination
      v-if="showBottomPage || pageable"
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="pageParams.pageNumber"
      :page-sizes="pageParams.pageSizes || [5,10,20,50,100]"
      :page-size="pageParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageParams.totalCount"
      style="text-align: right; margin-top: 20px;"
    ></el-pagination>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'global-table',
  props: {
    // 表格头样式
    headerCellStyle: {
      default: () => ({
        background: '#ea43f6',
        color: '#333333',
      }),
    },
    // 单元格样式
    cellStyle: {
      default: () => ({
        'font-weight': 'blod',
        color: '#333333',
        'font-size': '14px',
      }),
    },
    border: {
      default: () => true,
    },
    // 表格列参数
    cols: {
      default: () => [],
    },
    // 是否显示分页
    pageable: {
      type: Boolean,
      default: false,
    },
    // 是否显示表格上方的分页
    showTopPage: {
      type: Boolean,
      default: false,
    },
    // 是否显示表格下方的分页
    showBottomPage: {
      type: Boolean,
      default: false,
    },
    // 更新分页参数后的回调方法，用于重新请求数据
    getData: {
      type: Function,
      required: true,
      default: () => {},
    },
    // 用于自定义分页参数
    pageData: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      pageParams: {
        // 默认分页参数
        pageNumber: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        searchCount: true,
        optimizeCountSql: true,
        // 自定义分页参数，可覆盖上面的值
        ...this.pageData,
      },
    }
  },
  methods: {
    changeSize(val) {
      this.pageParams.pageSize = val;
      this.pageParams.pageNumber = 1;
      this.getData();
    },
    changePage(val) {
      this.pageParams.pageNumber = val;
      this.getData();
    },
    // 用于获取当前的分页参数
    getPageData() {
      return this.pageParams;
    },
    // 用于搜索时，设置分页为第一页
    onSearch() {
      this.pageParams.pageNumber = 1;
    },
    // 用于查询后，更新分页参数中的总数
    updateByResponse(res) {
      this.$set(this.pageParams, 'totalCount', res.totalCount);
    },
    // 单个选择
    selectInfo(selectInfo) {
      this.$emit('selectInfo', selectInfo);
    },
    // 选择全部
    selectAllInfo(selectAllInfo) {
      this.$emit('selectAllInfo', selectAllInfo);
    },
  }
}
</script>
