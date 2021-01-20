<template>
  <div class="settleReport">
    <div class="search">
      <div class="formStyle">
        <Form ref="formValidate" :label-width="80" :rules="ruleValidate">
          <Row :gutter="24">
            <Col span="8" class="colStyle">
              <FormItem label="工龄" prop="workage">
                <Input v-model="formValidate.workage" placeholder="Enter your name"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="部门" prop="departmentid">
                <Select v-model="formValidate.departmentid" style="width:200px">
                  <Option
                    v-for="item in departOption"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="转正日期" prop="conversiontime">
                <DatePicker
                  type="date"
                  format="yyyy-MM-dd"
                  v-model="formValidate.conversiontime"
                  @on-change="formValidate.conversiontime=$event"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row class="rowStyle">
            <Col span="12">
              <Button type="primary" @click="handleSubmit()">查询</Button>
              <Button type="primary" @click="export_excel()">导出</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="main">
      <Row>
        <Col span="24">
          <div class="main_page">
            <span class="textStyle">第{{pageIndex}}页/共{{totalPage}}页 共{{dataCount}}条</span>
            <Page
              class="pageStyle"
              simple
              show-sizer
              show-total
              :pageHeight="pageHeight"
              :total="dataCount"
              :page-size="pageSize"
              @on-page-size-change="pageSizeChange"
              @on-change="changepage"
            ></Page>
          </div>
        </Col>
      </Row>

      <Table :height="tableHeight" border ref="selection" :columns="columns4" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
          <Input readonly v-model="settleCycle" style="width: auto">
            <Icon type="ios-search" slot="suffix" @click="goCycleData()" />
          </Input>
        </template>
      </Table>
    </div>
    <cycle-data v-if="ifShow" @confirm="confirm"></cycle-data>
    <expend-task v-if="ifExist" @task="task"></expend-task>
    <div class="footer"></div>
  </div>
</template>

<script>
import services from '../../../api/services'

import { export2Excel } from '../../../components/common/js/util'
export default {
  components: {
    'cycle-data': cycleData,
    'expend-task': expendTask
  },
  data () {
    return {
      pageIndex: 1,
      totalPage: 0,
      tableHeight: 0,
      ifShow: false,
      ifExist: false,
      formValidate: {
        workage: '',
        departmentid: '',
        conversiontime: ''
      },
      ruleValidate: {
        // workage: [
        //  { required: true, message: '', trigger: 'blur' }
        // ],
        // departmentid: [
        //  { required: true, message: 'Please select the city', trigger: 'change' }
        // ],
        // conversiontime: [
        //  { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        // ],
      },
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id',
          width: 100,
          resizable: true
        },
        {
          title: '姓名',
          key: 'name',
          width: 100,
          resizable: true
        },
        {
          title: '工号',
          key: 'workid',
          width: 100,
          resizable: true
        },
        {
          title: '性别',
          key: 'gender',
          width: 100,
          resizable: true
        },
        {
          title: '出生日期',
          key: 'birthdayDesc',
          width: 180,
          resizable: true
        },
        {
          title: '籍贯',
          key: 'nativeplace',
          width: 100,
          resizable: true
        },
        {
          title: '民族',
          key: 'nationDesc',
          width: 100,
          resizable: true
        },
        {
          title: '在职状态',
          key: 'workstate',
          width: 100,
          resizable: true
        },
        {
          title: '手机号',
          key: 'phone',
          width: 180,
          resizable: true
        },
        {
          title: '学历',
          key: 'tiptopdegree',
          width: 100,
          resizable: true
        },
        {
          title: '工龄',
          key: 'workageDesc',
          width: 100,
          resizable: true
        },
        {
          title: '转正日期',
          key: 'conversiontimeDesc',
          width: 180,
          resizable: true
        },
        {
          title: '入职日期',
          key: 'begindateDesc',
          width: 180,
          resizable: true
        },
        {
          title: '职位',
          key: 'posName',
          width: 100,
          resizable: true
        },
        {
          title: '部门',
          key: 'departName',
          width: 100,
          resizable: true
        }
      ],
      data1: [],
      dataTotal: []
    }
  },
  created () {
  },
  computed: {
    departOption () {
      // 映射getter的数据到组件中，可以直接使用
      return this.$store.getters['depart/getDepartOption'] || []
    }
  },
  mounted () {
    this.$http.post(services.param.getDepart).then(res => {
      if (res && res.data.result) {
        console.dir(res.data.result)
        this.$store.dispatch('depart/departOption', res.data.result)
      }
    })
    this.tableHeight = (document.documentElement.clientHeight * (7 / 10))
    this.$http
      .post(services.emplyeeInfo.emplyeeInfo)
      .then(
        res => {
          if (res.data && res) {
            console.dir(res.data.result)
            this.dataTotal = res.data
            this.dataCount = this.dataTotal.result.length
            this.totalPage = Math.ceil(this.dataTotal.result.length / this.pageSize)

            if (this.dataTotal.result.length < this.pageSize) {
              this.data1 = this.dataTotal.result
            } else {
              this.data1 = this.dataTotal.result.slice(0, this.pageSize)
            }
          } else if (res.data && res.data.resultCode !== '000000') {
            // this.$dialog.alert({ message: '服务器调用出错！' })
          }
        },
        res => {
          // error callback
        }
      )
  },
  methods: {
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    export_excel () {
      export2Excel(this.columns4, this.data1)
    },
    handleSubmit () {
      console.dir(this.formValidate.conversiontime)
      this.$http
        .post(services.selectEmp.selectEmp, this.formValidate)
        .then(
          res => {
            if (res.data && res) {
              console.dir(res.data.result)
              this.dataTotal = res.data
              this.dataCount = this.dataTotal.result.length
              this.totalPage = Math.ceil(this.dataTotal.result.length / this.pageSize)

              if (this.dataTotal.result.length < this.pageSize) {
                this.data1 = this.dataTotal.result
              } else {
                this.data1 = this.dataTotal.result.slice(0, this.pageSize)
              }
            } else if (res.data && res.data.resultCode !== '000000') {
              // this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    skip2Total () {
      this.$router.push({ path: 'excelDemo' })
    },
    skipt2Little () {
      this.$router.push({ path: 'excelDemo' })
    },
    changepage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.pageIndex = index
      console.dir(_start)
      console.dir(_end)
      this.data1 = this.dataTotal.result.slice(_start, _end)
      console.dir(this.data1)
    },
    pageSizeChange (value) {
      this.pageSize = value
      this.totalPage = Math.ceil(this.datacount / this.pageSize)
    }

  }
}
</script>

<style lang="less" scope>
.settleReport {
  height: 100%;
  background-color: #fff;
  .formStyle {
    width: 100%;
    .rowStyle {
      width: 50%;
    }
  }
  .main {
    padding: 10px;
    .main_page {
      height: 10%;
      display: flex;
      flex-direction: row;
      float: right;
      .pageStyle {
        width: auto;
        margin-bottom: 5px;
      }
      .textStyle {
        width: auto;
        font-size: 14px;
        height: 32px;
        line-height: 29px;
      }
    }
  }
}
button,
html [type='button'],
[type='reset'],
[type='submit'] {
  width: 90px;
  margin-left: 15px;
}
</style>
