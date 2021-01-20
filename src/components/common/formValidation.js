let formValidation = {
  textRules: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输入内容'))
    }
    if (value.length > 100) {
      return callback(new Error('内容长度请控制在100字符'))
    }
    if (!value.match('^[a-zA-Z0-9_-，。\u4e00-\u9fa5]+$')) {
      callback(new Error('禁止输入特殊字符#，%，&'))
    } else {
      callback()
    }
  }
}
export default formValidation
