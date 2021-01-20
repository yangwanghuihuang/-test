// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import { HttpPlugin } from '../src/libs/http'
import pbulicFunc from './assets/conf/publicFunc.js'
import formValidation from './components/common/formValidation'
import 'handsontable/dist/handsontable.full.css'
// import Print from 'vue-print-nb'
import Print from './plugin/print'
var vueResource = require('vue-resource')
Vue.use(vueResource)
Vue.use(ViewUI)
Vue.use(HttpPlugin)
Vue.use(Print)
Vue.prototype.formValidation = formValidation// input校验规则
require('./api/index.js')
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$publicFunc = pbulicFunc
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}
/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
if (typeof Array.find === 'undefined') {
  Array.prototype.find = function (fn) {
    for (let i in this) {
      if (fn(this[i], i, this) === true) {
        return this[i]
      }
    }
    return undefined
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
