<template>
  <div class="updateEmpSalary">
    <Modal v-model="modal2" width="800" @on-cancel="cancel">
      <p slot="header" style="color:#f60;text-align:left">
        <Button type="primary" @click="del('0')">保存</Button>

        <Button type="primary" @click="del('1')">返回</Button>
      </p>
      <div style="text-align:left">
        <Form
          ref="formValidate"
          label-position="right"
          :label-width="100"
          :model="formValidate"
          :rules="ruleFormValidate"
        >
          <Row>
            <Col span="12">
              <FormItem label="账套名称：" prop="id">
                <Select v-model="formValidate.id" style="width:200px">
                  <Option
                    v-for="item in salaryOption"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="当前账套名称：" prop="name">
                <Input
                  disabled
                  v-model="formValidate.name"
                  placeholder="1000"
                  style="width: 200px"
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import services from '../../../api/services'
export default {
  name: 'updateEmpSalary',
  props: {
    infoId: {
      type: Number,
      default: 0
    },
    empId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      modal2: true,
      formValidate: {
        name: '',
        empId: 0,
        id: 0
      }
    }
  },
  components: {},
  watch: {},
  computed: {
    salaryOption () {
      // 映射getter的数据到组件中，可以直接使用
      return this.$store.getters['salary/getSalaryOption'] || []
    }
  },
  mounted () {
    console.dir(this.formValidate.basicsalary)
    // 通过账套id，先展示账套信息
    let tmp = {
      id: this.infoId,
      empId: this.empId
    }
    this.$http
      .post(services.empSalaryById.empSalaryById, tmp)
      .then(
        res => {
          if (res.data && res && res.data.result) {
            console.dir(this.formValidate.name)
            this.formValidate.name = res.data.result.name
            //   this.createDate=new Date(res.data.result.createDateDesc)
          } else if (res.data && res.data.resultCode !== '000000') {
            //    this.$dialog.alert({ message: '服务器调用出错！' })
          }
        },
        res => {
          // error callback
        }
      )

    this.$http.post(services.salaryInfo.salaryInfo).then(res => {
      if (res && res.data.result) {
        console.dir(res.data.result)
        this.$store.dispatch('salary/salaryOption', res.data.result)
      }
    })
  },
  methods: {
    cancel () {
      this.$emit('edit', '1')
    },
    del (value) {
      if (value === '1') {
        this.$emit('edit', '1')
      }
      if (value === '0') {
        // 修改账套信息
        this.formValidate.empId = this.empId
        this.$http
          .post(services.salaryById.salaryById, this.formValidate)
          .then(
            res => {
              if (res.data && res && res.data.resultCode === '000000') {
                console.dir(res.data.result)
                this.$emit('edit', '1')
              } else if (res.data && res.data.resultMessage === '该月员工工资已结算，不可重复') {
                this.$Message.warning({
                  content: '该月员工工资已结算，不可重复!',
                  duration: 5
                })
              }
            },
            res => {
            }
          )
      }
    }
  }
}
</script>

<style scoped lang="less">
.ivu-modal-header p,
.ivu-modal-header-inner {
  height: 32px;
  line-height: 32px;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
  margin-right: 10px;
}
.ivu-form .ivu-form-item-label {
  text-align: left;
}
.ivu-form-item {
  margin-bottom: 16px;
}

.ivu-modal-footer {
  border-top: 0px solid #eeeeee;
}
</style>
