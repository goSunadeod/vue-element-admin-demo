import * as types from './mutation-types'
import {getInfo, getRoutes} from '@/api/app-api'
// eslint-disable-next-line
import {filterAsyncRoutes, filterAsyncRoutersByApi} from '@/utils/permission'
import router, { resetRouter, asyncRoutes } from '@/router'
import {setToken} from '@/utils/cache'

/* eslint-disable */

export const getInfoDetail = function({ commit, state }) {
  return new Promise((resolve, reject) => {
    getInfo(state.token).then(response => {
      const { data } = response
      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const { roles } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit(types.SET_ROLES, [...roles])
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}


export const generateRoutes = function({ commit }, roles) {
  return new Promise(resolve => {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
      commit(types.SET_ROUTES, accessedRoutes)
      resolve(accessedRoutes)
    } else {
      getRoutes().then(res => {
        // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles) // 针对前台写死
        accessedRoutes = filterAsyncRoutersByApi(res.asyncRoutes, roles) // 针对后台返回
        commit(types.SET_ROUTES, accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  })
}

export const changeRoles = function({ dispatch, commit }, role) {
  return new Promise(async resolve => {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfoDetail')

    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('generateRoutes', roles)

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    resolve()
  })
}
