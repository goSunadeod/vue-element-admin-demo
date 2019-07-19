import Cookies from 'js-cookie'

const SIDEBAR_STATUS = '__sidebar__'

export function setSideBar (status) {
  Cookies.set(SIDEBAR_STATUS, status)
}

export function getSideBar () {
  return Cookies.get(SIDEBAR_STATUS)
}

export function removeSideBar() {
  Cookies.remove(SIDEBAR_STATUS)
}
