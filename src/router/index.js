import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    name: 'admin',
    children: [
      {
        path: '/user',
        component: () => import('@/views/user/list/list'),
        name: 'user',
        meta: { title: '用户列表', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: 'tasklist',
    component: Layout,
    redirect: '/task/list',
    alwaysShow: false,
    children: [
      {
        path: '/task/list',
        component: () => import('@/views/task/list/list'),
        name: 'Tasklist',
        meta: { title: '任务列表（总览）', icon: 'list', affix: true }
      },
      {
        path: '/task/detail',
        component: () => import('@/views/task/detail/detail'),
        name: 'Taskdetail',
        hidden: true,
        meta: { title: '任务详情', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: 'taskverify',
    component: Layout,
    redirect: '/taskverify',
    alwaysShow: false,
    children: [
      {
        path: '/taskverify',
        component: () => import('@/views/task/list/list-verify'),
        name: 'taskverify',
        meta: { title: '待审核任务', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'taskfailed',
    component: Layout,
    redirect: '/taskfailed',
    alwaysShow: false,
    children: [
      {
        path: '/taskfailed',
        component: () => import('@/views/task/list/list-failed'),
        name: 'taskfailed',
        meta: { title: '未通过任务', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'taskrelease',
    component: Layout,
    redirect: '/taskrelease',
    alwaysShow: false,
    children: [
      {
        path: '/taskrelease',
        component: () => import('@/views/task/list/list-release'),
        name: 'taskrelease',
        meta: { title: '进行中任务', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'taskcomplete',
    component: Layout,
    redirect: '/taskcomplete',
    alwaysShow: false,
    children: [
      {
        path: '/taskcomplete',
        component: () => import('@/views/task/list/list-complete'),
        name: 'taskcomplete',
        meta: { title: '已完成任务', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'taskreverify',
    component: Layout,
    redirect: '/taskreverify',
    alwaysShow: false,
    children: [
      {
        path: '/taskreverify',
        component: () => import('@/views/task/list/list-reverify'),
        name: 'taskreverify',
        meta: { title: '下单用户待审核任务', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'newtask',
    component: Layout,
    redirect: '/task/new',
    name: 'task',
    meta: { title: '任务', icon: 'list', affix: true },
    alwaysShow: false,
    children: [
      {
        path: '/task/new',
        component: () => import('@/views/task/list/new'),
        name: 'NewTask',
        meta: { title: '新增任务', icon: 'form', affix: true }
      },
    ]
  },
  {
    path: 'cashlist',
    component: Layout,
    redirect: '/cash/list',
    name: 'cash',
    meta: { title: '提现列表', icon: 'table', affix: true },
    alwaysShow: false,
    children: [
      {
        path: '/cash/list',
        component: () => import('@/views/cash/list/list'),
        name: 'Tasklist',
        meta: { title: '提现列表', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'rechargelist',
    component: Layout,
    redirect: '/recharge/list',
    name: 'recharge',
    meta: { title: '充值列表', icon: 'table', affix: true },
    alwaysShow: false,
    children: [
      {
        path: '/recharge/list',
        component: () => import('@/views/cash/recharge/list'),
        name: 'Rechargelist',
        meta: { title: '充值列表', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    name: 'setting',
    alwaysShow: false,
    children: [
      {
        path: '/banner/index',
        component: () => import('@/views/setting/banner/list'),
        name: 'banner',
        meta: { title: '轮播设置', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/activity-report',
    component: Layout,
    redirect: '/activity-report/index',
    name: 'activity-report',
    alwaysShow: false,
    children: [
      {
        path: '/activity-report/index',
        component: () => import('@/views/setting/activity-report/list'),
        name: 'report',
        meta: { title: '活动线报', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    hidden: true,
    meta: { title: '修改密码'},
    children: [
      {
        path: '/profile/index',
        component: () => import('@/views/user/profile/chgpwd'),
        name: 'changepwd',
        meta: { title: '修改密码', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  
  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
