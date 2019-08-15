module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'generator-star-spacing': 'off',  // 允许 async await
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/script-indent': ['error', 2, {'baseIndent': 1}], // 统一缩进2个空格，数字1表示1倍缩进 用来解决export default 缩进问题
    'comma-dangle': ['error', 'never'], //是否允许对象中出现结尾逗号
    'no-cond-assign': 2, // 禁止条件语句的条件中出现赋值运算符
    'no-console': 0, // 禁止出现consolequote-props
    'no-unreachable': 2, //在return，throw，continue，break语句后不允许出现不可能到达的语句
    'default-case': 0, //在switch语句中需要有default语句
    'eqeqeq': ['off', 'smart'], //比较的时候使用严格等于
    'no-alert': 2, //不允许使用alert，confirm，prompt语句
    'no-multi-spaces': 2, //不允许出现多余的空格
    'no-redeclare': 2, //不允许变量重复声明
    'no-unused-expressions': 2, //不允许无用的表达式
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 2, //禁止一行结束后面有空格
    'no-undef': 2, //不能有未定义的变量
    'space-before-function-paren': ['off', {
      'anonymous': 'always', //匿名函数表达式
      'named': 'always', // 命名函数表达式
      'asyncArrow': 'always' // 异步箭头函数表达式
    }],
    'semi': [2, 'never'], //强制语句分号结尾
    'eol-last': 2, //文件以单一的换行符结束
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'], //不允许混用tab和空格
    'no-underscore-dangle': 2, //不允许标识符以下划线开头
    'no-var': 2, //使用let和const代替var
    'max-len': 0, //一行最大长度，单位为字符
    'max-params': 0, //函数最多能有多少个参数
    'max-statements': 0, //函数内最多有几个声明
    'no-const-assign': 2, //禁止修改const声明的变量
    'quotes': [2, 'single'], //单引号
    'arrow-parens': 0,//箭头函数用小括号括起来
    'arrow-spacing': 0,//=>的前/后括号
    // 'arrow-body-style': [1, 'as-needed'], // 箭头函数后 {}
    'prefer-const': 0, // const 代替let
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
