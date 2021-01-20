<template>
  <section class="userPolicy">
    <strong>资料信息:</strong>
    <br />
    <br />
    <List @click="upload()" border v-for="item in data" :key="item.policyid">
      <ListItem>
        <span class="spanStyle">{{item.policyfilename}}</span>
        <template slot="action">
          <li>
            <div style="color:blue" @click="show(item)">预览</div>
          </li>
          <li>
            <div style="color:blue" @click="upload(item)">下载</div>
          </li>
        </template>
      </ListItem>
      <detailModal v-if="ifshow" :filename="filename" :title="title" @success="success"></detailModal>
    </List>
  </section>
</template>

<script>
import services from '../../../api/services'
import detailModal from './modal'
export default {
  name: 'userPolicy',
  data () {
    return {
      data: [],
      filename: '',
      ifshow: false,
      title: ''
    }
  },
  components: {
    detailModal
  },
  watch: {},
  mounted () {
    this.$http.post(services.selectAllName.selectAllName).then(res => {
      if (res.data) {
        console.dir(res.data.result)
        this.data = res.data.result
      }
    })
  },
  methods: {
    upload (item) {
      this.$http.get(services.download.download + '?id=' + item.policyid).then(res => {
        window.location.href =
          services.download.download + '?id=' + item.policyid
      })
    },
    show (item) {
      this.title = item.policyfilename
      let tmp = {
        policyurl: item.policyurl,
        policyfilename: item.policyfilename,
        policysize: item.policysize
      }
      this.$http.post(services.show.show, tmp).then(res => {
        if (res.data.result) {
          for (let i = 0; i < res.data.result.length; i++) {
            this.filename += res.data.result[i]
          }
          console.dir(this.filename)
          this.ifshow = true
        }
        if (res.data.result == null && res.data.resultMessage === '文件过大，暂不支持预览，请先下载后查看') {
          this.$Message.warning({
            content: '文件过大，暂不支持预览，请先下载后查看!',
            duration: 5
          })
        }
      })
    },
    success (value) {
      this.ifshow = false
      this.filename = ''
    }
  }
}
</script>

<style scoped lang="less">
.spanStyle {
  width: 100%;
}
</style>
