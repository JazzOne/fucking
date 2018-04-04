<template>
  <div class="home" padding>
    <y-header>
      <img src="@/assets/icon/user.png" slot="left" width="25" height="25">
      <y-tabs class="switch" :tabs="headerTabs" slot="area" @change="changeMain"></y-tabs>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <y-tabs class="childSwitch" dark :tabs="childTabs" @change="changeChild"></y-tabs>

    <y-chart :currentChart="childTabs[childIndex].type" card></y-chart>


    <dashboard :datas="dashboards" :isAir="headerIndex"></dashboard>

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
        <router-link :to="{path: '/list/air', query: { name: '3' } }">
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
import { getPmAvg } from '../../axios/service';


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

      headerTabs: [{name: '空气监测'}, {name: '水质监测'}],
      headerIndex: 0,
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
  watch: {
    headerIndex(val, oldVal) {
      
      if(val == 0) {
        this.$service.getDashBoard().then((res) => {
          let obj = {}
          obj = {
            rank: res.rank,
            // day: res.day,
            avg: res.avg[0]
          };

          this.$service.getAQI().then(res => {
            obj.areaPm = res[0].areaPm;

            this.dashboards = obj
            console.log(this.dashboards)
          });
        });

      }else { 

        setTimeout(() => {
          
        
        // 排名
        this.$http.post('http://172.21.92.143:8080/waterinfo/getcqwipm', {
          "years":"2018",
          "month":"3",
          "areaId":"3"
        }).then(res => {
          this.dashboards.rank = res.data.data.pm;
        });

        // 超标指数
        this.$http.post('http://172.21.92.143:8080/waterinfo/getchaobiaoyz', {
          "mn":"98333426611001"
        }).then(res => {
          this.dashboards.zhishu = res.data.data
          // console.log(res.data.data)
        })
        
        // 
        this.$http.post('http://172.21.92.143:8080/waterinfo/getwaterrate', [{
          years: "2018",
          month: "3",
          areaId: "1",
          type: "1"  // 地表水（1） 饮用水（2）
        }]).then(res => {
            this.dashboards.dbs = res.data.data[0].dbsRate;

        })

        // 
        this.$http.post('http://172.21.92.143:8080/waterinfo/getwaterrate', [{
          years: "2018",
          month: "3",
          areaId: "1",
          type: "2"  // 地表水（1） 饮用水（2）
        }]).then(res => {
          this.dashboards.yys = res.data.data[0].dbsRate;
        })

        }, 50);
      };
      
    }
  },
  methods: {
    // 切换空气检测/水质监测
    changeMain(index) {
      this.childIndex = 0;
      this.headerIndex = index;
    },
    changeChild(index) {
      this.childIndex = index;
    },

    // 首页主面板内容
    getDashboard() {
        this.$service.getDashBoard().then((res) => {
          let obj = {}
          obj = {
            rank: res.rank,
            day: res.day,
            avg: res.avg[0]
          };

          this.$service.getAQI().then(res => {
            obj.areaPm = res[0].areaPm;

            this.dashboards = obj
          });
        });
    }
  },
  created() {
    // 默认加载空气检测
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
