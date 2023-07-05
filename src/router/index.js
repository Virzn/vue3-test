import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
  {
    path: '/test1',
    name: 'test1',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "test1" */ '../views/test1.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "test3" */ '../views/test3.vue')
  },
  {
    path: '/test4',
    name: 'test4',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "test4" */ '../views/test4.vue')
  },
  {
    path: '/Con/test1',
    name: 'Contest1',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "Contest1" */ '../views/Connection/conTest1.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
