import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Eslint from '@/components/Eslint'
import DemoTable from '@/components/TableDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'Eslint',
      component: Eslint
    },
    {
      path: '/demoTable',
      name: 'demoTable',
      component: DemoTable
    }
  ]
})
