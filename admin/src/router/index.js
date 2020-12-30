/*
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-22 16:06:57
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-29 16:13:11
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/Welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users }
      ]
    }
  ]
})

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();

  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  return next();
})

export default router;