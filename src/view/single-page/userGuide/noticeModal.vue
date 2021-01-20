<template>
  <section class="noticeModal">
    <Modal v-model="modal2" width="30%">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>最新公告</span>
      </p>
      <div style="margin-left:20px">
        <p style="text-indent:2em;line-height:30px;font-size:14px;">{{data.announcementcontent}}</p>
      </div>
      <div slot="footer"></div>
    </Modal>
  </section>
</template>

<script>
import services from '../../../api/services'
export default {
  name: 'noticeModal',
  data () {
    return {
      modal2: true,
      title: '最新公告',
      data: {}
    }
  },
  components: {},
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    cancel () {
      this.$emit('notice', '1')
    },
    initData () {
      this.$http
        .post(services.new.new)
        .then(
          res => {
            if (res.data && res) {
              console.dir(res.data.result)
              this.data = res.data.result
            } else if (res.data && res.data.resultCode !== '000000') {
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {

          }
        )
    }
  }
}
</script>

<style scoped lang="less">
</style>
