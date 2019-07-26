import router from './router'
import store from './store'
import { Message } from 'element-ui'
import getPageTitle from '@/utils/get-page-title'
import {hasPerms} from '@/utils/permission'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasRoles = store.getters.roles && store.getters.roles.length > 0
  if (hasRoles) {
    // next()
    // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
    if ((store.getters.roles.includes('admin')) || !to.meta.perms || hasPerms(to.meta.perms)) {
      next()
    } else {
      next({path: '/401', replace: true, query: { noGoBack: true }})
    }
    // 可删 ↑
  } else {
    try {
      const { roles } = await store.dispatch('getInfoDetail')
      const accessRoutes = await store.dispatch('generateRoutes', roles)
      router.addRoutes(accessRoutes)
      next({ ...to, replace: true })
    } catch (error) {
      Message.error(error || 'Has Error')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
