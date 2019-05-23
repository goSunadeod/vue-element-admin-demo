<template>
  <div class="hello">
    <section>
      <header :class="$style.title">Hello World</header>
      <div>
        <p :class="$style['div-content']">哈哈哈哈</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
