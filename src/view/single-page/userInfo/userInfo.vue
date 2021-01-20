<template>
  <section class="userInfo">
    <Form
      ref="formValidate"
      label-position="right"
      :label-width="100"
      :model="formValidate"
      :rules="ruleFormValidate"
    >
      <Row>
        <Col span="12">
          <FormItem label="姓名：">
            <Input v-model="formValidate.name" placeholder="default size" style="width: 200px" />
          </FormItem>
          <FormItem label="性别：">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="男"></Radio>
              <Radio label="女"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="出生日期：">
            <DatePicker type="date" v-model="formValidate.birthday" disabled style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="籍贯：">
            <Input v-model="formValidate.nativeplace" placeholder="河北石家庄" style="width: 200px" />
          </FormItem>
          <FormItem label="民族：">
            <Input v-model="formValidate.nationDesc" placeholder="河北石家庄" style="width: 200px" />
          </FormItem>
          <FormItem label="手机号：" prop="phone">
            <Input v-model="formValidate.phone" placeholder="default size" style="width: 200px" />
          </FormItem>
          <FormItem label="工号：">
            <Input v-model="formValidate.workid" disabled placeholder="89785" style="width: 200px" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="学历：" style="width: 200px">
            <Input v-model="formValidate.tiptopdegree" placeholder="89785" style="width: 200px" />
          </FormItem>
          <!-- <FormItem label="工龄：">
                        <Input v-model="formValidate.workage"  placeholder="3年" style="width: 200px"/>
          </FormItem>-->
          <FormItem label="入职日期：">
            <DatePicker type="date" v-model="formValidate.begindate" disabled style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="转正日期：">
            <DatePicker
              type="date"
              v-model="formValidate.conversiontime"
              disabled
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="部门：" prop="departName">
            <Input
              v-model="formValidate.departName"
              disabled
              placeholder="河北石家庄"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="职位：">
            <Input
              v-model="formValidate.posName"
              disabled
              placeholder="河北石家庄"
              style="width: 200px"
            />
          </FormItem>
          <FormItem label="在职状态：">
            <Input
              v-model="formValidate.workstate"
              disabled
              placeholder="河北石家庄"
              style="width: 200px"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="updateUserInfo()">修改</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <notice-modal v-if="ifNotice" @notice="notice"></notice-modal>
  </section>
</template>

<script>
import services from '../../../api/services'
import { validatePhone } from '../../../libs/util'
// import { getBreadCrumbList, getSiderMenuMap } from '@/libs/util'
import noticeModal from '../userGuide/noticeModal'
export default {
  name: 'userInfo',
  data () {
    return {
      userWorkId: '',
      ifNotice: true,
      formValidate: {
        name: '',
        nativeplace: '',
        nationDesc: '',
        birthday: '',
        gender: '',
        phone: '',
        workid: '',
        tiptopdegree: '',
        workage: '',
        daterange: '',
        conversiontime: '',
        begindate: '',
        posName: '',
        departName: '',
        workstate: ''
      },
      ruleFormValidate: {
        phone: { required: true, validator: validatePhone, trigger: 'blur' }
      }
    }
  },
  components: {
    'notice-modal': noticeModal
  },
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let tmp = {}
      if (this.$route.params.userId) {
        tmp = {
          workid: this.$route.params.userId
        }
      } else {
        tmp = {
          workid: localStorage.getItem('userWorkid')
        }
      }

      console.dir(tmp)
      // emplyeeByworkId
      this.$http
        .post(services.employeeByWorid.employeeByWorid, tmp)
        .then(
          res => {
            if (res.data && res) {
              console.dir(res.data.result)
              this.formValidate = res.data.result
              console.dir(this.formValidate.phone)
            } else if (res.data && res.data.resultCode !== '000000') {
              this.$Message.warn({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    updateUserInfo () {
      this.$http
        .post(services.updateEmp.updateEmp, this.formValidate)
        .then(
          res => {
            if (res.data && res) {
              this.initData()
            } else if (res.data && res.data.resultCode !== '000000') {
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    notice () {
      this.ifNotice = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
