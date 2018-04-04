<template>
  <div class="y-chart-container">
      <!-- 未交互 -->
      <!-- datalist -->
      <!-- <keep-alive>   -->
        <!-- <component :is="currentChart" :datalist="data"></component> -->
      <!-- </keep-alive> -->

      <!-- {{currentChart}} -->
      <echart-line v-if="currentChart == 'aqi'"></echart-line>
    
  </div>
</template>

<script>
// 在此注册所有的echart图表
import echartLine from "@/components/complex/charts/echart-line";
import echartBar from "@/components/complex/charts/echart-bar";
import chartCircle from "@/components/complex/charts/chart-circle";
import echartStacted from "@/components/complex/charts/echart-stacked-line"; 

import amap from "@/components/complex/charts/amap";
import cqwi from '@/components/complex/charts/chart-dot';

export default {
    name: 'y-chart-content',
    components: {
        // // 空气质量 
        // aqi   : echartLine,    // AQI指数
        // air   : echartBar,     // 空气质量
        // day   : chartCircle,   // 优良天数
        // pm    : echartStacted, // PM2.5
        // // 水质监测
        // dm    : amap,          // 超标断面
        // cqwi  : cqwi,          // CQWI排名 
        
        // // driver: echartLine,
        // // drink : echartLine

        echartLine,
        echartBar,
        chartCircle
        
    },
    props: {
        // 根据传入的字符串动态渲染图表
        currentChart: {
            type: String, 
            default: 'aqi'
        },
        data: {
            type: Object
        }

    },
    computed: {
        
    },
    watch: {
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    created() {
        
    }
}
</script>

<style scoped>
    .y-chart-container {
        height: 520px;
    }
</style>
