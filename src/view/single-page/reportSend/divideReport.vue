<template>
  <div class="divideReport">
    <div class="search">
      <Menu mode="horizontal" active-name="1" @on-select="toPost">
        <MenuItem name="1">
          <Icon type="ios-paper" />部门管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people" />岗位管理
        </MenuItem>
      </Menu>
    </div>

    <div class="main">
      <div>
        <Row>
          <Col span="12">
            <div class="pageCss">
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
          <Col span="12">
            <Button class="btnStyle" type="primary" @click="add()">新增</Button>
          </Col>
        </Row>
      </div>
      <Table
        v-if="ifShow"
        :height="tableHeight"
        style="width:100%"
        border
        ref="selection"
        :columns="columns4"
        :data="data1"
      ></Table>
      <Table
        v-if="ifExist"
        :height="tableHeight"
        style="width:100%"
        border
        ref="selection"
        :columns="columns2"
        :data="data2"
      ></Table>
    </div>
    <edit-depart v-if="ifEdit" :infoId="infoId" @edit="editBack"></edit-depart>
    <save-depart v-if="ifSave" @save="save"></save-depart>
    <save-pos v-if="ifSavePos" @savePos="savePos"></save-pos>
    <edit-pos v-if="ifEditPos" :infoId="infoId" @editPos="editPos"></edit-pos>
  </div>
</template>

<script>
import services from '../../../api/services'
import editDepartModal from './editModal'
import addDepartModal from './saveModal'
import addPosModal from './savePositionModal'
import edditPosModal from './editPosMadal'
export default {
  name: 'divideReport',
  data () {
    return {
      infoId: 0,
      ifEdit: false,
      ifSave: false,
      ifSavePos: false,
      ifEditPos: false,
      pageIndex: 1,
      totalPage: 0,
      tableHeight: 0,
      ifShow: true,
      ifExist: false,
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      data1: [],
      data2: [],
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '部门',
          key: 'name'
        },
        {
          title: 'Action',
          key: 'action',
          width: 350,
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
                    this.edit(params.index)
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
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          key: 'id'
        },
        {
          title: '岗位',
          key: 'name'
        },
        {
          title: '部门',
          key: 'departName'
        },
        {
          title: 'Action',
          key: 'action',
          width: 350,
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
                    this.remove1(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  components: {
    'edit-depart': editDepartModal,
    'save-depart': addDepartModal,
    'save-pos': addPosModal,
    'edit-pos': edditPosModal
  },
  watch: {},
  mounted () {
    this.tableHeight = (document.documentElement.clientHeight * (7 / 10))
    this.initData()
  },
  methods: {
    initData () {
      this.$http
        .post(services.param.getDepart)
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
    initPosData () {
      this.$http
        .post(services.selsetAllPosts.selsetAllPosts)
        .then(
          res => {
            if (res.data && res) {
              console.dir(res.data.result)
              this.dataTotal = res.data
              this.dataCount = this.dataTotal.result.length
              this.totalPage = Math.ceil(this.dataTotal.result.length / this.pageSize)

              if (this.dataTotal.result.length < this.pageSize) {
                this.data2 = this.dataTotal.result
              } else {
                this.data2 = this.dataTotal.result.slice(0, this.pageSize)
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
    savePos (value) {
      if (value) {
        this.ifSavePos = false
        this.initPosData()
      }
    },
    add () {
      if (this.ifShow) {
        console.dir(this.ifShow)
        // 调用添加部门接口
        this.ifSave = true
      }
      if (this.ifExist) {
        // 调用添加岗位接口
        this.ifSavePos = true
        console.dir(this.ifSavePos)
      }
    },
    save (value) {
      this.ifSave = false
      this.initData()
    },
    remove (index) {
      this.infoId = this.data1[index].id
      let tmp = {
        id: this.infoId
      }
      this.$http
        .post(services.deleteDeparts.deleteDeparts, tmp)
        .then(
          res => {
            if (res.data && res && res.data.result) {
              this.data1.splice(index, 1)
              this.dataCount--
              this.totalPage = Math.ceil(this.dataCount / this.pageSize)
            }
            if (res.data && res && res.data.resultMessage === '请先删除部门下的岗位信息') {
              this.$Message.warning({
                content: '请先删除该部门下的岗位信息!',
                duration: 5
              })
            }
            if (res.data && res.data.resultCode !== '000000') {
              this.$Message.warn({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    remove1 (index) {
      this.infoId = this.data2[index].id
      let tmp = {
        id: this.infoId
      }
      this.$http
        .post(services.deletePosts.deletePosts, tmp)
        .then(
          res => {
            if (res.data && res && res.data.result) {
              this.data2.splice(index, 1)
              this.dataCount--
              this.totalPage = Math.ceil(this.dataCount / this.pageSize)
            }
            if (res.data && res && res.data.resultMessage === '该岗位正在被使用，请检查后再删除') {
              this.$Message.warning({
                content: '该岗位正在被使用，请检查后再删除!',
                duration: 5
              })
            }
            if (res.data && res.data.resultCode !== '000000') {
              this.$Message.warn({ message: '服务器调用出错！' })
            }
          },
          res => {
            // error callback
          }
        )
    },
    edit (index) {
      this.infoId = this.data1[index].id
      this.ifEdit = true
    },
    show (index) {
      this.infoId = this.data2[index].id
      console.dir(this.infoId)
      this.ifEditPos = true
    },
    editPos (value) {
      this.ifEditPos = false
      this.initPosData()
    },
    editBack (value) {
      if (value) {
        this.ifEdit = false
        this.initData()
      }
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
    toPost (value) {
      if (value === '1') {
        // 访问后台岗位信息，展示到页面
        this.ifShow = true
        this.ifExist = false
        this.initData()
      }
      if (value === '2') {
        // 访问后台部门信息
        this.ifShow = false
        this.ifExist = true
        this.initPosData()
      }
    }
  }
}
</script>

<style scoped lang="less">
.divideReport {
  height: 100%;
  background-color: #fff;
  .search {
    height: 10%;
    padding-left: 10px;
    text-align: left;
    button,
    html [type="button"],
    [type="reset"],
    [type="submit"] {
      -webkit-appearance: button;
      margin-right: 10px;
    }
  }
  .main {
    height: 85%;
    margin-top: 15px;
    .pageCss {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .btnStyle {
      margin-left: 546px;
      width: 90px;
      margin-bottom: 5px;
    }
  }
}
</style>
