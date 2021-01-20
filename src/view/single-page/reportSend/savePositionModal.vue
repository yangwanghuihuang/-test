<template>
  <div class="savePositionModal">
    <Modal v-model="modal2" width="500" @on-cancel="cancel">
      <p slot="header" style="color:#f60;text-align:left">
        <Button class="btn" type="primary" @click="del('0')">保存</Button>

        <Button class="btn" type="primary" @click="del('1')">返回</Button>
      </p>
      <div style="text-align:left">
        <Form ref="formValidate" label-position="right" :label-width="100">
          <FormItem label="岗位名称：">
            <Input v-model="formValidate.name" placeholder="河北石家庄" style="width: 200px" />
          </FormItem>
          <FormItem label="部门：" prop="departmentid" :label-width="100">
            <Select v-model="formValidate.departid" style="width:200px">
              <Option
                v-for="item in departOption"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </Select>
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
  name: 'savePositionModal',
  data () {
    return {
      modal2: true,
      idDisabled: true,
      formValidate: {
        name: '',
        departid: ''
      }
    }
  },
  computed: {
    departOption () {
      // 映射getter的数据到组件中，可以直接使用
      return this.$store.getters['depart/getDepartOption'] || []
    }
  },
  components: {},
  watch: {},
  mounted () {
    this.$http.post(services.param.getDepart).then(res => {
      if (res && res.data.result) {
        console.dir(res.data.result)
        this.$store.dispatch('depart/departOption', res.data.result)
      }
    })
  },
  methods: {
    del (value) {
      if (value === '1') {
        this.$emit('savePos', '1')
      }
      // 保存
      if (value === '0') {
        this.$http
          .post(services.addPosts.addPosts, this.formValidate)
          .then(
            res => {
              if (res.data && res) {
                this.$emit('savePos', '0')
              } else if (res.data && res.data.resultCode !== '000000') {
                this.$message.warn({ message: '服务器调用出错！' })
              }
            },
            res => {
              // error callback
            }
          )
      }
    },
    cancel () {
      this.$emit('savePos', '1')
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
