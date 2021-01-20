import axios from 'axios'
import iView from 'iview'
import router from '../router'
import store from '../store'
// http request 封装请求头拦截器
const HttpPlugin = {
  install: (Vue) => {
    Vue.prototype.$http = axios
  }
}
axios.interceptors.request.use(config => {

  iView.LoadingBar.start()
  // console.log(config)
  let access_token = sessionStorage.getItem('access_token')
  // 如果有token，就给token带到请求头
  if (access_token) {
    config.headers.Authorization = 'Bearer ' + JSON.parse(access_token)
  }
 // 添加请求拦截器实现逻辑...
  // 若是有做鉴权token , 就给头部带上token
  // let token = storage.get('cmi-token')
  // if (token) {
  //   config.headers.Authorization = token
  // } else {
  //   // 未登录跳转到登录页面
  //   router.replace('/', () => {
  //     // onComplete
  //     TMessage.warning('请登录后访问...', 2)
  //   }, () => {
  //     // onAbort
  //   })
  // }
  // 请求方式
  // let method = config.method.toLowerCase();
  // if (method === 'get' || method === 'delete') {
  //   Object.assign(config.params, {
  //     "test": "testVAl"
  //   });
  // }
  console.dir(config)
  return config
}, error => {
  return Promise.reject(error)
})

// http response 封装后台返回拦截器
axios.interceptors.response.use(response => {
  console.dir(response)
  iView.LoadingBar.finish()
  return response
  // console.log(response)
// 当返回信息为未登录或者登录失效的时候重定向为登录页面
  //   if (response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！') {
  //     router.push({
  //       path: "/",
  //       querry: {
  //         redirect: router.currentRoute.fullPath
  //       } //从哪个页面跳转
  //     })
  //   }
  // if (typeof response.data === 'string') {
  //   return JSON.parse(response.data)
  // } else {
  //   return response
  // }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        iView.Message.error({
          content: '登陆人无权限或者认证过期，请重新登录!',
          duration: 3
        })
        router.push({ name: 'login' })
        store.dispatch('user/access_token', '')
        localStorage.clear()
        sessionStorage.clear()
        break
      case 500:
        iView.Message.error({
          content: '服务调用出错!',
          duration: 3
        })
        break
    }
  }
  return Promise.reject(error)
})
export {
  HttpPlugin
}
