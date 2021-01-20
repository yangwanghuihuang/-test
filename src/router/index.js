import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
// import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
// import config from '@/config'
// const { homeName } = config
// import { getToken } from '@/libs/util'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const router = new Router({
  routes,
  mode: 'history'
})
// const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const access_token = store.state.user.access_token
  console.dir(access_token)
  console.dir(to.name)
  if (!access_token && to.name === 'login') {
    next()
  } else if (!access_token && to.name !== 'login') {
    next('login')
  } else if (access_token && to.name === 'login') {
    next('/userGuide')
  } else {
    if (access_token && to.name !== 'login') {
      next()
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
