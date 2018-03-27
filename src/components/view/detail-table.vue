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
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <y-tabs dark :tabs="tableType" style="margin: 15px 0;"></y-tabs>


    <div class="table" card>
        <div class="title" cell>
            <span>152条日报</span>
            <span>2018-01-03</span>
        </div>
        <div class="table-body">
            <table id="mytable">
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
                    <tr v-for="n in 100" :key="n">
                        <td>01:00</td>
                        <td>12</td>
                        <td>3.96</td>
                        <td>2323</td>
                        <td>0.8</td>
                        <td>8%</td>
                        <td>12</td>
                        <td>1.134</td>
                        <td>12</td>
                        <td>1.134</td>
                        <td>23.3</td>
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
        }
    },
    methods: {
        routerBack() {
            this.$router.back();
        }
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
