<template>
  <div class="header-layout">
    <div class="header-left">
      <h1>微人事信息管理系统</h1>
    </div>
    <div class="header-right">
      <Icon type="md-person" color="#128af6" />
      <p style="font-size: 0.5em">{{user_info}}</p>
      <Icon style="cursor:pointer;" type="ios-power" color="#128af6" @click="confirm" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBar',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      user_info: '管理员',
      flag: 0
    }
  },
  computed: {},
  mounted () {
    if (this.$route.params) {
      if (this.$route.params.flag === 0) {
        this.user_info = '管理员'
      }
      if (this.$route.params.flag === 1) {
        this.user_info = '普通员工'
        localStorage.setItem('userFlag', this.$route.params.flag)
      }
    }
    if (this.$route.params.flag === undefined) {
      console.dir(this.$route.params.flag)
      console.dir(localStorage.getItem('userFlag') === '1')

      if (localStorage.getItem('userFlag') === '1') {
        this.user_info = '普通员工'
      }
    }
  },
  methods: {
    confirm () {
      this.$Modal.confirm({
        title: '确认退出？',
        onOk: () => {
          this.$store.dispatch('user/access_token', '')
          localStorage.clear()
          sessionStorage.clear()
          this.$router.push({ name: 'login' })
        },
        onCancel: () => {
          this.$Message.info('已取消退出')
        }
      })
    }
  }
}
</script>
<style lang="less">
.header-layout {
  height: 100%;
  width: 100%;
  display: flex;
  color: #fff;
  .header-left {
    padding-left: 10px;
    height: 100%;
    width: 80%;
    display: flex;
    align-items: center;
  }
  .header-right {
    height: 100%;
    width: 20%;
    padding-right: 10px;
    font-size: 1.5em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .content-main {
      color: #000c17;
    }
  }
}
</style>
