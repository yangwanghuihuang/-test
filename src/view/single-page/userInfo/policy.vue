<template>
  <section class="policy">
    <Tabs class="tabsStyle">
      <TabPane label="上传文件">
        <Upload
          :before-upload="handleUpload"
          action
          multiple
          :format="['docx','doc','txt', 'pdf']"
          type="drag"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或拖拽上传文件</p>
          </div>
        </Upload>
        <Button class="btn" type="primary" @click="upload()">上传</Button>
        <div>
          <ul class="file-list" v-for="(list,index) in add.uploadFile" :key="index">
            <li>
              <span style="font-size:15px;">文件名: {{ list.name }}</span>
              <Icon type="ios-close" size="25" color="red" @click="delFileList(index)"></Icon>
            </li>
          </ul>
        </div>
      </TabPane>
      <TabPane class="tab2" label="查看并下载" name="name2">
        <List border v-for="item in data" :key="item.policyid">
          <ListItem>
            <span class="spanStyle">{{item.policyfilename}}</span>
            <template slot="action">
              <li>
                <div style="color:blue" @click="show(item)">预览</div>
              </li>
              <li>
                <div style="color:blue" @click="downLoad(item)">下载</div>
              </li>
            </template>
          </ListItem>
        </List>
      </TabPane>
    </Tabs>
    <detailModal v-if="ifshow" :filename="filename" :title="title" @success="success"></detailModal>
  </section>
</template>

<script>
import services from '../../../api/services'
import detailModal from './modal'
export default {
  name: 'policy',
  data () {
    return {
      actionUrl: services.upload.upload,
      modalImport: false,
      file: [],
      loadingStatus: true,
      add: {
        uploadFile: []
      },
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
    delFileList (index) {
      this.add.uploadFile.splice(index, 1)
    },
    handleUpload (file) {
      this.add.uploadFile.push(file)
      console.dir(this.add.uploadFile)
      return false
    },
    upload () {
      this.loadingStatus = true
      console.log('上传：' + this.add.uploadFile)
      var formData = new FormData()
      if (this.add.uploadFile.length > 0) {
        // 多个文件上传
        for (var i = 0; i < this.add.uploadFile.length; i++) {
          console.log('上传：' + this.add.uploadFile[i])
          formData.append('file', this.add.uploadFile[i]) // 文件对象
          formData.append('name', 'wiiiiiinney')
        }
        //  console.dir(formData.get("uploadFile"))
        this.$http
          .post(services.upload.upload, formData) // 使用自己封装的axios方法
          .then(res => {
            console.log(res)
            if (res.data === '上传成功') {
              this.loadingStatus = false
              this.add.uploadFile = []
              console.dir(this.add.uploadFile)
              this.$Message.success('Success')
              location.reload()
            }
            if (res.data === '不允许上传同名文件') {
              this.$Message.success('不允许上传同名文件')
            }
          })
          .catch(error => {
            this.loadingStatus = false
            this.$Message.error('服务器错误' + error)
          })
      } else {
        this.loadingStatus = false
        this.$Message.error('请至少上传一个文件')
      }
    },
    show (item) {
      this.title = item.policyfilename
      console.dir(item)
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
    downLoad (item) {
      window.location.href =
        services.download.download + '?id=' + item.policyid
      // this.$http.get(services.download.download + '?id=' + item.policyid).then(res => {
      // let fileName = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]) // 获取浏览器response header中的文件名
      // // 解决文件名乱码
      // console.dir(fileName)
      // let blob = new Blob([res.data], { type: 'charset=UTF-8' })
      // if ('msSaveOrOpenBlob' in navigator) {
      //   // ie使用的下载方式
      //   window.navigator.msSaveOrOpenBlob(blob, fileName)
      // } else {
      //   let url = URL.createObjectURL(blob)
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   console.dir(fileName)
      //   link.setAttribute('download', fileName)
      //   document.body.appendChild(link)
      //   link.click()
      // }
      // })
    },
    success (value) {
      this.ifshow = false
      this.filename = ''
    }
  }
}
</script>

<style scoped lang="less">
.policy {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: center;
  .tabsStyle {
    width: 60%;
  }
  .tab2 {
    height: 600px;
    overflow-y: scroll;
  }
}
.btn {
  width: 112px;
  margin-left: 40%;
}
.spanStyle {
  width: 100%;
}
</style>
