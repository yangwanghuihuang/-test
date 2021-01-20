<template>
  <div class="editModal">
    <Modal v-model="modal2" width="500" @on-cancel="cancel">
      <p slot="header" style="color:#f60;text-align:left">
        <Button class="btn" type="primary" @click="del('0')">保存</Button>

        <Button class="btn" type="primary" @click="del('1')">返回</Button>
      </p>
      <div style="text-align:left">
        <Form ref="formValidate" label-position="right" :label-width="100">
          <FormItem label="部门编号：">
            <Input
              v-model="formValidate.id"
              disabled
              placeholder="default size"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="部门名称：">
            <Input v-model="formValidate.name" placeholder="河北石家庄" style="width: 200px" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import services from '../../../api/services'
export default {
  name: 'editModal',
  data () {
    return {
      modal2: true,
      idDisabled: true,
      formValidate: {
        id: '',
        name: ''
      }

    }
  },
  props: {
    infoId: {
      type: Number,
      default: 0
    }
  },
  components: {},
  watch: {},
  mounted () {
    let tmp = {
      id: this.infoId
    }
    this.$http
      .post(services.queryDepartById.queryDepartById, tmp)
      .then(
        res => {
          if (res.data && res && res.data.result) {
            this.formValidate = res.data.result
          } else if (res.data && res.data.resultCode !== '000000') {

          }
        },
        res => {
          // error callback
        }
      )
  },
  methods: {
    del (value) {
      if (value === '1') {
        this.$emit('edit', '1')
      }
      // 保存
      if (value === '0') {
        this.$http
          .post(services.updateDeparts.updateDeparts, this.formValidate)
          .then(
            res => {
              if (res.data && res) {
                this.$emit('edit', '0')
              } else if (res.data && res.data.resultCode !== '000000') {
                this.$dialog.alert({ message: '服务器调用出错！' })
              }
            },
            res => {
              // error callback
            }
          )
      }
    },
    cancel () {
      this.$emit('edit', '1')
    }
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
.ivu-modal-header p,
.ivu-modal-header-inner {
  height: 32px;
  line-height: 32px;
}
</style>
