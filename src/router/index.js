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
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/user/list/list'),
        name: 'Dashboard',
        meta: { title: '用户列表', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: 'tasklist',
    component: Layout,
    redirect: '/task/list',
    name: 'task',
    meta: { title: '任务', icon: 'list', affix: true },
    alwaysShow: true,
    children: [
      {
        path: '/task/list',
        component: () => import('@/views/task/list/list'),
        name: 'Tasklist',
        meta: { title: '任务列表', icon: 'list', affix: true }
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
    path: 'cashlist',
    component: Layout,
    redirect: '/cash/list',
    name: 'cash',
    meta: { title: '提现列表', icon: 'table', affix: true },
    alwaysShow: true,
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
    alwaysShow: true,
    children: [
      {
        path: '/recharge/list',
        component: () => import('@/views/cash/recharge/list'),
        name: 'Tasklist',
        meta: { title: '充值列表', icon: 'list', affix: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/banner/index',
    name: 'setting',
    alwaysShow: true,
    meta: { title: '设置', icon: 'table', affix: true },
    children: [
      {
        path: '/banner/index',
        component: () => import('@/views/setting/banner/index'),
        name: 'banner',
        meta: { title: '轮播设置', icon: 'dashboard', noCache: true }
      },
      {
        path: '/activity-report/index',
        component: () => import('@/views/setting/activity-report/index'),
        name: 'report',
        meta: { title: '活动先报', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人设置', icon: 'user', noCache: true }
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
  mode: 'history', // require service support
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
