import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  routes: [
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
        }
      ]
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
})
