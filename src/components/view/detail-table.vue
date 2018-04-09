<template>
  <div class="detail-table" padding>
    
    <y-header>
        <img src="@/assets/icon/back-icon.png" 
             class="backbtn" 
             width="25" 
             height="25" 
             slot="left" 
             @click="routerBack">
        <span>统计报表</span>
        <img src="@/assets/logo.png" slot="right" style="width: 10.6667vw">
    </y-header>

    <y-tabs 
    dark 
    :tabs="tableType" 
    style="margin: 2vw 0;" 
    @change="changeTable"></y-tabs>

    

    <div class="table" card>
        <div class="title" cell>
            <span>{{tableData.total}}条{{tableType[tableIndex].name}}</span>
            <span>{{vtime}}</span>
        </div>
        <div class="table-body">
            <!-- 水质站 -->
            <table id="mytable" v-if="$route.query.type == 2">
                <thead>
                    <tr>
                        <td>时间</td>
                        <td>COD(mg/L)</td>
                        <td>高锰酸盐指数(mg/L)</td>
                        <td>总磷(mg/L)</td>
                        <td>氨氮(mg/L)</td>
                        <td>生物毒物(%)</td>
                        <td>温度(℃)</td>
                        <td>PH(无量纲)</td>
                        <td>浊度(FTU)</td>
                        <td>电导率(us/cm)</td>
                        <td>溶解氧(mg/L)</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cell, index) in tableData.list" :key="index">
                        <td>{{cell.nodeTime}}</td>
                        <td>{{cell.cod ? cell.cod : '--'}}</td>
                        <td>{{cell.gms ? cell.gms : '--'}}</td>
                        <td>{{cell.zl ? cell.zl : '--'}}</td>
                        <td>{{cell.at ? cell.at : '--'}}</td>
                        <td>{{cell.swdx ? cell.swdx : '--'}}</td>
                        <td>{{cell.wd ? cell.wd : '--'}}</td>
                        <td>{{cell.ph ? cell.ph : '--'}}</td>
                        <td>{{cell.zd ? cell.zd : '--'}}</td>
                        <td>{{cell.ddl ? cell.ddl : '--'}}</td>
                        <td>{{cell.rjy ? cell.rjy : '--'}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 污染企业 -->
            <table id="mytable" v-if="$route.query.type == 1">
                <thead>
                    <tr>
                        <td>时间</td>
                        <td>在线率(%)</td>
                        <td>废水排放量</td>
                        <td>废气排放量</td>
                        <!-- <td>关键设备运行时间</td> -->
                        <!-- <td>关键设备能耗</td> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cell, index) in tableData.list" :key="index">
                        <td>{{cell.nodeTime}}</td>
                        <td>{{cell.onlineRate}}</td>
                        <td>{{cell.waterEmission}}</td>
                        <td>{{cell.gasEmission ? cell.gasEmission : '--'}}</td>
                        <!-- <td>{{cell.equipmentRunTime ? cell.equipmentRunTime : '--'}}</td> -->
                        <!-- <td>8%</td> -->
                    </tr>
                </tbody>
            </table>
            <!-- 空气站 -->
            <table id="mytable" v-if="$route.query.type == 3">
                <thead>
                    <tr>
                        <td>时间</td>
                        <!-- <td>AQI</td> -->
                        <td>PM2.5(ug/m³)</td>
                        <td>PM10(ug/m³)</td>
                        <td>SO2(ug/m³)</td>
                        <td>NO2(ug/m³)</td>
                        <td>O3(ug/m³)</td>
                        <td>CO(ug/m³)</td>
                        <td>TVOC(ppb)</td>
                        <td>温度(℃)</td>
                        <td>湿度(%HR)</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cell, index) in airList" :key="index">
                        <td>{{cell.time}}</td>
                        <td>{{cell.pm25}}</td>
                        <td>{{cell.pm10}}</td>
                        <td>{{cell.so2}}</td>
                        <td>{{cell.no2}}</td>
                        <td>{{cell.o3}}</td>
                        <td>{{cell.co}}</td>
                        <td>{{cell.tvoc}}</td>
                        <td>{{cell.temperature}}</td>
                        <td>{{cell.humidity}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


  </div>
</template>

<script>
import yTabs from '@/components/global/y-tabs'
export default {
    name: 'detail-table',
    components: {
        yTabs
    },
    data() {
        return {
            tableType: [{ name: '日报' }, { name: '月报' }, { name: '年报'}],
            tableIndex: 0,
            tableData: [],
            airList: []
        }
    },
    computed: {
        vtime() {
            let date = new Date(),
                year = date.getFullYear(),
                month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
                day = date.getDate() ? '0' + date.getDate() : date.getDate(),
                result = '';
            // return month
            switch(this.tableIndex) {
                case 0: //日报
                    result = `${year}-${month}-${day}`
                break;
                case 1: // 月报
                    result = `${year}-${month}`
                break;
                case 2: // 日报
                    result = year
                break;
            }   
            return result;
        }
    },
    methods: {
        routerBack() {
            this.$router.back();
        },

        // 切换报表 
        changeTable(index) {
            
            
            if(this.$route.query.type == 3) {   // 
                console.log(index, this.$route.query.id)
                if(index == 0) {
                    this.$http.post(`http://172.21.92.248:8080/air/day/${this.$route.query.id}`)
                              .then(res => {
                                  console.log(res.data.data)
                                  this.airList = res.data.data
                              })
                }else if(index == 1) {
                    this.$http.post(`http://172.21.92.248:8080/air/month/${this.$route.query.id}`)
                              .then(res => {
                                  console.log(res.data.data)
                                  this.airList = res.data.data
                              })
                }else {
                    this.$http.post(`http://172.21.92.248:8080/air/year/${this.$route.query.id}`)
                              .then(res => {
                                  console.log(res.data.data)
                                  this.airList = res.data.data
                              })
                }


            }else {
                this.tableIndex = index;
                console.log(index)
                this.$service.getTable({
                    id: this.$route.query.id,
                    date: this.vtime,
                    pageNo: 1,
                    pageSize: 100  // 设置最大化，简化做分页的交互
                }).then(res => {
                    console.log(res.data)
                    this.tableData = res.data;
                })
            }

        }
    },
    created() {
        console.log(this.$route.query.type, '来源页面')
    }
}
</script>

<style scoped>
    [cell] {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .table .title {
        border-bottom: 1px solid rgba(255,255,255,.2)
    }
    .table-body {
        overflow: scroll;
        height: 1000px;
        position: relative; 
        -webkit-overflow-scrolling: touch;
    }
    #mytable { 
        width: 2000px; 
        font-size: 26px;
        text-align: center;
        color: #fff;
        border-collapse:collapse;
    }
    #mytable thead tr td {
        min-width: 80px;
        text-align: center;
    }
    #mytable td {
        padding: 15px 0;
    }
    #mytable thead tr { background-color: transparent !important; }
    #mytable tr:nth-child(odd) {
        background-color: #2f5b87
    }



</style>
