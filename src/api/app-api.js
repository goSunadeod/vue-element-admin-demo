import { service } from './request'
// mock 平台挂了
export function getInfo(token) {
  return service({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getRoutes(role) {
  return service({
    url: '/user/routes',
    method: 'get',
    params: { role }
  })
}

export function getFibonacci(number) {
  return service({
    url: `/fibonacci?number=${number}`,
    method: 'get'
  })
}

export function getRoom() {
  return service({
    url: '/table/room',
    method: 'get'
  })
}
