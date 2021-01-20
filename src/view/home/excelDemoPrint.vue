<template>
  <div id="query-table">
    <div style="text-align: center; margin-top: 10px">
      <Button type="primary" @click="start_print()">打印</Button>
      <Button style="margin-left: 10px" @click="back_print()">返回</Button>
    </div>
    <div id="queryTable" style="overflow: scroll;height: 100%;">
      <div id="print" ref="print">
        <div class="main-title">
          <h1>(北京)中国移动集团客户短信省际结算单</h1>
          <div class="main-title-label">
            <label>结算单代码：D200</label>
            <label>结算月：201907</label>
            <label>税率：6%</label>
            <label>单位：人民币（元）</label>
          </div>
        </div>
        <div class="main-table">
          <Table :columns="columns11" :data="data10" border ref="table" size="small"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { HotTable } from '@handsontable/vue'
// import 'handsontable/dist/handsontable.full.css'
import htmlToPdf from '../../libs/htmlToPdf'
export default {
  components: {
    // HotTable
  },
  data () {
    return {
      columns11: [
        {
          title: '序号',
          key: 'A',
          align: 'center'
          // className: 'demo-table-info-column'
        },
        {
          title: '省公司',
          key: 'B',
          align: 'center'
        },
        {
          title: '往来投',
          key: 'C',
          align: 'center'
        },
        {
          title: '应结出',
          align: 'center',
          children: [
            {
              title: '不含税金额(A1)',
              key: 'D',
              align: 'center'
            },
            {
              title: '税额(A2)',
              key: 'E',
              align: 'center'
            },
            {
              title: '含税金额(A3)',
              key: 'F',
              align: 'center'
            }
          ]
        },
        {
          title: '应结入',
          align: 'center',
          children: [
            {
              title: '不含税金额(B1)',
              key: 'G',
              align: 'center'
            },
            {
              title: '税额(B2)',
              key: 'H',
              align: 'center'
            },
            {
              title: '含税金额(B3)',
              key: 'I',
              align: 'center'
            }
          ]
        },
        {
          title: '结算额',
          align: 'center',
          children: [
            {
              title: '含税金额(C-B3-A3)',
              key: 'J',
              align: 'center'
            }
          ]
        }
      ],
      data10: []
    }
  },
  mounted () {
    const data = []
    for (let i = 0; i < 20; i++) {
      data.push({
        A: i + 1,
        B: '北京',
        C: '2110',
        D: 0,
        E: 0,
        F: 0,
        G: 0,
        H: 0,
        I: 0,
        J: 0
      })
    }
    this.data10 = data
    this.tableHeight = (document.documentElement.clientHeight * (7 / 10))
    console.dir(this.$route.params.type)
    if (this.$route.params.type && this.$route.params.type === 'PDF') {
      setTimeout(() => {
        this.handleDown()
      }, 100)
    }
  },
  methods: {
    handleDown () {
      htmlToPdf.downloadPDF(document.querySelector('#print'), '我的PDF')
    },
    start_print () {
      let newDomHtml = this.$refs.print.innerHTML
      window.document.body.innerHTML = newDomHtml
      window.print()
      window.location.reload()
      return false
    },
    export_excel () {
      import('../../libs/Export2Excel').then(excel => {
        const multiHeader = [['序号', '省公司', '往来投', '应结出', '', '', '应结入', '', '', '结算额']]
        const header = ['', '', '', '不含税金额(A1)', '税额(A2)', '含税金额(A3)', '不含税金额(B1)', '税额(B2)', '含税金额(B3)', '含税金额(C-B3-A3)']
        const filterVal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        const list = this.data10
        const data = this.formatJson(filterVal, list)
        const merges = ['A1:A2', 'B1:B2', 'C1:C2', 'D1:F1', 'G1:I1', 'J1:J1']
        const filename = '测试导出'
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
          filename
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        console.dir(j)
        console.dir(v)
        console.dir(v[j])
        return v[j]
      }))
    },
    back_print () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang='less'>
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.demo-table-info-column {
  font-size: 10px;
  background-color: red;
}
html,
body {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
}
#query-table {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
}
#queryTable {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  padding: 10px;
}
.main-title {
  h1 {
    text-align: center;
  }
  .main-title-label {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
.main-table {
  padding: 30px 20px;
}
@media print {
  .main-table {
    padding: 30px 20px;
  }
  html,
  body {
    height: inherit;
    width: inherit;
    word-wrap: break-word;
  }
  #query-table {
    height: inherit;
    width: inherit;
    word-wrap: break-word;
  }
  #queryTable {
    height: inherit !important;
    width: inherit !important;
    word-wrap: break-word;
  }
}
</style>
