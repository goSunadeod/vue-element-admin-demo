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

export default utl
