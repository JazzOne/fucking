<template>
  <div>
      <div class="chart-stacked-title">
        <div class="item">
            <span class="badge" style="background: #ff4799;"></span>
            <span class="text">荣昌</span>
        </div>
        <div class="item">
            <span class="badge" style="background: #6be9ee;"></span>
            <span class="text">渝西片区</span>
        </div>
        <div class="item">
            <span class="badge" style="background: #ffd216;"></span>
            <span class="text">考核标准</span>
        </div>
        <div class="item">
            <span class="badge" style="background: #26df68;"></span>
            <span class="text">国家标准</span>
        </div>
    </div>
    <div class="myChart"></div>
  </div>
</template>

<script>
export default {
    name: 'echart-stacked-line',
    props: {
        source: Array
    },
    data() {
        return {

        }
    },
    methods: {
        createChart() {
            
            
            
            
            let myChart = this.$echarts.init(document.querySelector('.myChart'));
            let option = {
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
                        end: 40,
                        zoomLock: true,
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    top: 20,
                    left: 14,
                    right: 14,
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
                        padding: [6, 10, 5, 10]
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: 0.3
                        }
                    },
                    data: ['2015','2016','2017','2018','2019']
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name:'荣昌',
                        type:'line',
                        stack: '总量',
                        smooth: true,
                        symbol: 'none',
                        itemStyle : {
                            normal : {
                                lineStyle:{
                                    color:'#ff4799'
                                }
                            }
                        },
                        data: [120, 132, 180, 134, 90, 230, 210],
                    },
                    {
                        name:'渝西片区',
                        type:'line',
                        stack: '总量',
                        symbol: 'none',
                        smooth: true,            
                        itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#6be9ee'
                            }
                        }
                        },
                        data:[220, 50, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'考核标准',
                        type:'line',
                        smooth: true,
                        symbol: 'none',
                        stack: '总量',
                        itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#ffd216'
                            }
                        }
                        },
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'国家标准',
                        type:'line',
                        smooth: true,
                        symbol: 'none',
                        stack: '总量',
                        itemStyle : {
                        normal : {
                            lineStyle:{
                                color:'#26df68'
                            }
                        }
                        },
                        data: [320, 332, 301, 334, 390, 330, 320]
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted() {
        this.createChart()
        
        // console.log(this.source)
        let xdata = [];
        this.source.map(value => {
            // console.log(value)
            xdata.push(value.years)
        })
        console.log(xdata)
    }
}
</script>

<style scoped>
    .chart-stacked-title {
        display: flex;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
    }
    .chart-stacked-title .item {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 26px;
        flex-basis: 25%;
    }
    .chart-stacked-title .item .badge {
        display: inline-block;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        background-color: #000;
        margin-right: 10px; 
    }

    .myChart {
        height: 450px;
    }
</style>
