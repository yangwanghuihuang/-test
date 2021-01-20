<template>
  <Layout class="layout">
    <div class="login">
      <land v-if="loginNav === 1" @loginNav="loginToNav"></land>
    </div>
  </Layout>
</template>

<script>
import land from './land'
export default {
  components: {
    land
  },
  data () {
    return {
      headerHeight: 5 + 'rem',
      loginNav: 1
    }
  },
  methods: {
    loginToNav (value) {
      this.loginNav = value
    }
  }
}
</script>

<style lang="less">
.layout {
  height: 100%;
  width: 100%;
  .login {
    height: 100%;
    width: 100%;
    background-image: url('../../assets/images/login_bg1.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
