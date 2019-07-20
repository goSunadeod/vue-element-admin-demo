import { service } from './request'

export function getInfo() {
  return service({
    url: '/info',
    method: 'get'
  })
}
