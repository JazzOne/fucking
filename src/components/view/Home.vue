<template>
  <div class="home" padding>
    <y-header>
      <img src="@/assets/icon/user.png" slot="left" width="25" height="25">
      <y-tabs class="switch" :tabs="headerTabs" slot="area" @change="changeMain"></y-tabs>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <y-tabs class="childSwitch" dark :tabs="childTabs"></y-tabs>
    
    <y-chart card></y-chart>
    
    <dashboard></dashboard>


    <div class="navbar" card>
      <div class="nav">
        <img class="icon" :src='require("@/assets/icon/gis-icon.png")' alt="">
        <p>GIS</p>
      </div>
      <div class="nav">
        <img class="icon" :src='require("@/assets/icon/gis-icon.png")' alt="">
        <p>水质站</p>
      </div>
      <div class="nav">
        <img class="icon" :src='require("@/assets/icon/gis-icon.png")' alt="">
        <p>空气站</p>
      </div>
      <div class="nav">
        <img class="icon" :src='require("@/assets/icon/gis-icon.png")' alt="">
        <p>污染企业</p>
      </div>
    </div>


  </div>
</template>

<script>
import yTabs from '@/components/global/y-tabs';
import yChart from '@/components/complex/y-chart-container';
import dashboard from '@/components/simple/dashboard';

export default {
  name: 'home',
  components: {
    yTabs,
    yChart,
    dashboard
  },
  data () {
    return {
      headerTabs: [{name: '空气监测'}, {name: '水质监测'}],
      headerIndex: 0,
    }
  },
  computed: {
    childTabs() {
      if(this.headerIndex == 0) {
        return [{name: 'AQI'}, {name: '空气质量'}, {name: '优良天数'}, {name: 'PM2.5'}]
      }else if (this.headerIndex == 1) {
        return [{name: '超标断面'}, {name: 'CQWI排名'}, {name: '地表水达标率'}, {name: '饮用水达标率'}]
      }
    }
  },

  methods: {
    changeMain(index) {
      this.headerIndex = index;
    }
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
    /* overflow: hidden; */
    /* font-size: 0; */
    display: flex;
    align-items: center;
  }
  .navbar .nav {
    /* display: inline-block; */
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
