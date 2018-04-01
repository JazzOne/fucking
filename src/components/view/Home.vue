<template>
  <div class="home" padding>
    <y-header>
      <img src="@/assets/icon/user.png" slot="left" width="25" height="25">
      <y-tabs class="switch" :tabs="headerTabs" slot="area" @change="changeMain"></y-tabs>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>
    
    <y-tabs class="childSwitch" dark :tabs="childTabs" @change="changeChild"></y-tabs>
    
    <y-chart :currentChart="childTabs[childIndex].type" card></y-chart>
    
    <dashboard :datas="dashboards" :isAir="false"></dashboard>

    <!-- 底部菜单 -->
    <div class="navbar" card>
      <div class="nav">
        <router-link :to="{path: '/gis', query: { name: 'gis' } }">
        <img class="icon" :src='require("@/assets/icon/gis-icon.png")' alt="">
        <p>GIS</p>
        </router-link>
      </div>
      <div class="nav">
        <router-link :to="{path: '/list/water', query: { name: '2' } }">
          <img class="icon" :src='require("@/assets/icon/water-icon.png")' alt="">
          <p>水质站</p>
        </router-link>
      </div>
      <div class="nav">
        <router-link :to="{path: '/list/air', query: { name: '空气站' } }">
          <img class="icon" :src='require("@/assets/icon/air-icon.png")' alt="">
          <p>空气站</p>
        </router-link>
      </div>
      <div class="nav">
        <router-link :to="{path: '/list/company', query: { name: '1' } }">
          <img class="icon" :src='require("@/assets/icon/company-icon.png")' alt="">
          <p>污染企业</p>
        </router-link>
      </div>
    </div>

    
  </div>
</template>

<script>
import yTabs from '@/components/global/y-tabs';
import yChart from '@/components/complex/charts/y-chart-container';
import dashboard from '@/components/simple/dashboard';

import yPopup from '@/components/global/y-popup';

import { getPmAvg } from '../../axios/service'

export default {
  name: 'home',
  components: {
    yTabs,
    yChart,
    dashboard,
    yPopup
  },
  data () {
    return {
      // 空气检测 || 水质检测
      headerTabs: [{name: '空气监测'}, {name: '水质监测'}],
      headerIndex: 0,
      // AQI || 空气质量 || 优良天数 || PM2.5  ...
      childIndex: 0,

      // 首页主面板数据
      dashboards: { }

    }
  },
  computed: {
    // AQI || 空气质量 || 优良天数 || PM2.5  ...
    childTabs() {
      if(this.headerIndex == 0) {
        return [{name: 'AQI', type: 'aqi'}, {name: '空气质量', type: 'air'}, {name: '优良天数', type: 'day'}, {name: 'PM2.5', type: 'pm'}]
      }else if (this.headerIndex == 1) {
        return [{name: '超标断面', type: 'dm'}, {name: 'CQWI排名', type: 'cqwi'}, {name: '地表水达标率', type: 'driver'}, {name: '饮用水达标率', type:'drink'}]
      }
    }
  },

  methods: {
    changeMain(index) {
      this.childIndex = 0;
      this.headerIndex = index;
      console.log(index)
      // console.group('切换大菜单')
      // console.log(`加载${this.headerTabs[index].name}页`)
      // console.log(`默认渲染子选项卡的第一个：`, this.childTabs[this.childIndex])   
      // console.groupEnd() 
    },
    changeChild(index) {
      this.childIndex = index;
      // console.group('切换小菜单')
      // console.log(`已切换, 渲染${this.childTabs[index].name}图表`, this.childTabs[index])
      // console.groupEnd()
    },

    getDashboard() {
      
      this.$service.getDashBoard().then((res) => {
        let obj = {};

        console.log(res)
        obj = {
          rank: res.rank,
          day: res.day,
          avg: res.avg[0]
        };

        this.$service.getAQI().then(res => {
          obj.areaPm = res[0].areaPm;

          this.dashboards = obj

          console.log('Home', this.dashboards)
        })
        


        
      })      
      
    }
  },
  created() {
    this.getDashboard()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    height: 100%;
  }
  .switch {
    width: 400px;
  }
  .childSwitch {
    margin: 20px 0;
  }
  
  /* 底部菜单 */
  .navbar {
    width: 710px;
    height: 200px;
    display: flex;
    align-items: center;
  }
  .navbar .nav {
    text-align: center;
    width: 25%;
    font-size: 24px;
    color: #fff;
  }
  .navbar .nav .icon {
    width: 90px;
    height: 100px;
  }
  


</style>
