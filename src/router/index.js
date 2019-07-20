import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HelloWorld',
        // component: () => import('@components/start'),
        component: () => import('@/components/HelloWorld')
      },
      {
        path: '/demo',
        name: 'Eslint',
        component: () => import('@/components/Eslint')
      },
      {
        path: '/demoTable',
        name: 'demoTable',
        component: () => import('@/components/TableDemo')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/components/error-page/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/components/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/components/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
