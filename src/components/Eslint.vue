<template>
  <global-page title="测试">
    <div class="hello">
      你好 我就是向测试一下eslint
    </div>
    <button @click="handleClick">工具类函数测试</button>
    <global-button desc="我来"></global-button>
  </global-page>
</template>

<script>
import utlMath from '@/utils/math'
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
          // console.log(3)
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
    handleClick () {
      console.log(utlMath.divide(123.3, 100)) // 123.3 / 100 ==> 1.233
      console.log(utlMath.mul(4.015, 100)) // 4.015 * 100 ==> 401.5
      console.log(utlMath.add(0.05, 0.01)) // 0.05 + 0.01 ==> 0.06
      console.log(utlMath.sub(1.0, 0.42)) // 1.0 - 0.42 ==> 0.58

      console.log(utlMath.moneyFormat('10000002.00', 3, false))
      console.log(utlMath.parseMoney('100,123.02'))
      console.log(utlMath.numToChinese('100123.02'))
    }
  }
}
</script>
