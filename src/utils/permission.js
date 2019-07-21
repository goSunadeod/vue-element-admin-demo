import Layout from '@/components/layout' // Layout 是架构组件，不在后台返回，在文件里单独引入
// eslint-disable-next-line
const _import = require('../router/_import_' + process.env.NODE_ENV)// 获取组件的方法

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 针对前台写死路由
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  console.log(res, 1)
  return res
}

// 针对后台返回路由
export function filterAsyncRoutersByApi(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRoutersByApi(route.children)
    }
    return true
  })

  return accessedRouters
}
