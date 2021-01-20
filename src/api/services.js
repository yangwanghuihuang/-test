// 接口服务
export default {
  mock: {
    data_list: '/monitor/moniData' // 模拟表格数据
  },
  moniExpendData: {
    moniExpendData: '/monitor/moniExpendData'
  },
  settleData: {
    settleData: '/monitor/settleData'
  },
  cycleData: {
    cycleData: '/monitor/cycleData'
  },
  login: {
    checkToken: '/vhrServer/api/admin/v1.0/goLogin'
  },
  // loginAuth: {
  //   loginAuth: '/login_auth'
  // },
  getValidation: {
    getValidation: '/vhrServer/api/admin/v1.0/getValidate' // 获取验证码
  },
  emplyeeInfo: {
    emplyeeInfo: '/vhrServer/api/employee/v1.0/allEmployee0'// 获取员工信息
  },
  emplyeeByworkId: {
    emplyeeByworkId: '/vhrServer/api/employee/v1.0/employeeById'// 通过条件id获取员工信息
  },
  employeeByWorid: {
    employeeByWorid: '/vhrServer/api/employee/v1.0/employeeByWorid'// 通过工号查询员工信息
  },
  deleteById: {
    deleteById: '/vhrServer/api/employee/v1.0/deleteById'// 通过id删除员工信息
  },
  addEmplyee: {
    addEmplyee: '/vhrServer/api/employee/v1.0/add'// 添加员工信息
  },
  salaryInfo: {
    salaryInfo: '/vhrServer/api/salary/v1.0/salaryDept'// 获取薪资账套
  },
  salaryByName: {
    salaryByName: '/vhrServer/api/salary/v1.0/salaryById'// 编辑的时候查询账套
  },
  saveSalary: {
    saveSalary: '/vhrServer/api/salary/v1.0/addSalary'// 新增账套
  },
  updateSalary: {
    updateSalary: '/vhrServer/api/salary/v1.0/updateSalary'// 修改账套
  },
  deleteSalaryById: {
    deleteSalaryById: '/vhrServer/api/salary/v1.0/deleteSalaryById'// 删除账套
  },
  emplyeeByName: {
    emplyeeByName: '/vhrServer/api/employee/v1.0/employee'// 通过条件名称获取员工信息
  },
  updateEmp: {
    updateEmp: '/vhrServer/api/employee/v1.0/update' // 修改员工信息
  },
  param: {
    getDepart: '/vhrServer/api/employee/v1.0/getDepart'// 获取所有部门信息
  },
  getPost: {
    getPost: '/vhrServer/api/employee/v1.0/getPost'// 通过部门id获取职位id
  },
  selsetAllPosts: {
    selsetAllPosts: '/vhrServer/api/post/v1.0/selsetAllPosts'// 获取岗位信息
  },
  empSalary: {
    empSalary: '/vhrServer/api/empsalary/v1.0/salaryDept'// 获取员工工资账套
  },
  empSalaryById: {
    empSalaryById: '/vhrServer/api/empsalary/v1.0/salaryEmpById'// 通过账套信息查询工资账套
  },
  salaryById: {
    salaryById: '/vhrServer/api/empsalary/v1.0/salaryById'// 通过员工id修改员工工资账套
  },
  selectEmp: {
    selectEmp: '/vhrServer/api/empsalary/v1.0/selectEmp'// 通过部门、工龄、转正信息组合条件查询员工信息
  },
  queryDepartById: {
    queryDepartById: '/vhrServer/api/post/v1.0/queryDepartById'// 通过部门id查询部门信息
  },
  updateDeparts: {
    updateDeparts: '/vhrServer/api/post/v1.0/updateDeparts'// 修改部门信息
  },
  deleteDeparts: {
    deleteDeparts: '/vhrServer/api/post/v1.0/deleteDeparts'// 通过部门id删除部门信息
  },
  addDepartments: {
    addDepartments: '/vhrServer/api/post/v1.0/addDepartments'// 添加部门信息
  },
  addPosts: {
    addPosts: '/vhrServer/api/post/v1.0/addPosts'// 添加岗位信息
  },
  queryPostById: {
    queryPostById: '/vhrServer/api/post/v1.0/queryPostById'// 通过岗位id查询岗位信息
  },
  updatePosts: {
    updatePosts: '/vhrServer/api/post/v1.0/updatePosts'// 修改岗位信息
  },
  deletePosts: {
    deletePosts: '/vhrServer/api/post/v1.0/deletePosts'// 删除岗位信息
  },
  empSalaryByMonth: {
    empSalaryByMonth: '/vhrServer/api/empSalaryByMonth/v1.0/empSalaryByMonth'// 按月查询员工工资信息
  },
  upload: {
    upload: '/vhrServer/api/file/uploadFile'
  },
  download: {
    download: '/vhrServer/api/file/downFile'
  },
  selectAllName: {
    selectAllName: '/vhrServer/api/file/selectAllName'

  },
  show: {
    show: '/vhrServer/api/file/show'
  },
  getsalary: {
    getsalary: '/vhrServer/api/empsalary/v1.0/salaryDept'
  },
  addAnnouncement: {
    addAnnouncement: '/vhrServer/api/announcement/v1.0/add'
  },
  allAnnouncement: {
    allAnnouncement: '/vhrServer/api/announcement/v1.0/allAnnouncements'
  },
  updateAnnouncement: {
    updateAnnouncement: '/vhrServer/api/announcement/v1.0/update'
  },
  deleteAnnoncementById: {
    deleteAnnoncementById: '/vhrServer/api/announcement/v1.0/deleteById'
  },
  new: {
    new: '/vhrServer/api/announcement/v1.0/newAnnouncement'
  }
}
