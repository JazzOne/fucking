<template>
  <div class="chart-container">
    <div class="title">
        <div class="left">
            <img src="@/assets/icon/time-icon.png" alt="">
            <span>24小时监控</span>    
        </div> 
        <div class="right">
            <span href="javascript: void(0)" class="calendarBtn">3月</span>
        </div>
    </div>
    <div class="myChart"></div>
  </div>
</template>

<script>
export default {
    name: 'echart-bar',
    props: {
        data: String
    },
    methods: {
        createCharts() {
            let myChart = this.$echarts.init(document.querySelector('.myChart'))
            let option = {
                trigger: "axis", 
                tooltip: {

                },
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: false,
                        orient: "horizontal",
                        filterMode: "none",
                        start: 0,
                        end: 50,
                        zoomLock: true,
                        borderColor: "#fff",
                        dataBackground: {
                            lineStyle: {
                                opacity: 0
                            },
                            areaStyle: {
                                opacity: 0
                            }
                        },
                        labelFormatter: "",
                        handleStyle: {
                            opacity: 0
                        },
                        bottom: -25
                    },
                    {
                        type: "inside",
                        orient: "horizontal",
                        filterMode: "none",
                        start: 0,
                        end: 100,
                        zoomLock: true,
                    }
                ],
                grid: {
                    left: '-8%',
                    right: 0,
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    data: ["南川","长寿","涪陵","大足","南岸","潼南"],
                    splitLine:{
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel:{
                        interval: 0,
                        padding: [6, 0, 5, 0]
                    },
                    axisLine: {
                        lineStyle: {
                        color: '#fff',
                        opacity: 0.3
                        }
                    },
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    // min: 0,
                    // max: 150,
                    // interval: 50,
                    splitLine:{
                        show: false,
                    },
                },
                series: [{
                    name: '可用',
                    barWidth: 25, //柱图宽度
                    type: 'bar',
                    stack:'使用情况',
                    data: [50, 120, 136, 110, 100, 60],
                    itemStyle:{
                        normal: {color:"#d4f1fa"},
                    }
                },{
                    name: '不可用',
                    type: 'bar',
                    stack:'使用情况',
                    data: [40, 122, 18, 35, 42, 40],
                    itemStyle:{
                        normal:{color:"#99d3eb"},
                    }
                },{
                    name: '不可用',
                    type: 'bar',
                    stack:'使用情况',
                    data: [140, 130, 102, 50, 40, 80],
                    itemStyle:{
                        normal:{color:"#387ea6"},
                    }
                }]
            };

            myChart.setOption(option);
        },
    },
    created() {
    },
    mounted() {
        this.createCharts()
    }
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        height: 100%;
    }
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ccc;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        padding: 0 27px;
        font-size: 26px;
        height: 70px;
    }
    .title .left {
        display: flex;
        align-items: center;
    }
    .title .left img { margin-right: 15px; width: 26px; height: 26px; }

    .myChart {
        height: 450px;
    }

    .calendarBtn {
        display: inline-block;
        width: 170px;
        height: 48px;
        line-height: 48px;
        border-radius: 24px;
        text-align: center;
        background: rgba(255, 255, 255, .3);
        color: #fff;
    }
</style>
