<template>
  <div class="hello">
    <section>
      <p style="display: flex; justify-content: space-between">
        <span>1111121212122121</span>
        <span>99989889898989898</span>
      </p>
      <header :class="$style.title">Hello World</header>
      <div>
        <p :class="$style['div-content']" v-for="item in 150" :key="item">哈哈哈哈</p>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'CSS module'
    }
  }
}
</script>

<!-- css modules  -->
<style module>
  .title {
    color: red;
  }
  .div-content {
    font-weight: 600;
    font-size: 20px;
  }
</style>
