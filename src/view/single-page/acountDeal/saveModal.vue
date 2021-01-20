<template>
  <div>
    <Modal v-model="modal2" width="800" @on-cancel="cancel">
      <!-- <p slot="header" style="color:#f60;text-align:left" >
            <Button type="primary" :loading="modal_loading" @click="del('0')">保存</Button>

            <Button type="primary" :loading="modal_loading" @click="del('1')">返回</Button>
      </p>-->
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
              <FormItem label="账套名称" prop="name">
                <Input v-model="formValidate.name" placeholder="1000" style="width: 200px" />
              </FormItem>
              <FormItem label="启用时间" prop="createdate">
                <!-- <Input v-model="formValidate.createDate" placeholder="1000" style="width: 200px"/> -->
                <DatePicker
                  type="date"
                  v-model="formValidate.createdate"
                  placeholder="Select date"
                  style="width: 200px"
                ></DatePicker>
              </FormItem>
              <FormItem label="基本工资" prop="basicsalary">
                <Input v-model="formValidate.basicsalary" placeholder="1000" style="width: 200px" />
              </FormItem>
              <FormItem label="交通补助" prop="trafficsalary">
                <Input
                  v-model="formValidate.trafficsalary"
                  placeholder="1000"
                  style="width: 200px"
                />
              </FormItem>
              <FormItem label="午餐补助" prop="lunchsalary">
                <Input v-model="formValidate.lunchsalary" placeholder="1000" style="width: 200px" />
              </FormItem>
              <FormItem label="奖金" prop="bonus">
                <Input v-model="formValidate.bonus" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="养老金比率" prop="pensionper">
                <Input v-model="formValidate.pensionper" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="养老金基数" prop="pensionbase">
                <Input v-model="formValidate.pensionbase" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="医疗保险比率" prop="medicalper">
                <Input v-model="formValidate.medicalper" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="医疗保险基数" prop="medicalbase">
                <Input v-model="formValidate.medicalbase" placeholder="89785" style="width: 200px" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="工伤保险比率" prop="injuryper">
                <Input v-model="formValidate.injuryper" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="工伤保险基数" prop="injurybase">
                <Input v-model="formValidate.injurybase" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="失业保险比率" prop="unemploymentper">
                <Input
                  v-model="formValidate.unemploymentper"
                  placeholder="89785"
                  style="width: 200px"
                />
              </FormItem>
              <FormItem label="失业保险基数" prop="unemploymentbase">
                <Input
                  v-model="formValidate.unemploymentbase"
                  placeholder="89785"
                  style="width: 200px"
                />
              </FormItem>
              <FormItem label="生育保险比率" prop="birthper">
                <Input v-model="formValidate.birthper" placeholder="89785" style="width: 200px" />
              </FormItem>
              <FormItem label="生育保险基数" prop="birthbase">
                <Input v-model="formValidate.birthbase" placeholder="89785" style="width: 200px" />
              </FormItem>

              <FormItem label="公积金比率" prop="accumulationfundper">
                <Input
                  v-model="formValidate.accumulationfundper"
                  placeholder="89785"
                  style="width: 200px"
                />
              </FormItem>
              <FormItem label="公积金基数" prop="accumulationfundbase">
                <Input
                  v-model="formValidate.accumulationfundbase"
                  placeholder="89785"
                  style="width: 200px"
                />
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="primary" :loading="modal_loading" @click="del('1')">返回</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="error" :loading="modal_loading" @click="del">Delete</Button> -->
      </div>
    </Modal>
  </div>
</template>
<script>
import services from '../../../api/services'
export default {
  data () {
    return {
      modal2: true,
      modal_loading: false,
      formValidate: {
        createdate: '',
        basicsalary: '',
        trafficsalary: '',
        lunchsalary: '',
        bonus: '',
        pensionper: '',
        pensionbase: '',
        medicalper: '',
        medicalbase: '',
        accumulationfundper: '',
        accumulationfundbase: '',
        injurybase: '',
        injuryper: '',
        unemploymentbase: '',
        unemploymentper: '',
        birthper: '',
        birthbase: ''
      },
      ruleFormValidate: {
        name: { required: true, message: '请输入账套名称', trigger: 'blur' },
        lunchsalary: [
          { required: true, message: '请输入午餐补助', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ }
        ],
        basicsalary: { required: true, message: '请输入基本工资', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ },
        trafficsalary: { required: true, message: '请输入交通补助', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ },
        bonus: { required: true, message: '请输入奖金', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ },
        pensionper: { required: true, message: '请输入养老比率，只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ },
        pensionbase: { required: true, message: '请输入养老金基数', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        medicalper: { required: true, message: '请输入医疗比率，只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ },
        createdate: { required: true, type: 'date', message: '请选择创建日期', trigger: 'blur' },
        medicalbase: { required: true, message: '请输入医疗保险', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        accumulationfundbase: { required: true, message: '请输入公积金', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        accumulationfundper: { required: true, message: '请输入公积金比率，只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ },
        injuryper: { required: true, message: '请输入工伤比率,只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ },
        injurybase: { required: true, message: '请输入工伤保险', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        unemploymentbase: { required: true, message: '请输入失业保险', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        birthbase: { required: true, message: '请输入生育保险基数', trigger: 'blur', pattern: /^(([1-9]\d{0,3})|0)?$/ },
        unemploymentper: { required: true, message: '请输入失业比率，只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ },
        birthper: { required: true, message: '请输入生育比率，只允许为小数', trigger: 'blur', pattern: /^(0)(\.\d{0,2})?$/ }
      }
    }
  },
  methods: {
    handleSubmit (formValidate) {
      this.$refs[formValidate].validate((valid) => {
        if (valid) {
          this.$http
            .post(services.saveSalary.saveSalary, this.formValidate)
            .then(
              res => {
                if (res.data && res) {
                  this.$emit('save', '0')
                } else if (res.data && res.data.resultCode !== '000000') {
                  this.$dialog.alert({ message: '服务器调用出错！' })
                }
              },
              res => {
                // error callback
              }
            )
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    del (value) {
      if (value === '1') {
        this.modal_loading = true
        setTimeout(() => {
          this.modal_loading = false
          this.modal2 = false
          this.$Message.success('已取消')
        }, 2000)
        this.$emit('save', '1')
      }
    },
    cancel () {
      this.$Message.info('已取消')
      this.modal1 = true
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
