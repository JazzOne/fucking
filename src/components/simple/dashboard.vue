<template>
  <div class="dashboard" card>
    <div class="main">
        <div>
            <span class="title">261</span>
            <p style="padding: 2vw">AQI<span>中度污染</span></p>
            </div>
            <div>
            <span style="display: block; font-size: 4.8vw; padding: 2.6667vw 0;">PM2.5</span>
            <p>主要污染物</p>
        </div>
    </div>

    <div class="list">
        <div class="item">
            <span text-left>
                <p style="font-size: 3.7333vw">渝西13区县排名</p>
                <p style="font-size: 2.9333vw">上月排名：10</p>
            </span>
            <span text-right>
                <span style="color: #ffd216; font-size: 6.4vw; font-weight: 400;">10</span> / 13
            </span>
        </div>
        
        <div class="item">
            <span text-left>
                <p style="font-size: 3.7333vw">优良天数</p>
                <p style="font-size: 2.9333vw;">剩余天数：232</p>
            </span>
            <span text-right>
                <span style="color: #ffd216; font-size: 6.4vw; font-weight: 400;">14</span> / 259
            </span>
        </div>

        <div class="item">
            <span text-left>
                <p style="font-size: 3.7333vw;">PM2.5年均浓度</p>
                <p style="font-size: 2.9333vw;">单位：um/G³</p>
            </span>
            <span text-right>
                <span style="color: #ffd216; font-size: 6.4vw; font-weight: 400;">123</span> / 56
            </span>
        </div>
        

    </div>

  </div>
</template>

<script>
export default {
    name: 'dashboard',

}
</script>

<style scoped>
    .dashboard {
        height: 339.9998px; 
        text-align: center;
        padding: 15px 0;
        display: flex;
    }
    .dashboard > div {
        height: 100%;
        color: rgba(255, 255, 255, 1);
        font-weight: 200;
    }
    .dashboard .main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 26.6667vw;
        font-size: 2.9333vw;
        border-right: 0.1333vw solid rgba(255, 255, 255, .3);       
    }
    .dashboard .main .title {
        background-color: #325d88;
        color: #ff2a89;
        font-size: 8vw;
        font-weight: 500;
        padding: 0 9.9997px;
    }

    .dashboard .list {
        width: 63vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;    
        padding: 0 4vw;     
    }

    .dashboard .list .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    [text-right] { text-align: right; }
    [text-left] {
        text-align: left;
    }
    [text-left] p:nth-child(2) {
        margin-top: 0.4vw;
    }
</style>
