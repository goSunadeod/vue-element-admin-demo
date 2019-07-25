import {getSideBar, getToken} from '@/utils/cache'
const state = {
  sidebar: getSideBar() ? !!+getSideBar() : true,
  token: getToken(),
  roles: [], // 权限
  routes: [], // 动态路由
  perms: [] // 小权限（例如某些详情页面，当然完全可以通过roles来解决，但这我是用来玩的，可以忽略这个）
}
export default state
