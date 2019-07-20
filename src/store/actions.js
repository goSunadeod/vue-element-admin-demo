import * as types from './mutation-types'
import {getInfo, getRoutes} from '@/api/app-api'
import {filterAsyncRoutes} from '@/utils/permission'
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

      commit(types.SET_ROLES, roles)
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
        console.log(res)
        accessedRoutes = filterAsyncRoutes(res.asyncRoutes, roles)
        commit(types.SET_ROUTES, accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  })
}

export const changeRoles = function({ commit }, role) {
  return new Promise(async resolve => {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await getInfo()

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await generateRoutes(roles)

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    resolve()
  })
}
