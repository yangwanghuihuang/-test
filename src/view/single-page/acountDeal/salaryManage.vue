<template>
  <div class="salaryManage">
    <div class="search">
      <Row>
        <Col span="3">
          <Button type="primary" @click="insertEmployee()">添加账套</Button>
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
              :pageHeight="pageHeight"
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
    <edit-salary v-if="ifShow" :infoId="infoId" :infoName="infoName" @edit="edit"></edit-salary>
    <save-salary v-if="ifExist" @save="save"></save-salary>
    <div class="footer"></div>
    <!-- <add-emplyee v-if="ifShow" @save="save"></add-emplyee>
    <edit-employee v-if="ifExist" :infoId="infoId" @edit="edit"></edit-employee>-->
  </div>
</template>

<script>
import services from '../../../api/services'
import editSalary from './editSalaryModal'
import saveSalary from './saveModal'
// import { export2Excel } from '../../../components/common/js/util'
// import addEmployee from './saveModal'
// import editEmployee from './editModal'
export default {
  components: {
    'edit-salary': editSalary,
    'save-salary': saveSalary
  },
  data () {
    return {
      ifShow: false,
      ifExist: false,
      pageIndex: 1,
      totalPage: 0,
      infoId: 0,
      infoName: '',
      tableHeight: 0,
      pageHeight: 0,
      settleCycle: '2010',

      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 5,
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '账套编号',
          key: 'id',
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
          width: 180,
          resizable: true
        },
        {
          title: '启用时间',
          key: 'createDateDesc',
          width: 180,
          resizable: true
        },
        {
          title: '养老金',
          align: 'center',
          children: [
            {
              title: '比率',
              key: 'pensionper',
              align: 'center',
              width: 100
            },
            {
              title: '基数',
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
              title: '比率',
              key: 'medicalper',
              align: 'center',
              width: 100
            },
            {
              title: '基数',
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
              title: '比率',
              key: 'accumulationfundper',
              align: 'center',
              width: 100
            },
            {
              title: '基数',
              key: 'accumulationfundbase',
              align: 'center',
              width: 100
            }
          ]
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
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data1: [],
      dataTotal: []
      // editIndex: -1,  // 当前聚焦的输入框的行数
      // editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      // editAge: '',  // 第二列输入框
      // editBirthday: '',  // 第三列输入框
      // editAddress: '',  // 第四列输入框
    }
  },
  created () {
  },
  mounted () {
    this.tableHeight = (document.documentElement.clientHeight * (7 / 10))
    this.initData()
  },
  methods: {
    initData () {
      this.$http
        .post(services.salaryInfo.salaryInfo)
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
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    show (index) {
      this.infoId = this.data1[index].id
      this.infoName = this.data1[index].name
      console.dir(this.infoId)
      this.ifShow = true
    },
    remove (index) {
      this.infoId = this.data1[index].id
      let tmp = {
        id: this.infoId
      }
      this.$http
        .post(services.deleteSalaryById.deleteSalaryById, tmp)
        .then(
          res => {
            if (res.data && res && res.data.result) {
              console.dir(res.data)
              this.data1.splice(index, 1)
              this.dataCount--
              this.totalPage = Math.ceil(this.dataCount / this.pageSize)
              this.initData()
            } else if (res.data && res.data.resultCode === '000000' && res.data.resultMessage === '请先删除与之关联的员工信息') {
              this.$Message.warning({
                content: '请先删除与之关联的员工信息!',
                duration: 5
              })
            }
          },
          res => {
            // error callback
          }
        )
    },
    insertEmployee () {
      this.ifExist = true
    },
    save (value) {
      if (value) {
        this.ifExist = false
        this.initData()
      }
    },
    edit (value) {
      if (value) {
        this.ifShow = false
        console.dir(111)
        this.initData()
      }
    },
    goCycleData () {
      this.settleCycle = '2010-11'
      this.ifShow = true
    },
    handleSelectAll () {
      alert('按照出账任务类别或者出账任务更新表格数据')
    },
    changepage (index) {
      console.dir(index)
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
    },
    export_excel () {
      export2Excel(this.columns4, this.data1)
    }

  }
}
</script>

<style lang="less" scope>
.salaryManage {
  height: 100%;
  background-color: #fff;
  .search {
    height: 15%;
    padding-left: 10px;
    text-align: left;
    margin: 2px;
    .formStyle {
      padding-top: 15px;
      height: 60%;
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
  .footer {
    //  height: 20%;
  }
}
.ivu-form .ivu-form-item-label {
  text-align: left;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
  margin-right: 10px;
}

.ivu-input-group {
  width: 33%;
}
</style>
