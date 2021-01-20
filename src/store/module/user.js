import { setToken } from '@/libs/util'
// import { services } from '../../api/services'
// import { HttpPlugin } from '../../libs/http'
export default {
  namespaced: true,
  state: {
    username: null,
    access_token: sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : null,
    user_info: localStorage.getItem('user_info') ? localStorage.getItem('user_info') : null
    // param: null
    // token: getToken(),
  },
  mutations: {
    access_token (state, data) {
      state.access_token = data
      sessionStorage.setItem('access_token', JSON.stringify(data))
      // console.dir('store~~~~~~~~' + JSON.stringify(data))
      setToken(data)
    },
    user_info (state, data) {
      state.user_info = data
      localStorage.setItem('user_info', JSON.stringify(data))
    }
  },
  getters: {
    getAccess_token: (state) => {
      const cache = sessionStorage.getItem('access_token')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.access_token) {
        return state.access_token
      } else {
        return cacheData
      }
    },
    getUser_info: (state) => {
      const cache = localStorage.getItem('user_info')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.user_info) {
        return state.user_info
      } else {
        return cacheData
      }
    }
  },
  actions: {
    access_token (context, access_token) {
      context.commit('access_token', access_token)
    }
    // user_info (context) {
    //   HttpPlugin.get(services.login.getUserInfo).then(ret => {
    //     context.commit('user_info')
    //   })
    // }
  }
}
