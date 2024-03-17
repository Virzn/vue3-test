import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/Callout',
    name: 'Callout',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "test" */ '../views/Callout.vue')
  },

  {
    path: '/Connection',
    name: 'Connection',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "Contest2" */ '../views/Connection/Connection.vue')
  },
  {
    path: '/PrintingPdf',
    name: 'PrintingPdf',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "dayin2" */ '../views/Printing/PrintingPdf.vue')
  },
  {
    path: '/uploadTest',
    name: 'uploadTest',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/uploadTest.vue')
  },
  {
    path: '/drawTable',
    name: 'drawTable',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/drawTable.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/chat.vue')
  },
  {
    path: '/float',
    name: 'float',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/float.vue')
  },
  {
    path: '/center',
    name: 'center',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/center.vue')
  },
  {
    path: '/shengbei',
    name: 'shengbei',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/shengbei.vue')
  },
  {
    path: '/shuangfeiyi',
    name: 'shuangfeiyi',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/shuangfeiyi.vue')
  },
  {
    path: '/twoC',
    name: 'twoC',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/twoC.vue')
  },
  {
    path: '/threeC',
    name: 'threeC',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/CSS/threeC.vue')
  },
  {
    path: '/iframeText',
    name: 'iframeText',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/iframeText.vue')
  },
  {
    path: '/iframeText1',
    name: 'iframeText1',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "uploadTest" */ '../views/iframeText1.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
