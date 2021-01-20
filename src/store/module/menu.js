import { getBreadCrumbList, getSiderMenuMap } from '@/libs/util'
export default {
  namespaced: true,
  state: {
    homeRoute: { 'menu_id': 1, 'menu_name': '首页', 'menu_icon': 'ios-briefcase', 'menu_url': '/home' },
    breadCrumbList: [],
    siderMenuMap: new Map()
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setSiderMenuMap (state, param) {
      state.siderMenuMap = getSiderMenuMap(param)
    }
  },
  getters: {
    //  getMenu: (state) => {
    //   const cache = localStorage.getItem('menu2_sel');
    //   let cacheData = null;
    //   if (cache) {
    //     cacheData = JSON.parse(cache)
    //   }
    //   if (state.siderMenuMap) {
    //     return state.siderMenuMap
    //   } else {
    //     return cacheData
    //   }
    //  }
  },
  actions: {

  }
}
