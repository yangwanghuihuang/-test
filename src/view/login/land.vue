<template>
  <div class="land">
    <div class="l-bd">
     <div class="land-top">
      <img src="../../assets/images/login_logo.png"></img>
    </div>
    <div class="land-main">
        <div class="land-main-right">
          <div class="title">
              <h1>数据脱敏系统</h1>
              <p>DATA SIMULATION</p>
          </div>

          <div class="land-main-form">
               <Form class="formItem" :model="formRight" label-position="right" :label-width="100">
                <FormItem label="用户名">
                    <Input v-model="formRight.username"></Input>
                </FormItem>
                <FormItem label="密  码">
                    <Input v-model="formRight.password"></Input>
                </FormItem>
                <FormItem label="验证码">
                   <Row>
                      <Col span="11">
                      <Input v-model="formRight.code"></Input>
                      </Col>
                      <Col span="5" offset="1">
                       <Button v-if="requestCodeFlag === false" @click="getVerificationCode">获取验证码</Button>
                        <span v-if="requestCodeFlag === true && !codeUrl">获取中...</span>
                        <img :src="codeUrl" v-if="codeUrl" @click="getVerificationCode" />
                      </Col>
                    </Row>
                </FormItem>
                 <FormItem>
                  <Button class="btn" type="primary" @click="handleSubmit()">登录</Button>
              </FormItem>
            </Form>
          </div>
        </div>
    </div>
    <div class="land-bottom">

    </div>
    </div>

  </div>
</template>

<script>
import services from '../../api/services'
import axios from 'axios'
export default {
  name: 'land',
  data () {
    return {
        requestCodeFlag: false,
      codeUrl: '',
    formRight: {
      username: '',
      password: '',
      code: ''
    }
    }
  },
  mounted () {

  },
  methods: {
    /* 获取验证码 **/
     getVerificationCode () {
      this.requestCodeFlag = true
      this.codeUrl = 'http://132.232.90.44:9000/refresh_vcode/'
    },

    handleSubmit () {
      let param = {
        username: 'admin',
        password: 'Admin@12345',
        vcode: 'TDS1'
      }

       axios({
              method: 'post',
              url: 'http://132.232.90.44:9000/login_auth/',
              contentType: 'application/x-www-form-urlencoded',
              data: param
            }).then((res) => {
              if (res.data) {
                this.$Message.success('成功')
              } else {
                this.$Message.danger(res.data.resultMessage)
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
  .l-bd{
    width: 1190px;
     height: 100%;
    margin: 0 auto;
    .land-top {
        width: 100%;
        height: 10%;
        img{
          width: 300px;
          height:100%;
          display: block;
          margin-left: 200px;
        }
  }
  .land-main {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .land-main-right{
      background-color: #fff;
      width: 800px;
      height: 80%;
      padding-top: 50px;
     display: flex;
     flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../assets/images/login_box.png');
      .title{
        width: 57%;
        text-align:center;
        padding-bottom: 30px;
        p{
          font-size: 10px;
        }
      }
      .land-main-form{
          width: 60%;
          display: flex;
          justify-content: center;
          align-items: center;
          .formItem{
            width: 60%;
            .btn{
              width: 100%;
            }
          }

      }
    }
  }
  .land-bottom {
    width: 100%;
    height: 10%;
    border: 1px solid #666;
  }
  }

}
</style>
