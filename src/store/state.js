import {getSideBar} from '@/utils/cache'
const state = {
  sidebar: getSideBar() ? !!+getSideBar() : true
}
export default state
