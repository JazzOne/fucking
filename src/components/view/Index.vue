<template>
  <div class="home" padding>
    
    <y-header>
        <img src="@/assets/icon/user.png" slot="left" width="25" height="25">
        <y-tabs class="menus" :tabs="menus" slot="area" @change="changeMenu"></y-tabs>
        <img src="@/assets/logo.png" slot="right" style="width: 10.6667vw">
    </y-header>

    <y-tabs class="navMenus" dark :tabs="navMenus" @change="changeNavMenu"></y-tabs>
    <!-- 8张图表 -->
    <div v-if="lineData && navMenus[navMenuIndex].type == 'aqi'">
        <echart-line :time="genarateArray(lineData.length)" :datalist="lineData"></echart-line>
    </div>
    <div v-else-if="navMenus[navMenuIndex].type == 'air'">
        <echart-bar :xData="xData" :data="barData"></echart-bar>
    </div>
    <div v-else-if="navMenus[navMenuIndex].type == 'day'">
        <circles :rest="dash.restDays" :target="dash.targetdays" :good="dash.gooddays"></circles>
    </div>
    <div v-else-if="navMenus[navMenuIndex].type == 'pm'">
        <echart-stacked-line :source="pmChartData"></echart-stacked-line>
    </div>
    <div v-else-if="navMenus[navMenuIndex].type == 'dm'">
        <amap></amap>
    </div>

    <div v-else-if="navMenus[navMenuIndex].type == 'cqwi'">
        <!-- <amap></amap> -->
        <cqwi></cqwi>
    </div>
    <div v-else-if="navMenus[navMenuIndex].type == 'driver'">
        
        <echart-line 
            :time="dbstime" 
            :datalist="dbsData"
            v-if="dbs">
            <div slot="right">年度：2018</div>
        </echart-line>
    </div>

    <div v-else-if="navMenus[navMenuIndex].type == 'drink'">
        
        <echart-line 
            
            :time="yystime" 
            :datalist="yysData"
            v-if="yys">
            <div slot="right">年度：2018</div>
        </echart-line>
    </div>
    <!-- /waterinfo/getcqwiInfolist -->

    <dashboard :datas="dash" :type="menuIndex"></dashboard>

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
import yTabs from '@/components/global/y-tabs'
import dashboard from '@/components/simple/dashboard'
import { getAQIRank, getGoodDay, getPmAvg, getCqwiRank, getPoint, getRate } from '@/axios/service'

// 图表组件
import echartLine from "@/components/complex/charts/echart-line";
import echartBar from "@/components/complex/charts/echart-bar";
import circles from "@/components/complex/charts/chart-circle";
import echartStackedLine from '@/components/complex/charts/echart-stacked-line';
// 地图
import amap from '@/components/complex/charts/amap';

import cqwi from '@/components/complex/charts/chart-dot';

export default {
    name: 'home',
    components: {
        yTabs,
        dashboard,
        echartLine,
        echartBar,
        circles,
        echartStackedLine,
        amap,
        cqwi
    },
    data() {
        return {
            menus: [{name: '空气监测'}, {name: '水质监测'}],
            menuIndex: 0,   
            navMenuIndex: 0,        
            
            // 图表
            lineData: null, 
            // 空气质量
            barData: {
                bads: [],
                mids: [],
                goods: []
            },
            xData: [],
            // PM2.5
            pmChartData: [],
            // 主页面板
            dash: {},

            // 地表水
            dbsData: null,
            dbstime: [],
            dbs: false,
            // 饮用水
            yystime: null,
            yysData: [],
            yys: false
        }
    },
    computed: {
        navMenus() {
            if(this.menuIndex == 0) {
                return [
                    {name: 'AQI', type: 'aqi'}, 
                    {name: '空气质量', type: 'air'}, 
                    {name: '优良天数', type: 'day'}, 
                    {name: 'PM2.5', type: 'pm'}
                ]
            }else {
                return [
                    {name: '超标断面', type: 'dm'}, 
                    {name: 'CWQI排名', type: 'cqwi'}, 
                    {name: '地表水达标率', type: 'driver'}, 
                    {name: '饮用水达标率', type:'drink'}
                ]
            }
        }
    },
    methods: {
        genarateArray(size = 10) {
            let result = [];
            for(let i = 0; i < size; i++) {
                result.push(i+1);
            }

            return result
        },

        // 切换顶部菜单
        changeMenu(index) {
            this.menuIndex = index;
            this.changeNavMenu(0); 

            if(this.menuIndex == 0) {
                this.getAirMain()
            }else {
                this.getWater()
            }
        },
        // 切换顶部子菜单
        // 子菜单的变化会引起图表渲染变化  
        changeNavMenu(index) {
            this.navMenuIndex = index;
            // console.log(this.navMenus[this.navMenuIndex].type + '图表')
            let type = this.navMenus[this.navMenuIndex].type;
            switch(type) {
                case 'aqi':
                    this.$service.getAQI("7").then(res => {
                        let arr = res.filter(value => {
                            return Object.prototype.toString.call(value) !== '[object Null]'
                        }).map(value => {
                            return value.areaPm;
                        })
                        this.lineData = arr
                        // console.log(this.lineData)
                    });
                break;
                case 'air':
                    this.getAirChart()
                break;
                case 'day':
                break;
                case 'pm':
                    this.getPM();
                break;
                case 'dm':
                    // console.log('断面 ')
                break;
                case 'cqwi':
                    // this.getCwqi()
                break;
                case 'driver':
                    getRate().then(res => {
                        let time = [], datas = [];
                        let data = res.data.data;
                        
                        data.forEach(element => {
                            time.push(element.month)
                            datas.push(element.dbsRate)
                        });
                        this.dbstime = time;
                        this.dbsData = datas;
                        this.dbs = true;
                        this.yys = false;
                        
                    })
                break;
                case 'drink':
                    getRate().then(res => {
                        let time = [], datas = [];
                        let data = res.data.data;
                        
                        data.forEach(element => {
                            time.push(element.month)
                            datas.push(element.yysRate)
                        });
                        this.yystime = time;
                        this.yysData = datas;
                        this.yys = true;
                        this.dbs = false;
                        
                    })
                break;
            }

        },

        // 空气监测
        getAirMain() {
            let ajaxs = [this.$service.getAQI(), getAQIRank(), getGoodDay(), getPmAvg() ];
            this.$http.all(ajaxs)
                .then(this.$http.spread( (pm, rank, days, avg) => {
                    // console.log(pm[0].areaPm, rank.data, days.data, avg.data[0])
                    console.log(rank.data)
                    this.dash = {
                        rank: rank.data,
                        pm: pm[0].areaPm,
                        restDays : days.data.restDays,
                        gooddays: days.data.gooddays,
                        targetdays: days.data.targetdays,
                        areaPm: avg.data[0].areaPm,
                        targetPm: avg.data[0].target
                    };

                }));
        },

        // 水质监测 
        getWater() {
            let ajaxs = [getCqwiRank(), getPoint(), getRate()];
            this.$http.all(ajaxs)
            .then(this.$http.spread( (cqwi, point, drate) => {
                
                const isNull = Object.prototype.toString.call(point.data.data) == '[object Null]' ? true : false;
                this.dash = {
                    rank: cqwi.data.pm,
                    zsName: isNull ? '' : point.data.data.name,
                    realValue: isNull ? '' : point.data.data.realValue,
                    standerValue: isNull ? '' : point.data.data.standerValue,
                    dbsRate: drate.data.data[0].dbsRate,
                    yysRate: drate.data.data[0].yysRate
                };

            }));
        },
        
        // 获取空气质量aqi
        getAirChart() {
            // 获取所有区县
            this.$service.getAreaId().then(res => {
                var arr = [];
                var obj = {
                    areaId: '',
                    years: '2018',
                    month: '03'
                }
                res.data.map(value => {
                    obj.areaId = value.areaId;
                    arr.push(obj)
                });

                // 获取空气质量图数据
                // console.log(arr)
                this.$http.post('http://172.21.92.62:8080/airinfo/getqualitydays', arr)
                    .then(res => {
                        
                        let bads, goods, mids;
                        let xData = [];
                        bads = goods =  mids = [];
                        res.data.data.map(value => {
                            xData.push(value.areaName)
                            bads.push(value.baddas)
                            goods.push(value.gooddays)
                            mids.push(value.middays)
                        })
                        this.xData = xData;


                        var obj = {
                            bads,
                            goods, 
                            mids
                        }
                        this.barData = obj;
                    });


            })
        },

        // 获取PM2.5均值
        getPM() {
            getPmAvg().then(res => {
                this.pmChartData = res.data;
                // console.log('pmdata', this.pmChartData)
            })
        },
        

    },
    created() {
        
    }
} 
</script>

<style scoped>
    .menus {
        width: 400px;
    }
    .navMenus {
        margin: 10px 0;
    }

    /* 底部菜单 */
    /* 底部菜单 */
    .navbar {
        width: 710px;
        height: 180px;
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
