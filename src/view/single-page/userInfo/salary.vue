<template>
  <div class="salary">
    <div class="search">
      <Form ref="formSearch" label-position="right" :label-width="150">
        <Row>
          <Col span="6">
            <FormItem label=" 请输入查询月份：">
              <DatePicker
                type="month"
                format="yyyy-MM"
                @on-change="formSearch.dateRange=$event"
                v-model="formSearch.dateRange"
                placeholder=" 请输入查询月份"
              ></DatePicker>
            </FormItem>
          </Col>
          <Button class="btnStyle" type="primary" @click="searchSalary()">查询</Button>
        </Row>
      </Form>
    </div>
    <hr />
    <div class="result">
      <div v-if="ifExist">
        <Row>
          <Col span="24">
            <div class="main_page">
              <span class="textStyle">第{{pageIndex}}页/共{{totalPage}}页 共{{dataCount}}条</span>
              <Page
                class="pageStyle"
                simple
                show-sizer
                show-total
                :total="dataCount"
                :page-size="pageSize"
                @on-page-size-change="pageSizeChange"
                @on-change="changepage"
              ></Page>
            </div>
          </Col>
        </Row>
        <Table :height="tableHeight" border ref="selection" :columns="columns4" :data="data1"></Table>
      </div>

      <Form v-if="ifshow" ref="formValidate" label-position="right" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="姓名：">
              <Input v-model="formValidate.empName" disabled placeholder="姓名" style="width: 200px" />
            </FormItem>
            <FormItem label="工号：">
              <Input v-model="formValidate.workid" disabled placeholder="工号" style="width: 200px" />
            </FormItem>
            <FormItem label="基本工资：">
              <Input
                v-model="formValidate.basicwages"
                disabled
                placeholder="0"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="交通补助：">
              <Input
                v-model="formValidate.trafficsalary"
                disabled
                placeholder="0"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="午餐补助：">
              <Input
                v-model="formValidate.lunchsalary"
                disabled
                placeholder="0"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="奖金：">
              <Input v-model="formValidate.bonus" disabled placeholder="0" style="width: 200px" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="社保">
              <Input
                v-model="formValidate.socialsecurity"
                placeholder="0"
                style="width: 200px"
                disabled
              />
            </FormItem>
            <FormItem label="公积金：">
              <Input
                v-model="formValidate.accumulationfund"
                placeholder="0.0"
                style="width: 200px"
                disabled
              />
            </FormItem>
            <FormItem label="实发工资：">
              <Input
                v-model="formValidate.realwages"
                disabled
                placeholder="0.0"
                style="width: 200px"
              />
            </FormItem>
            <FormItem label="应发工资：">
              <Input
                v-model="formValidate.shouldpay"
                disabled
                placeholder="0"
                style="width: 200px"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import services from '../../../api/services'
export default {
  name: 'salary',
  data () {
    return {
      ifshow: false,
      ifExist: true,
      tableHeight: 0,
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 5,
      // 当前页数
      pageIndex: 1,
      totalPage: 0,
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'empName'

        },
        {
          title: '月份',
          key: 'yearandmonth'
        },
        {
          title: '工号',
          key: 'workid'

        },
        {
          title: '基本工资',
          key: 'basicwages'

        },
        {
          title: '交通补助',
          key: 'trafficsalary'

        },
        {
          title: '午餐补助',
          key: 'lunchsalary'

        },
        {
          title: '奖金',
          key: 'bonus'

        },
        {
          title: '社保',
          key: 'socialsecurity'

        },

        {
          title: '公积金',
          key: 'accumulationfund'
        },
        {
          title: '实际工资',
          key: 'realwages'
        },
        {
          title: '应发工资',
          key: 'shouldpay'
        }
      ],
      data1: [],
      dataTotal: [],
      formSearch: {
        dateRange: ''
      },
      data2: [],
      formValidate: {
        empName: '',
        workid: '',
        basicsalary: '',
        trafficsalary: '',
        lunchsalary: '',
        bonus: '',
        socialsecurity: '',
        accumulationfundbase: '',
        accumulationfund: '',
        shouldpay: '',
        realwages: '',
        basicwages: ''
      }
    }
  },
  components: {},
  watch: {},
  mounted () {
    // 查询后台数据，当前workid的当月工资
    this.initData()
  },
  methods: {
    initData () {
      let tmp = {
        empworkid: localStorage.getItem('userWorkid')
      }

      this.$http
        .post(services.empSalaryByMonth.empSalaryByMonth, tmp)
        .then(

          res => {
            console.dir(res.data && res.data.result.length === 0)
            if (res.data && res && res.data.result) {
              this.dataTotal = res.data
              this.dataCount = this.dataTotal.result.length
              this.totalPage = Math.ceil(this.dataTotal.result.length / this.pageSize)
              if (this.dataTotal.result.length < this.pageSize) {
                this.data1 = this.dataTotal.result
              } else {
                this.data1 = this.dataTotal.result.slice(0, this.pageSize)
              }
              //   this.createDate=new Date(res.data.result.createDateDesc)
            }
            if (res.data && res.data.result.length === 0) {
              this.$Message.warning({
                content: '该员工暂无工资数据!',
                duration: 5
              })
            }
          },
          res => {
            // error callback
          }
        )
    },
    searchSalary () {
      if (this.formSearch.dateRange === '') {
        this.ifExist = true
        this.ifshow = false
        this.initData()
        console.dir(this.formSearch.dateRange)
      } else {
        this.ifExist = false
        this.ifshow = true
        let tmp = {
          yearandmonth: this.formSearch.dateRange,
          empworkid: localStorage.getItem('userWorkid')
        }

        // 查询后台数据，当前workid的选择月份工资

        this.$http
          .post(services.empSalaryByMonth.empSalaryByMonth, tmp)
          .then(
            res => {
              if (res.data && res && res.data.result) {
                this.data2 = res.data.result
                this.formValidate = this.data2[0]
                console.dir(res.data.result.createDateDesc)
                this.formValidate.createDate = res.data.result.createDateDesc
              } else if (res.data && res.data.result === null) {
                this.$Message.warning({
                  content: '该员工本月无工资数据!',
                  duration: 5
                })
              }
            },
            res => {
              // error callback
            }
          )
      }
    },
    changepage (index) {
      console.dir(index)
      this.pageIndex = index
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      console.dir(_start)
      console.dir(_end)
      this.data1 = this.dataTotal.result.slice(_start, _end)
      console.dir(this.data1)
    },
    pageSizeChange (value) {
      this.pageSize = value
      this.totalPage = Math.ceil(this.dataTotal.result.length / this.pageSize)
    }

  }
}
</script>

<style scoped lang="less">
.salary {
  width: 100%;
  height: 100%;
  .btnStyle {
    margin-left: 10px;
  }
  .result {
    width: 100%;
    margin-top: 15px;
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
        // margin-left: 1140px;
        font-size: 14px;
        height: 32px;
        line-height: 29px;
      }
    }
  }
}
</style>
