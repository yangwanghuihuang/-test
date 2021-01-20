import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    redirect: '/pages/userGuide'
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/view/login/login.vue')
  },

  {
    path: '/pages',
    name: 'pages',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'userGuide',
        name: 'userGuide',
        meta: {
          title: '员工信息'
        },
        component: () => import('@/view/single-page/userGuide/userGuide.vue')
      },
      {
        path: 'salaryManage',
        name: 'salaryManage',
        meta: {
          title: '工资账套'
        },
        component: () => import('@/view/single-page/acountDeal/salaryManage.vue')
      },
      {
        path: 'announcement',
        name: 'announcement',
        meta: {
          title: '公告管理'
        },
        component: () => import('@/view/single-page/announcement/announcement.vue')
      },

      {
        path: 'employSalary',
        name: 'employSalary',
        meta: {
          title: '员工工资'
        },
        component: () => import('@/view/single-page/acountDeal/employSalary.vue')
      },

      {
        path: 'settleReport',
        name: 'settleReport',
        meta: {
          title: '结算报表'
        },
        component: () => import('@/view/single-page/settleReport/settleReport.vue')
      },

      {
        path: 'userInfo',
        name: 'userInfo',
        meta: {
          title: '我的信息'
        },
        component: () => import('@/view/single-page/userInfo/userInfo.vue')
      },
      {
        path: 'salary',
        name: 'salary',
        meta: {
          title: '员工工资'
        },
        component: () => import('@/view/single-page/userInfo/salary.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        meta: {
          title: '资料下载'
        },
        component: () => import('@/view/single-page/userInfo/resource.vue')
      },
      {
        path: 'policy',
        name: 'policy',
        meta: {
          title: '上传文件'
        },
        component: () => import('@/view/single-page/userInfo/policy.vue')
      },
      {
        path: 'userPolicy',
        name: 'userPolicy',
        meta: {
          title: '政策查询'
        },
        component: () => import('@/view/single-page/userInfo/userPolicy.vue')
      },
      {
        path: 'loginTest',
        name: 'loginTest',
        meta: {
          title: '政策查询'
        },
        component: () => import('@/view/login/loginTest.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
