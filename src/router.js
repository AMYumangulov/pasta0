import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
  {
      path: '/schedule',
      name: 'schedule',
      component: () => import('./views/schedule')
    },
    {
      path: '/students',
      name: 'students',
      component: () => import('./views/students')
    }
  ]
});

export default router