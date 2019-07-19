<template>
  <div class="hello">
    <section>
      <header :class="$style.title">Hello World</header>
      <div>
        <p :class="$style['div-content']" v-for="item in 150" :key="item">哈哈哈哈</p>
      </div>
    </section>
    <p>{{msg}}</p>
    <svg-icon iconClass="money"></svg-icon>
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
