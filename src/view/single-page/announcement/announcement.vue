<template>
  <div class="announcement">
    <div class="search">
      <Row>
        <Col span="3">
          <Button type="primary" @click="insertNotice()">添加公告</Button>
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

      <Table
        :height="tableHeight"
        style="width:100%"
        border
        ref="selection"
        :columns="columns4"
        :data="data1"
      ></Table>
    </div>
    <announcementMOdal v-if="ifShow" :info="info" @close="close"></announcementMOdal>
  </div>
</template>

<script>
import announcementMOdal from './announcementModal'
import services from '../../../api/services'
export default {
  name: 'announcement',
  data () {
    return {
      pageIndex: 1,
      totalPage: 0,
      infoId: 0,
      tableHeight: 0,
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 10,
      ifShow: false,
      info: {},
      columns4: [
        {
          title: '编号',
          key: 'announcementid',
          align: 'center'
        },
        {
          title: '创建者',
          key: 'announcementcreator',
          align: 'center'
        },
        {
          title: '公告标题',
          key: 'announcementtitle',
          align: 'center'
        },
        {
          title: '公告内容',
          key: 'announcementcontent',
          align: 'center',
          render: (h, params) => {
            let texts = params.row.announcementcontent
            if (params.row.announcementcontent != null) {
              if (params.row.announcementcontent.length > 5) {
                texts = params.row.announcementcontent.slice(0, 5) + '...' // 进行数字截取
              } else {
                texts = params.row.announcementcontent
              }
            }
            return h('div', [
              h(
                'Tooltip',
                {
                  props: {
                    placement: 'top',
                    transfer: true
                  }
                },
                [
                  texts,
                  h(
                    'span',
                    {
                      slot: 'content',
                      style: {
                        whiteSpace: 'normal'
                      }
                    },
                    params.row.announcementcontent
                  )
                ]
              )
            ])
          }
        },
        {
          title: '创建时间',
          key: 'announcementtimeDesc'
        },
        {
          title: 'Action',
          key: 'action',
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
  components: {
    announcementMOdal
  },
  watch: {},
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http
        .post(services.allAnnouncement.allAnnouncement)
        .then(
          res => {
            if (res.data && res) {
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
      this.info = this.data1[index]
      console.dir(this.info)
      this.ifShow = true
    },
    insertNotice () {
      // 添加公告
      this.ifShow = true
      this.info = {} // 子组件清空index信息
    },
    remove (index) {
      console.dir(this.data1[index].announcementid)
      let tmp = {
        announcementid: this.data1[index].announcementid
      }
      this.$http
        .post(services.deleteAnnoncementById.deleteAnnoncementById, tmp)
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
    // 新增/关闭弹窗开关控制事件
    close () {
      this.ifShow = false
      this.initData()
    }
  }
}
</script>

<style scoped lang="less">
.announcement {
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
