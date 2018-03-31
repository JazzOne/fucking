// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入全局自定义组件并注册
import yHeader from '@/components/global/y-header'
Vue.component('yHeader', yHeader)

// 引入第三方库
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


// 引入ajax库
// import axios from 'axios'
// Vue.prototype.$http = axios

import fetch from '@/axios/service'
Vue.prototype.$service = fetch;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
