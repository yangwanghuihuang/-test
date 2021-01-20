import Mock from 'mockjs'
// 将mock数据文件引入
import data1 from './mock.js'
import expendData from './expend.js'
import settleData from './settleCycle'
import cycleData from './cycle'
import salary from './salary'

Mock.mock('/monitor/moniData', 'post', data1.moniData)
Mock.mock('/monitor/moniExpendData', 'post', expendData.expendData)
Mock.mock('/monitor/settleData', 'post', settleData.settleData)
Mock.mock('/monitor/cycleData', 'post', cycleData.cycle)
Mock.mock('/monitor/monitorSalary', 'post', salary.salaryData)
