import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control
import store from './store' // vuex
import './utils/register' // 组件全局注册

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
