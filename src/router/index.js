import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/x6-vue',
    name: 'x6-vue',
    component: () => import(/* webpackChunkName: "x6-vue" */ '../views/x6-vue.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
