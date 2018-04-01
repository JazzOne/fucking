import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/view/Home'

import Gis from '@/components/view/Gis'

import List from '@/components/view/List'
import Detail from "@/components/view/detail"
import DetailInfo from '@/components/view/detail-info'
import DetailReal from '@/components/view/detail-realtime'
import DetailTable from '@/components/view/detail-table'
import DetailWarn from '@/components/view/detail-waring'
import SearchPage from '@/components/global/search-page'

import map from '@/components/view/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gis',
      name: 'gis',
      component: Gis
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
    },
    // 警报
    {
      path: '/warn',
      component: DetailWarn
    },
    // 搜索
    {
      path: '/search',
      component: SearchPage
    },
    // 搜索
    {
      path: '/map',
      component: map
    }

  ]
})
