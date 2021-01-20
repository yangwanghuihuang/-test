<template>
  <div class="employeeSalary">
    <div class="search">
      <Row>
        <Col span="3">
          <Button type="primary" @click="export_excel()">导出excel</Button>
        </Col>
      </Row>
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
    <updateEmp v-if="ifConfirm" @edit="edit" :infoId="infoId" :empId="empId"></updateEmp>
  </div>
</template>
<script>
// import ModelComponent from '../userGuide/modal.vue'
// import saveConfirm from './saveModal.vue'
// import showConfirm from '../userGuide/showConfirm.vue'
// import updateConfirm from './updateDealModal.vue'
import updateEmp from './updateEmpSalary'
import services from '../../../api/services'
import { export2Excel } from '../../../components/common/js/util'
export default {
  components: {

    'updateEmp': updateEmp
  },
  data () {
    return {
      infoId: 0,
      empId: 0,
      tableHeight: 0,
      ifShow: false,
      ifExist: false,
      ifConfirm: false,
      ifUpdate: false,
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 5,
      // 当前页数
      pageIndex: 1,
      totalPage: 0,
      columns4: [
        {
          title: '编号',
          key: 'empId',
          width: 100,
          resizable: true
        },
        {
          title: '姓名',
          key: 'empName',
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
          title: '手机号',
          key: 'phone',
          width: 180,
          resizable: true
        },
        {
          title: '部门',
          key: 'departName',
          width: 100,
          resizable: true
        },
        {
          title: '账套名称',
          key: 'name',
          width: 180,
          resizable: true
        },
        {
          title: '基本工资',
          key: 'basicsalary',
          width: 100,
          resizable: true
        },
        {
          title: '交通补助',
          key: 'trafficsalary',
          width: 100,
          resizable: true
        },
        {
          title: '午餐补助',
          key: 'lunchsalary',
          width: 100,
          resizable: true
        },
        {
          title: '奖金',
          key: 'bonus',
          width: 100,
          resizable: true
        },
        {
          title: '启用时间',
          key: 'createDateDesc',
          width: 180,
          resizable: true
        },
        {
          title: '养老保险',
          align: 'center',
          children: [
            {
              title: '养老保险比率',
              key: 'pensionper',
              align: 'center',
              width: 100
            },
            {
              title: '养老保险基数',
              key: 'pensionbase',
              align: 'center',
              width: 100
            }
          ]
        },

        {
          title: '医疗保险',
          align: 'center',
          children: [
            {
              title: '医疗保险比率',
              key: 'medicalper',
              align: 'center',
              width: 100
            },
            {
              title: '医疗保险基数',
              key: 'medicalbase',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '失业保险',
          align: 'center',
          children: [
            {
              title: '失业保险比率',
              key: 'unemploymentper',
              align: 'center',
              width: 100
            },
            {
              title: '失业保险基数',
              key: 'unemploymentbase',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '生育保险',
          align: 'center',
          children: [
            {
              title: '生育保险比率',
              key: 'birthper',
              align: 'center',
              width: 100
            },
            {
              title: '生育保险基数',
              key: 'birthbase',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '工伤保险',
          align: 'center',
          children: [
            {
              title: '工伤保险比率',
              key: 'injuryper',
              align: 'center',
              width: 100
            },
            {
              title: '工伤保险基数',
              key: 'injurybase',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '公积金',
          align: 'center',
          children: [
            {
              title: '公积金比率',
              key: 'accumulationfundper',
              align: 'center',
              width: 100
            },
            {
              title: '公积金基数',
              key: 'accumulationfundbase',
              align: 'center',
              width: 100
            }
          ]
        },
        {
          title: '实际工资',
          key: 'allsalary',
          width: 100,
          resizable: true
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '修改账套')
            ])
          }
        }

      ],
      data1: [],
      dataTotal: []
    }
  },
  mounted () {
    this.tableHeight = (document.documentElement.clientHeight * (7 / 10))
    this.initData()
  },
  methods: {
    initData () {
      this.$http
        .post(services.empSalary.empSalary)
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

              // 进行跳转成功页面
              // 成功后调用服务
              // 给父组件传递flag标志，1为关闭当前，打开success。
            } else if (res.data && res.data.resultCode !== '000000') {
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    show (index) {
      this.ifConfirm = true
      this.infoId = this.data1[index].id
      this.empId = this.data1[index].empId
    },
    edit (value) {
      if (value) {
        this.ifConfirm = false
        this.initData()
      }
    },
    export_excel () {
      console.dir(this.data1)
      export2Excel(this.columns4, this.data1, '员工工资列表')
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
<style lang="less" scope>
.employeeSalary {
  height: 100%;
  background-color: #fff;
  .search {
    height: 10%;
    padding-left: 10px;
    text-align: left;
    margin: 2px;
    .btnStyle {
      height: 20%;
    }
    .formStyle {
      margin-top: 15px;
      height: 80%;
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
//     .ivu-form .ivu-form-item-label {
//     text-align: left;
// }
.ivu-form-item {
  margin-bottom: 5px;
  vertical-align: top;
  zoom: 1;
}
</style>
