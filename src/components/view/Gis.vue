<template>
  <div class="gis" padding>
    <y-header>
        <img src="@/assets/icon/back-icon.png" 
             class="backbtn" 
             width="25" 
             height="25" 
             slot="left" 
             @click="routerBack">
        <span>{{$route.name}}</span>
        <img src="@/assets/logo.png" slot="right"  style="width: 10.6667vw">
    </y-header>

    <y-tabs dark :tabs="tabs" style="margin: 15px 0;"></y-tabs>

    <div class="container" card>
        <div class="title">
            <div class="left">
                <img src="@/assets/icon/time-icon.png" alt="">
                <span>24小时监控</span>    
            </div> 
            <div class="right">
                14家水质站在线
            </div>
        </div>
        <div class="maps"></div>
        <div class="foot">
            <template>
                <div flex>
                    <div class="item">
                        <img src="@/assets/icon/chaobiao.png" alt="">
                        <span>超标</span>
                    </div>
                    <div class="item">
                        <img src="@/assets/icon/dabiao.png" alt="">
                        <span>合格</span>
                    </div>
                </div>
            </template>
            <!-- <template>
                
            </template> -->
        </div>
    </div>

  </div>

</template>

<script>
import yHeader from '@/components/global/y-header'
import yTabs from '@/components/global/y-tabs'
export default {
    name: 'gis',
    components: {
        yHeader,
        yTabs
    },
    data() {
        return {
            tabs: [{name: '水质站'}, {name:'空气站'}, {name: '污染企业'}]
        }
    },
    methods: {
        routerBack() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    [flex] {
        display: flex;
    }


    .container {
        
    }
    .title {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 26px;
        height: 70px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255,255,255,.4);
        padding: 0 20px;
    }
    .title .left {
        display: flex;
        align-items: center;
    }
    .title .left img {
        display: inline-block;
        vertical-align: middle;
        width: 26px;
        height: 26px;
        margin-right: 10px;
    }

    .maps {
        height: 960px;
    }

    .foot { 
        border-top: 1px solid rgba(255,255,255,.4);
        padding: 10px 0;
    }
    .foot .item {
        margin: 0 10px;
    }
    .foot .item img {
        /* width:  */
        display: inline-block;
        transform: scale(0.7);
        vertical-align: middle;
    }
    .foot .item span {
        display: inline-block;
        font-size: 26px;
        color: #fff;
        vertical-align: middle;
    }
</style>
