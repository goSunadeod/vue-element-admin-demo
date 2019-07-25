<template>
  <div>
    <el-button @click="back">返回</el-button>
    <div>你好，这是列表详情，你可以看到吗？</div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
