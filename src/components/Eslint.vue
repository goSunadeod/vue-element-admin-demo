<template>
  <div class="hello">
    你好 我就是向测试一下eslint
  </div>
</template>

<script>
export default {
  name: 'Eslint',
  data () {
    return {
      a: 1
    }
  },
  methods: {
    test (a) {
      switch (a) {
        case 1:
          this.a = 3
//          console.log(2)
        break
        default:
          this.a = 2
      }
    },
    _test1 (a) {
      let c = 2
      let d = 'x'
      if (a === c + d) {
        this.test()
      }
    },
    test2 () {
    }
  }
}
</script>
