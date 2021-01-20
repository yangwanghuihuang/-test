<template>
  <div class="userGuide">
    <div class="search">
      <Row>
        <Col span="18">
          <Input
            search
            enter-button
            v-model="name"
            @on-enter="selectByName(name)"
            @on-click="selectByName(name)"
            placeholder="按照姓名查询员工信息，记得回车哦"
          />
        </Col>
        <Col span="3">
          <Button type="primary" @click="insertEmployee()">添加员工</Button>
        </Col>
        <Col span="3">
          <Button type="primary" @click="export_excel">导出excel</Button>
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

      <Table
        :height="tableHeight"
        style="width:100%"
        border
        ref="selection"
        :columns="columns4"
        :data="data1"
      ></Table>
    </div>

    <div class="footer"></div>
    <add-emplyee v-if="ifShow" @save="save"></add-emplyee>
    <edit-employee v-if="ifExist" :infoId="infoId" @edit="edit"></edit-employee>
    <notice-modal v-if="ifNotice" @notice="notice"></notice-modal>
  </div>
</template>

<script>
import services from '../../../api/services'
import { export2Excel } from '../../../components/common/js/util'
import addEmployee from './saveModal'
import editEmployee from './editModal'
import noticeModal from './noticeModal'
export default {
  components: {
    'add-emplyee': addEmployee,
    'edit-employee': editEmployee,
    'notice-modal': noticeModal
  },
  data () {
    return {
      ifShow: false,
      ifNotice: true,
      name: '',
      pageIndex: 1,
      totalPage: 0,
      infoId: 0,
      tableHeight: 0,
      pageHeight: 0,
      settleCycle: '2010',

      ifExist: false,
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 5,
      columns4: [
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
        },
        {
          title: 'Action',
          key: 'action',
          width: 250,
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
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {

          }
        )
    },
    show (index) {
      this.infoId = this.data1[index].id
      console.dir(this.infoId)
      this.ifExist = true
    },
    remove (index) {
      this.infoId = this.data1[index].id
      let tmp = {
        id: this.infoId
      }
      this.$http
        .post(services.deleteById.deleteById, tmp)
        .then(
          res => {
            if (res.data && res && res.data.result) {
              console.dir(res.data)
              this.data1.splice(index, 1)
              this.dataCount--
              this.totalPage = Math.ceil(this.dataCount / this.pageSize)
            } else if (res.data && res.data.resultCode !== '000000') {
              this.$dialog.alert({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    insertEmployee () {
      this.ifShow = true
    },
    save (value) {
      if (value) {
        this.ifShow = false
        this.initData()
        console.dir(this.data1)
      }
    },
    edit (value) {
      if (value) {
        this.ifExist = false
        this.initData()
        console.dir(this.data1)
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
      export2Excel(this.columns4, this.data1, '员工资料列表')
    },
    selectByName (value) {
      let tmp = {
        name: value
      }
      this.$http
        .post(services.emplyeeByName.emplyeeByName, tmp)
        .then(
          res => {
            if (res.data && res && res.data.result) {
              console.dir(res.data)
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
    notice () {
      this.ifNotice = false
    }

  }
}
</script>

<style lang="less" scope>
.userGuide {
  height: 100%;
  background-color: #fff;
  .search {
    height: 9%;
    padding-left: 10px;
    text-align: left;
    margin: 2px;
    .btnStyle {
      height: 36%;
    }
    .ivu-col-span-3 {
      padding-left: 57px !important;
    }

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

        // margin-left: 1140px;
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
