import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  const hasRoles = store.getters.roles && store.getters.roles.length > 0
  if (hasRoles) {
    next()
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
