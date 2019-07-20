import {getSideBar, getToken} from '@/utils/cache'
const state = {
  sidebar: getSideBar() ? !!+getSideBar() : true,
  token: getToken(),
  roles: [], // 权限
  routes: [] // 动态路由
}
export default state
