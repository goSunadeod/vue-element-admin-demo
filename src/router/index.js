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
    meta: {title: '首页', icon: 'set'},
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/components/dashboard/index'),
        meta: {title: 'dashboard'}
      },
      {
        path: 'hello',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld'),
        meta: {title: 'helloDemo'}
      },
      {
        path: 'demo',
        name: 'Eslint',
        component: () => import('@/components/Eslint'),
        meta: {title: 'eslintDemo', icon: 'demo'}
      },
      {
        path: 'demoTable',
        name: 'demoTable',
        component: () => import('@/components/TableDemo'),
        meta: {title: 'tableDemo', icon: 'dashboard'}
      }
    ]
  },
  {
    path: '/testDemo',
    component: Layout,
    redirect: '/testDemo/one',
    children: [
      {
        path: 'one',
        component: () => import('@/components/test/testDemo'),
        name: 'TestDemo',
        meta: { title: 'One菜单父级', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/one',
    alwaysShow: true, // will always show the root menu
    meta: { title: '测试单个菜单', icon: 'dashboard' },
    children: [
      {
        path: 'one',
        component: () => import('@/components/test/index'),
        name: 'Test',
        meta: { title: 'One菜单子级', icon: 'dashboard' }
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
    name: 'Permission',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '权限测试页',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/components/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/components/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '指令权限'
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
