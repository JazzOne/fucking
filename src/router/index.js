import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'

import List from '@/components/view/List' 
import Detail from "@/components/view/detail"
import DetailInfo from '@/components/view/detail-info'
import DetailReal from '@/components/view/detail-realtime'
import DetailTable from '@/components/view/detail-table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list/:type',
      component: List,
    },
    {
      path: '/list/:type/detail/:detail_id',
      component: Detail
    },
    // 基本信息
    {
      path: '/infomation',
      component: DetailInfo,
    },
    // 实时数据
    {
      path: '/realtime',
      component: DetailReal
    },
    // 统计报表
    {
      path: '/table',
      component: DetailTable
    }
    
  ]
})
