import Layout from '@/components/layout' // Layout 是架构组件，不在后台返回，在文件里单独引入
import store from '@/store'
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
  return res
}

// 针对后台返回路由
export function filterAsyncRoutersByApi(asyncRouterMap, roles) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (!hasPermission(roles, route)) {
      return
    }
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRoutersByApi(route.children, roles)
    }
    return true
  })

  return accessedRouters
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`) // eslint-disable-line
    return false
  }
}

// 额外另加 其实没什么用 就是想看一下401效果（因为动态路由其实不需要401）
export function hasPerms(toPerm) {
  if (toPerm && toPerm instanceof Array && toPerm.length > 0) {
    const perms = store.getters && store.getters.perms
    const hasPermsFlag = perms.some(role => {
      return toPerm.includes(role)
    })
    if (hasPermsFlag) {
      return false
    }
    return true
  }
  return true
}
