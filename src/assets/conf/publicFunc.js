import CryptoJS from 'crypto-js'
const PBULICFUNC = {
  showPage (type) {
    if (type === 'jingdong') { // 京东
      window.open('https://www.jd.com/')
    } else if (type === 'taobao') { // 淘宝
      window.open('https://www.tmall.com/')
    } else if (type === 'lianjia') { // 链家
      window.open('https://bj.lianjia.com/')
    } else if (type === 'aiqiyi') { // 爱奇艺
      window.open('https://www.iqiyi.com/')
    } else if (type === 'tengxun') { // 腾讯
      window.open('http://www.tencent.com/')
    }
  },
  // 将日期对象格式化成字符串
  formatDate (date, fmt) {
    fmt = fmt || 'yyyy-MM-dd'
    let str = fmt
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(str)) {
      str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(str)) {
        str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return str
  },
  // 将字符串转化为日期对象
  parseDate (dateString) {
    if (!dateString) {
      return null
    }
    return new Date(Date.parse(dateString.replace(/-/g, '/')))
  },
  getDatetime (val) {
    if (!val) return ''
    let date = new Date(val)
    let dataVal = ''
    dataVal += date.getFullYear() + '-'
    date.getMonth() >= 9 ? dataVal += (date.getMonth() + 1) + '-' : dataVal += '0' + (date.getMonth() + 1) + '-'
    date.getDate() > 9 ? dataVal += (date.getDate()) + ' ' : dataVal += '0' + (date.getDate())
    return dataVal
  },

  getDatetimess (val) {
    if (!val) return ''
    let date = new Date(val)
    let dataVal = ''
    dataVal += date.getFullYear() + '-'
    date.getMonth() >= 9 ? dataVal += (date.getMonth() + 1) + '-' : dataVal += '0' + (date.getMonth() + 1) + '-'
    date.getDate() > 9 ? dataVal += (date.getDate()) + ' ' : dataVal += '0' + (date.getDate())
    date.getHours() > 9 ? dataVal += (date.getHours()) + ':' : dataVal += '0' + (date.getHours()) + ':'
    date.getMinutes() > 9 ? dataVal += (date.getMinutes()) + ':' : dataVal += '0' + (date.getMinutes()) + ':'
    date.getSeconds() > 9 ? dataVal += (date.getSeconds()) : dataVal += '0' + (date.getSeconds())
    // dataVal += date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    return dataVal
  },

  getDate () {
    let date = new Date()
    let dataVal = ''
    dataVal += date.getFullYear() + '-'
    date.getMonth() >= 9 ? dataVal += (date.getMonth() + 1) + '-' : dataVal += '0' + (date.getMonth() + 1) + '-'
    date.getDate() > 9 ? dataVal += (date.getDate()) + ' ' : dataVal += '0' + (date.getDate()) + ' '
    date.getHours() > 9 ? dataVal += (date.getHours()) + ':' : dataVal += '0' + (date.getHours()) + ':'
    date.getMinutes() > 9 ? dataVal += (date.getMinutes()) + ':' : dataVal += '0' + (date.getMinutes()) + ':'
    date.getSeconds() > 9 ? dataVal += (date.getSeconds()) : dataVal += '0' + (date.getSeconds()) + ''
    return dataVal
  },
  getMinutes () {
    let date = new Date()
    let dataVal = ''
    dataVal +=

      date.getHours() > 9 ? dataVal += (date.getHours()) + ':' : dataVal += '0' + (date.getHours()) + ':'
    date.getMinutes() > 9 ? dataVal += (date.getMinutes()) : dataVal += '0' + (date.getMinutes())

    return dataVal
  },
  getDateYMD () {
    let date = new Date()
    let dataVal = ''
    dataVal += date.getFullYear() + '-'
    date.getMonth() >= 9 ? dataVal += (date.getMonth() + 1) + '-' : dataVal += '0' + (date.getMonth() + 1) + '-'
    date.getDate() > 9 ? dataVal += (date.getDate()) + ' ' : dataVal += '0' + (date.getDate()) + ' '
    return dataVal
  },
  // 时间字符串改为时间戳
  timestamp (val) {
    return Date.parse(new Date(val))
  },
  unique (arr, keys) {
    const res = new Map()
    return arr.filter((item) => {
      let tmpKey = ''
      for (let key of keys) {
        tmpKey += item[key] || ''
      }
      if (!res.has(tmpKey) && res.set(tmpKey, 1)) {
        return item
      }
    })
  },
  packedArray (arr, objVal) {
    let result = []
    let hash = {}
    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i][objVal]
      if (!hash[elem]) {
        result.push(arr[i])
        hash[elem] = true
      }
    }
    return result
  },
  packedArrayDelete (val, oldval) {
    for (let i = 0; i < val.length; i++) {
      for (let j = 0; j < oldval.length; j++) {
        if (oldval[j].osId === val[i].osId) {
          oldval.splice(j, 1)
          j = j - 1
        }
      }
    }
    return oldval
  },
  deleteObj (obj) {
    for (let key in obj) {
      if (key.indexOf('_') !== -1) {
        delete obj[key]
      }
    }
    return obj
  },
  cloneObj (obj) {
    var newObj = {}
    if (obj instanceof Array) {
      newObj = []
    }
    for (var key in obj) {
      var val = obj[key]
      newObj[key] = typeof val === 'object' ? this.cloneObj(val) : val
    }
    return newObj
  },
  isBlank (str) {
    if (str === '' || str === undefined || str === null) {
      return true
    } else {
      return false
    }
  },

  /* by yangxiong 验证规则 */

  /* 证件号码验证 */
  validateNumLet (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let numZimu = /^[0-9a-zA-Z]*$/g
    let format = numZimu.test(value)
    if (!format) {
      callback(new Error('号码只能为数字或字母'))
    } else {
      callback()
    }
  },

  /* 数字验证 */
  validateNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let numZimu = /^[0-9]*$/g
    let format = numZimu.test(value)
    if (!format) {
      callback(new Error('只能输入数字'))
    } else {
      callback()
    }
  },

  /* 4位数验证码验证 */
  validateSixNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let numZimu = /^\d{4}$/g
    let format = numZimu.test(value)
    if (!format) {
      callback(new Error('验证码应该为4位数字'))
    } else {
      callback()
    }
  },

  /* 手机号码或者电话号码验证 */
  validatephone (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let mobile = /^1[3|4|5|7|8|9]\d{9}$/
    let phone = /^0\d{2,3}-?\d{7,8}$/
    let format = mobile.test(value) || phone.test(value)
    if (!format) {
      callback(new Error('请输入正确号码'))
    } else {
      callback()
    }
  },

  /* 网址地址验证 */
  validaWww (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let mobile = /\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|\/)))/
    let format = mobile.test(value)
    if (!format) {
      callback(new Error('网址输入格式不正确'))
    } else {
      callback()
    }
  },

  /* 邮箱地址输入验证 */
  validaEmails (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    let format = email.test(value)
    if (!format) {
      callback(new Error('邮件输入格式不正确'))
    } else {
      callback()
    }
  },

  /* 移动内部邮箱邮箱地址输入验证 */
  validaCmccEmails (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@(chinamobile.)+[A-Za-z\d]{2,4}$/
    let format = email.test(value)
    if (!format) {
      callback(new Error('邮件输入格式不正确'))
    } else {
      callback()
    }
  },

  /* 编码输入验证 */
  validateCode (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let email = /^[A-Za-z]{1,9}-?\d{0,9}$/
    let format = email.test(value)
    if (!format) {
      callback(new Error('编码输入格式不正确'))
    } else {
      callback()
    }
  },
  /* 验证邮政编码 */
  validatePostalCode (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let validate = /^[0-9]{6}$/
    let format = validate.test(value)
    if (!format) {
      callback(new Error('邮政编码格式不对'))
    } else {
      callback()
    }
  },
  /* 可以中文、大小写字母、数字任意组合（特殊字符不可以） */
  checkIsChEnNum (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let vailde = /^[A-Za-z0-9\u4e00-\u9fa5]+$/gi
    let format = vailde.test(value)
    if (!format) {
      callback(new Error('不可输入特殊字符'))
    } else {
      callback()
    }
  },
  /* 字母或数字组合 */
  checkstaffApply (rule, value, callback) {
    let Regx = /^[A-Za-z0-9]*$/
    if (!Regx.test(value)) {
      callback(new Error('账号只可以为字母或数字组合'))
    } else {
      callback()
    }
  },

  /* 中文 */
  checkIsCH (rule, value, callback) {
    if (value === '' || value === undefined) {
      callback()
    }
    let vailde = /^[\u4e00-\u9fa5]+$/gi
    let format = vailde.test(value)
    if (!format) {
      callback(new Error('不可输入特殊字符'))
    } else {
      callback()
    }
  },

  /* 身份证号码校验 */
  validateIdCard (rule, value, callback) {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },

  /* 身份证号码校验 */
  validateIdCard15 (rule, value, callback) {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },

  /* 身份证号码校验 */
  validateIdCard18 (rule, value, callback) {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },
  // 生成随机数
  randomString (len) {
    len = len || 32
    let $chars = 'ABCDEFGHIJGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let maxPos = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
  },
  // 加密  CBC
  encryptCBC (word, iv) {
    let keyStr = 'abcdefgabcdefg12'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  },
  // 加密  ECB
  encryptECB (word) {
    let keyStr = 'abcdefgabcdefg12'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  },
  // 解密
  decrypt (word) {
    let keyStr = 'abcdefgabcdefg12'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}

export default PBULICFUNC
