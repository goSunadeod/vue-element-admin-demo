import {getFibonacci} from '@/api/app-api'
self.onmessage = function(event) {
  console.log('woker: 接收数据', event)
  getFibonacci(event.data.number).then((res) => {
    self.postMessage(res.data.number)
  })
}
