/*
 * @Descripttion:
 * @version:
 * @Author: linqiaoxin
 * @Date: 2020-12-22 16:06:57
 * @LastEditors: linqiaoxin
 * @LastEditTime: 2020-12-28 14:01:00
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
/* 把这个包挂在到vue的原型对象上 */
Vue.prototype.$http = axios

Vue.config.productionTip = false

//  添加请求拦截器
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token') || null
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
