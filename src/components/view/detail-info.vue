<template>
  <div class="detail-infomation" padding>
    
    <y-header>
        <img src="@/assets/icon/back-icon.png" 
             class="backbtn" 
             width="25" 
             height="25" 
             slot="left" 
             @click="routerBack">
        <span>基本信息</span>
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <swiper :options="swiperOption" class="y-swiper">
        <swiper-slide v-for="(n, i) in 3" :key="i">Slide {{n}}</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="info" card>
        <div cell>
            <span>站点名称</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>站点类型</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>所属流域</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>安装位置</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>经度</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>纬度</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>运维单位</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>运维负责人</span>
            <span>重庆XX水质站</span>
        </div>
        <div cell>
            <span>运维负责人联系电话</span>
            <span>重庆XX水质站</span>
        </div>
    </div>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'detail-infomation',
    components: {
        swiper,
        swiperSlide
    },
    data(){
        return {
            // 轮播配置
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
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
    .y-swiper {
        overflow: hidden;
        width: 710px;
        /* padding: 0 20px; */
        height: 356px;
        margin-top: 20px;
    }


</style>
