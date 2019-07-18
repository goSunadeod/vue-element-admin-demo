/* eslint-disable */
let utl = {}

/**
 * 得到一个随机数
 * @param start 起始数字,不包括
 * @param end 截止数字,不包括
 * @return {number}
 */
utl.nextRnd = (start, end) => {
  return Math.random() * (end - start) + start
}

/**
 * 得到一个随机整数
 * @param start 起始数字,包括
 * @param end 截止数字,不包括
 * @return {number}
 */
utl.nextRndInt = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start)
}

// 说明：javascript的四则运算结果会有误差，在两个浮点数相加的时候会比较明显。
// 加法函数，用来得到精确的加法结果
utl.add = (a, b) => {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (utl.mul(a, e) + utl.mul(b, e)) / e
}
// 减法函数，用来得到精确的减法结果
utl.sub = (a, b) => {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (utl.mul(a, e) - utl.mul(b, e)) / e
}
// 乘法函数，用来得到精确的乘法结果
utl.mul = (a, b) => {
  let c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}
// 除法函数，用来得到精确的除法结果
utl.divide = (a, b) => {
  let c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), utl.mul(c / d, Math.pow(10, f - e))
}

// 数据放大X倍，默认100
utl.enlargeData = (data, x = 100) => {
  let result = 0
  if (data) {
    result = utl.mul(data, x)
  }
  return result
}

// 数据缩小X倍，默认100
utl.narrowData = (data, x = 100) => {
  let result = 0
  if (data && data !== 0) {
    result = utl.divide(data, x)
  }
  return result
}

// 使用toFixed四舍五入 不兼容导致计算精度有误Bug, 使用此方法解决toFixed兼容问题
utl.toFixedNum = function (num, s) {
  if (num === '' || num === null || num === undefined) return ''
  else {
    let times = Math.pow(10, s + 1)
    let des = parseInt(num * times)
    let rest = des % 10
    if (rest === 5) {
      return ((parseFloat(des) + 1) / times).toFixed(s)
    }
    return num.toFixed(s)
  }
}

function isEmpty(value) {
  return [undefined, null, ''].includes(value);
}

/**
 * 金额设置千分位
 * @param m 修改的数字
 * @param flag 是否保留小数 默认保留
 * @param n 保留的小数位 默认为2
 * @returns {String}
 */
utl.moneyFormat = function(m, flag = true, n = 2) {
  // 空校验
  if (isEmpty(m)) {
    return '';
  }
   m = Number(m)
  // 转换异常处理
  if (!m && m !== 0) {
    return '';
  }

  let num;
  if (flag) {
    m = utl.toFixedNum(m, n); // toFixed精度修复
    num = m.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => `${$1},`).replace(/\.$/, '');
  } else {
    num = m.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  return num;
}

/**
 * 金额转换为数字
 * @param s 需要转换的金额字符串
 * @return {Number}
 */
utl.parseMoney = (s) => {
  return parseFloat(s.replace(/[^\d\.-]/g, ''))
}

/**
 * @param num 需要转换的数字金额
 * @returns {string} 金额中文大写
 */
utl.numToChinese = (num) => {
  // 小数
  let fraction = ['角', '分']
  // 数字
  let digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let head = num < 0 ? '负' : ''
  num = Math.abs(num)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

export default utl
