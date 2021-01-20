<template>
  <div class="announcementModal">
    <Modal v-model="showdialog" :title="title" footer-hide @on-cancel="cancel">
      <div>
        <Form :model="formItem" :label-width="110" ref="formItem" :rules="formValidate">
          <FormItem label="创建者" prop="announcementcreator">
            <Input style="width: 85%" v-model="formItem.announcementcreator" placeholder="请输入名称"></Input>
          </FormItem>

          <FormItem label="公告标题" prop="announcementtitle">
            <Input style="width: 85%" v-model="formItem.announcementtitle" placeholder="请输入名称"></Input>
          </FormItem>

          <FormItem label="公告内容" prop="announcementcontent">
            <Input style="width: 85%" v-model="formItem.announcementcontent" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="创建时间：" prop="announcementtime">
            <DatePicker
              type="date"
              @on-change="formItem.announcementtime=$event"
              v-model="formItem.announcementtime"
              placeholder="Select date  必填写"
              style="width: 200px"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </Form>

        <Button class="btn" type="primary" @click="submit">提交</Button>

        <Button class="btn" @click="cancel">返回</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import services from '../../../api/services'
export default {
  name: 'announcementModal',
  props: {
    info: {
      type: Object, // 点击的编辑行信息
      require: false
    }
  },
  data () {
    return {
      showdialog: true,
      title: '新增', // dialog标题
      formItem: {
        announcementcreator: '',
        announcementtitle: '',
        announcementcontent: '',
        announcementtime: ''
      },
      formValidate: {
        announcementcreator: { required: true, message: '请输入创建者姓名', trigger: 'blur', pattern: /.+/ },
        announcementtitle: { required: true, message: '请输入公告标题', trigger: 'blur', pattern: /.+/ },
        announcementcontent: [
          { required: true, message: '请输入公告内容', trigger: 'blur', pattern: /.+/ },
          { required: true, validator: this.formValidation.textRules, trigger: 'blur', pattern: /.+/ }
        ]
      }
    }
  },
  components: {},
  watch: {},
  mounted () {
    this.getIndex()
  },
  methods: {
    // 关闭按钮事件
    cancel () {
      this.$emit('close')
    },
    // 获取编辑状态下index信息
    getIndex () {
      console.dir(this.info)
      if (!this.info.announcementid) {
        console.dir(this.title)
        this.formItem = this.info
      } else {
        this.title = '修改'
        this.formItem = this.info
      }
    },
    submit () {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          if (!this.info.announcementid) {
            this.$http
              .post(services.addAnnouncement.addAnnouncement, this.formItem)
              .then(
                res => {
                  if (res.data && res) {
                    this.$emit('close')
                  } else if (res.data && res.data.resultCode !== '000000') {
                    this.$dialog.alert({ message: '服务器调用出错！' })
                  }
                },
                res => {

                }
              )
          } else {
            this.$http
              .post(services.updateAnnouncement.updateAnnouncement, this.formItem)
              .then(
                res => {
                  if (res.data && res) {
                    this.$emit('close')
                  } else if (res.data && res.data.resultCode !== '000000') {
                    this.$dialog.alert({ message: '服务器调用出错！' })
                  }
                },
                res => {

                }
              )
          }
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-left: 35px;
}
</style>
