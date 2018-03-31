<template>
    <div class="detail-warn-list" padding>
      <y-header>
        <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
        <span>报警信息</span>
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
      </y-header>  

      <div class="title" cell style="padding-left: 0; padding-right: 0;">
        <span>共 3 条报警信息未处理</span>
        <span>今日：1条</span>
      </div>
      <div scroll-content class="detail-warn-content">
        <div class="card" card v-for="n in 10" :key="n">
            <div class="pic">
                <img :src="require('@/assets/logo.png')" alt="">
            </div>
            <div class="desc">
                <p class="hd">重庆XX有限公司</p>
                <p><span class="circle on"></span><span style="vertical-align: middle;">处理中</span></p>
                <p>报警时间：2018-01-03  10:00</p>
                <p>持续时间：4小时20分钟</p>
            </div>
        </div>
      </div>

      
    
    </div>
</template>

<script>
export default {
    name: 'detail-waring',
    methods: {
        handleback() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
    img{ width: 100%; height: 100%; }
    .card {
        padding: 20px 25px;
        display: flex;
    }
    .card .pic {
        width: 240px;
        height: 180px;
        padding-right: 25px;
    }
    .card .pic img {
        width: 100%; 
        height: 100%;
        border-radius: 10px;
    }
    .card .desc {
        font-size: 24px;
        color: #fff;
        display: flex;
        flex-direction: column;
        flex: 1 0 auto;
        justify-content:space-between;
    }
    .card .desc .circle {
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 12px;
    }
    .card .desc .circle.on {
        background-color: #14e3a1;
    }
    .card .desc .circle.off {
        background-color: #cccccc;
    }
    .card .desc .circle.warn {
        background-color: #eb4c6f;
    }

    .card .desc .hd {
        font-size: 30px;
    }


    .detail-warn-content {
        height: 1100px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>
