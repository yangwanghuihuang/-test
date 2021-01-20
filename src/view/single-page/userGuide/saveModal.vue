<template>
  <div>
    <Modal v-model="modal2" width="800" @on-cancel="cancel">
      <!-- <p slot="header" style="color:#f60;text-align:left" >
            <Button type="primary" :loading="modal_loading" @click="del('0')">提交</Button>

            <Button type="primary" :loading="modal_loading" @click="del('1')">返回</Button>
      </p>-->
      <div style="text-align:left">
        <Form
          ref="formValidate"
          :model="formValidate"
          label-position="right"
          :label-width="100"
          :rules="ruleFormValidate"
        >
          <Row>
            <Col span="12">
              <FormItem label="姓名：" prop="name">
                <Input v-model="formValidate.name" placeholder="default size" style="width: 200px" />
              </FormItem>
              <FormItem label="性别：" prop="gender">
                <RadioGroup v-model="formValidate.gender">
                  <Radio label="男"></Radio>
                  <Radio label="女"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="出生日期：" prop="birthday">
                <DatePicker
                  type="date"
                  v-model="formValidate.birthday"
                  placeholder="Select date"
                  @on-change="formValidate.birthday=$event"
                  format="yyyy-MM-dd"
                  style="width: 200px"
                  :options="options"
                ></DatePicker>
              </FormItem>
              <FormItem label="籍贯：" prop="nativeplace">
                <Input v-model="formValidate.nativeplace" placeholder="河北石家庄" style="width: 200px" />
              </FormItem>
              <FormItem label="民族：" prop="nationDesc">
                <Input v-model="formValidate.nationDesc" placeholder="河北石家庄" style="width: 200px" />
              </FormItem>
              <FormItem label="手机号：" prop="phone">
                <Input
                  v-model="formValidate.phone"
                  placeholder="default size"
                  style="width: 200px"
                />
              </FormItem>
              <FormItem label="工号：" prop="workid">
                <Input v-model="formValidate.workid" placeholder="89785" style="width: 200px" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="学历：" style="width: 200px">
                <Select v-model="formValidate.tiptopdegree" placeholder="请选择">
                  <Option value="1" selected>博士</Option>
                  <Option value="2">硕士</Option>
                  <Option value="3">本科</Option>
                  <Option value="4">大专</Option>
                  <Option value="5">高中</Option>
                  <Option value="6">初中</Option>
                  <Option value="7">小学</Option>
                  <Option value="8">小学</Option>
                </Select>
              </FormItem>
              <!-- <FormItem label="工龄：">
                        <Input v-model="formValidate.workage"  placeholder="3年" style="width: 200px"/>
              </FormItem>-->
              <FormItem label="入职日期：" prop="begindate">
                <DatePicker
                  type="date"
                  @on-change="formValidate.begindate=$event"
                  v-model="formValidate.begindate"
                  placeholder="Select date  必填写"
                  style="width: 200px"
                  format="yyyy-MM-dd"
                  :options="optionsEntry"
                ></DatePicker>
              </FormItem>
              <!-- <FormItem label="转正日期：" prop="conversiontime">
                <DatePicker
                  type="date"
                  v-model="formValidate.conversiontime"
                  placeholder="Select date"
                  style="width: 200px"
                  format="yyyy-MM-dd"
                  @on-change="formValidate.conversiontime=$event"
                ></DatePicker>
              </FormItem>-->
              <FormItem label="部门：" prop="departmentid">
                <Select
                  v-model="formValidate.departmentid"
                  style="width:200px"
                  @on-change="getPositionOption()"
                >
                  <Option
                    v-for="item in departOption"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="职位：">
                <Select :disabled="idDisabled" v-model="formValidate.posid" style="width:200px">
                  <Option
                    v-for="item in PositonOption"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
              <FormItem label="在职状态：">
                <Select
                  disabled
                  v-model="formValidate.workstate"
                  placeholder="请选择--"
                  style="width:200px"
                >
                  <Option value="1" selected>试用期</Option>
                  <Option value="2">正式员工</Option>
                  <Option value="3">离职</Option>
                </Select>
              </FormItem>
              <FormItem label="权限：">
                <Select v-model="formValidate.remark" placeholder="请选择--" style="width:200px">
                  <Option value="1" selected>员工</Option>
                  <Option value="0">管理员</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="del('1')" style="margin-left: 8px">返回</Button>
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
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback('手机号格式不正确')
      } else {
        callback()
      }
    }
    return {
      modal2: true,
      modal_loading: false,
      idDisabled: true,
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now() - 86400000
        }
      },
      optionsEntry: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      formValidate: {
        name: '',
        nativeplace: '',
        nationDesc: '',
        birthday: '',
        gender: '1',
        phone: '',
        workid: '',
        tiptopdegree: '1',
        workage: '',
        daterange: '',
        // conversiontime: '',
        begindate: '',
        posid: '',
        departmentid: '1',
        workstate: '1',
        remark: '1'
      },
      ruleFormValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: { required: true, message: '请选择性别', trigger: 'blur' },

        nativeplace: { required: true, message: '选择籍贯', trigger: 'blur' },
        nationDesc: { required: true, message: '选择民族', trigger: 'blur' },
        phone: { required: true, validator: validatePhone, trigger: 'blur' },
        workid: { required: true, message: '请输入员工工号', trigger: 'blur' }

      }
    }
  },
  computed: {
    departOption () {
      // 映射getter的数据到组件中，可以直接使用
      return this.$store.getters['depart/getDepartOption'] || []
    },
    PositonOption () {
      // 映射getter的数据到组件中，可以直接使用
      return this.$store.getters['position/getPositionOption'] || []
    }
  },
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
        this.$emit('save', '1')
      }
    },
    handleSubmit (formValidate) {
      this.$refs[formValidate].validate((valid) => {
        if (valid) {
          this.$http
            .post(services.addEmplyee.addEmplyee, this.formValidate)
            .then(
              res => {
                if (res.data && res) {
                  if (res.data.resultMessage === '工号重复，请重新输入') {
                    this.$Message.info('工号重复，请重新输入')
                  }
                  this.$emit('save', '0')
                } else if (res.data && res.data.resultCode !== '000000') {
                  this.$dialog.alert({ message: '服务器调用出错！' })
                }
              },
              res => {

              }
            )
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    getPositionOption () {
      if (this.formValidate.departmentid) {
        this.idDisabled = false
      } else {
        this.idDisabled = true
        this.formValidate.posid = ''
      }
      let tmp = {
        id: this.formValidate.departmentid
      }
      this.$http.post(services.getPost.getPost, tmp).then(res => {
        if (res && res.data.result) {
          console.dir(res.data.result)
          this.$store.dispatch('position/PositonOption', res.data.result)
        }
      })
    },
    cancel () {
      this.$emit('save', '1')
    }
  }
}
</script>
<style lang="less" scope>
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
  text-align: center;
}
.ivu-form-item {
  margin-bottom: 16px;
}

.ivu-modal-footer {
  border-top: 0px solid #eeeeee;
}
</style>
