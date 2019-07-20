import { service } from './request'

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
