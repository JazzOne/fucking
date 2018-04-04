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
    <div class="myChart">
        <!-- <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'chart-dot',
    
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
    

    /* .myChart ul {
        display: flex;
    }
    .myChart
     */
</style>
