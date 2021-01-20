<template>
  <div class="land">
    <div class="login-form">
      <Form ref="loginForm" :model="loginForm" :rules="loginFormRule" :label-width="80">
        <Row class="login-info-title">
          <Col span="15" class="login-info-title-left">登录</Col>
          <!--<Col span="9"><h5 class="login-info-title-right" @click="loginNavToSecond">没有账号？立即注册</h5></Col>-->
        </Row>
        <FormItem prop="username">
          <Row>
            <Col span="16">
              <Input placeholder="请输入用户名" v-model="loginForm.username" autocomplete="off"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="password">
          <Row>
            <Col span="16">
              <Input placeholder="请输入密码" v-model="loginForm.password" type="password"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem prop="identifyCodes">
          <Row>
            <Col span="10">
              <Input
                placeholder="请输入验证码"
                v-model="loginForm.identifyCodes"
                @keydown.enter.native="submit('loginForm')"
              ></Input>
            </Col>
            <Col span="5" offset="1">
              <Button v-if="requestCodeFlag === false" @click="getVerificationCode">获取验证码</Button>
              <span v-if="requestCodeFlag === true && !codeUrl">获取中...</span>
              <img :src="codeUrl" v-if="codeUrl" @click="getVerificationCode" />
            </Col>
          </Row>
        </FormItem>
        <FormItem class="login-info-footer">
          <Button type="primary" class="login-info-footer-btn" @click="submit('loginForm')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import services from '../../api/services'
export default {
  name: 'land',
  data () {
    return {
      // sendValidationCode:true,
      // validationTime:0,
      codeUrl: '',

      requestCodeFlag: false,
      loginForm: {
        username: '',
        password: '',
        identifyCodes: '',
        grant_type: 'password'
      },
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        identifyCodes: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      data: ''
    }
  },
  mounted () {
    this.getVerificationCode()
  },
  methods: {
    /* 获取验证码 **/
    getVerificationCode () {
      this.requestCodeFlag = true
      let num = (new Date().getTime())
      this.codeUrl = services.getValidation.getValidation + '?' + num
    },
    loginNavToSecond () {
      this.$emit('loginNav', 2)
    },
    submit (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // // let CryptoJS_password = this.$publicFunc.encrypt(this.loginForm.password)
          let formData = {
            username: this.loginForm.username,
            password: this.loginForm.password
            // authority: this.loginForm.identifyCodes
          }
          this.$http.post(services.login.checkToken, formData).then(res => {
            if (res && res.data && res.data.result) {
              console.dir(res.data.result.remark === 0)
              if (res.data.result.remark === 0) {
                console.dir('管理员登陆成功')
                // 验证token，存入缓存
                this.$store.dispatch('user/access_token', res.data.info.token)
                this.$router.push({
                  name: 'userGuide',
                  params: {
                    flag: 0,
                    userId: res.data.result.username
                  }
                })
              }
              if (res.data.result.remark === 1) {
                console.dir('普通员工登陆成功')
                // 验证token，存入缓存
                this.$store.dispatch('user/access_token', res.data.info.token)

                this.$router.push({
                  name: 'userInfo',
                  params: {
                    flag: 1,
                    userId: res.data.result.username
                  }
                })
              }
            } else if (res.data.resultMessage === '验证码不正确') {
              console.dir('登陆失败')
              this.$Message.warning({
                content: '验证码不正确，请重新登录!',
                duration: 5
              })
            } else if (res.data.resultMessage === '未查询到数据') {
              console.dir('登陆失败')
              this.$Message.warning({
                content: '账号密码不正确或该用户不存在,请重新登录!',
                duration: 5
              })
            }
          })
        } else {
          this.$Message.warning('请完善登录信息!')
        }
      })
    }
  }
}
</script>

<style lang="less">
.land {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 25%;
    background-color: white;
    img {
      height: 30px;
      width: 70px;
      cursor: pointer;
    }
    .login-info-title {
      margin-bottom: 1rem;
      margin-top: 1rem;
      .login-info-title-left {
        padding-left: 2rem;
        font-size: 30px;
      }
      .login-info-title-right {
        color: #348eed;
        cursor: pointer;
        margin-top: 10px;
      }
    }
    .login-info-footer {
      .login-info-footer-btn {
        width: 66.56%;
        font-size: medium;
      }
    }
  }
}
.ivu-col-span-5 {
  display: block;
  width: 34.833333%;
}
</style>
