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
    name: 'chart-dot',
    data() {
        return {
            cwqi: [],   
        }
    },
    computed: {
        xAxis() {
            let result = [];
            this.cwqi.forEach(value => {
                result.push(value.areaName)
            })
            return result
        },
        series() {
            let result = [];
            this.cwqi.forEach(value => {
                result.push(value.cqwi)
            })
            return result
        }
    },
    methods: {
        getData() {
            this.$service.getCWQI().then(res => {
                this.cwqi = res.data;
                // console.log(this.cwqi)
                this.initChart()
            })
        },
        initChart(){
            console.log(this.cwqi)
            let myChart = this.$echarts.init(document.querySelector('.myChart'))
            let option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '-9%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : this.xAxis,
                        axisTick: {
                            alignWithLabel: true
                        },
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
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show: false,
                        splitLine:{
                            show: false,
                        },
                    }
                ],
                series : [
                    {
                        name:'CWQI排名',
                        type:'bar',
                        barWidth: '60%',
                        data: this.series
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        // this.initChart()
    }
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        height: 100%;
    }
    .title {
        font-size: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ccc;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        padding: 0 27px;
        height: 70px;
    }
    .title .left {
        display: flex;
        align-items: center;
    }
    .title .left img { margin-right: 15px; width: 26px; height: 26px; }
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


    /*  */
    .myChart {
        width: 100%;
        height: 400px;
    }
    .chart-dot {
        overflow: scroll;
        white-space:nowrap;
    }
    .chart-dot li {
        display: inline-block;
        width: 100px;
        text-align: center;
    }
    

    /* .myChart ul {
        display: flex;
    }
    .myChart
     */
</style>
