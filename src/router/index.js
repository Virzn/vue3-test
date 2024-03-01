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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
