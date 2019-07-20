import Cookies from 'js-cookie'

const SIDEBAR_STATUS = '__sidebar__'
const TokenKey = 'Admin-Token'

export function setSideBar (status) {
  Cookies.set(SIDEBAR_STATUS, status)
}

export function getSideBar () {
  return Cookies.get(SIDEBAR_STATUS)
}

export function removeSideBar() {
  Cookies.remove(SIDEBAR_STATUS)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
