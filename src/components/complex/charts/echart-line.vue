<template>
    <div class="chart-container" :datalist="datalist" :time="time">
        <div class="title">
            <div class="left">
                <div v-if="!$slots.left">
                    <img src="@/assets/icon/time-icon.png" alt="">
                    <span>24小时监控</span>
                </div>
                <slot name="left"></slot>
            </div>
            <div class="right">
                <span v-if="!$slots.right">首要污染物：PM2.5</span>
                <slot name="right"></slot>
            </div>
        </div>
        <div class="myChart" ></div>
    </div>

</template>

<script>
export default {
    name: 'echart-line',
    props: ['datalist', 'time'],
    // {
    //   datalist: Array,
    //   time:Array
    // },
    data() {
        return {
            
        }
    },
    created() {
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            
            let myChart = this.$echarts.init(document.querySelector('.myChart'))
            let option = {
                dataZoom: [
                    {
                        type: "slider",
                        show: false,
                        orient: "horizontal",
                        filterMode: "none",
                        start: 0,
                        // end: this.datalist.length <= 2 ? 100 : 40,
                        end: 80,
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
                        end: 40,
                        zoomLock: true,
                    }
                ],
                grid: {
                    top: 15,
                    left: 10,
                    right: 10,
                    bottom: 40
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
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
                    data: this.time,
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    splitLine:{
                        show: false,
                    },
                },
                tooltip: {
                    formatter: 'AQI: {c} 重度',
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#000',
                        fontSize: '12px'
                    },
                    padding: [5, 9],
                    extraCssText: 'font-size: 12px;',
                        position:function(e){ // e为当前鼠标的位置
                        return [e[0] + 20, e[1] - 20];
                    },
                },
                series: [{
                    data: this.datalist,
                    type: 'line',
                    symbol: 'image://' + require('@/assets/icon/dot.png'),
                    symbolSize: 15,
                    showAllSymbol: true,
                    smooth: true,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#fff'
                            }
                        }
                    }
                }]
            };
            myChart.setOption(option);
            // console.log(this.time)
        },
    }
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        height: 100%;
    }
    .title {
        padding: 20px 27px;
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ccc;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
    }
    .title .left {
        display: flex;
        align-items: center;
    }
    .title .left img { margin-right: 15px; width: 26px; height: 26px; }

    .myChart {
        height: 450px;
    }
</style>
