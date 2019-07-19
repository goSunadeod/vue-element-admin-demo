import * as types from './mutation-types'
import {setSideBar} from '@/utils/cache'

const mutations = {
  [types.SET_SIDEBAR] (state, sidebar) {
    state.sidebar = !!+sidebar
    setSideBar(sidebar)
  }
}
export default mutations
