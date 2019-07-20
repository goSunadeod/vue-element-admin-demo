import * as types from './mutation-types'
import {setSideBar, setToken} from '@/utils/cache'
import {constantRoutes} from '@/router'

const mutations = {
  [types.SET_SIDEBAR] (state, sidebar) {
    state.sidebar = !!+sidebar
    setSideBar(sidebar)
  },
  [types.SET_TOKEN] (state, token) {
    state.token = token
    setToken(token)
  },
  [types.SET_ROLES] (state, roles) {
    state.roles = roles
  },
  [types.SET_ROUTES] (state, routes) {
    state.routes = constantRoutes.concat(routes)
  }
}
export default mutations
