<template>
  <div class="detail" padding>
    <y-header>
        <img src="@/assets/icon/back-icon.png"
             class="backbtn"
             width="25"
             height="25"
             slot="left"
             @click="routerBack">
        <span>{{detail.name}}</span>
        <img src="@/assets/logo.png" slot="right"  style="width: 10.6667vw">
    </y-header>

    <div v-if="detail.attachmentChild">
        <swiper :options="swiperOption" class="y-swiper" v-if="detail.attachmentChild.length > 0">
            
            <swiper-slide v-for="(n, i) in detail.attachmentChild" :key="i">
                <img :src="n.attachmentAddress" alt="">
                <!-- <div v-if="n.attachmentAddress">{{n.attachmentAddress}}</div>
                <div v-else>暂无</div> -->
            </swiper-slide>
            <!-- <swiper-slide v-for="(n, i) in detail.attachmentList" :key="i">
                {{n.attachmentAddress ? n.attachmentAddress : 'zanwu'}}
            </swiper-slide> -->


            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img v-if="detail.attachmentChild.length == 0" src="http://113.204.228.66:8010/test/static/rc_app/default/2DF632B0-CAAA-4059-81FF-CB24F22FAC6F.png" alt="">
    </div>
    <div v-if="detail.attachmentList">
        <swiper :options="swiperOption" class="y-swiper" v-if="detail.attachmentList.length > 0">
            <swiper-slide v-for="(n, i) in detail.attachmentList" :key="i">
                <img :src="n.attachmentAddress" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img v-if="detail.attachmentList.length == 0" src="http://113.204.228.66:8010/test/static/rc_app/default/2DF632B0-CAAA-4059-81FF-CB24F22FAC6F.png" alt="">
    </div>


    <div class="cells" card>
        <div class="cell"
             v-for="(cell, index) in cellList"
             :key="index"
             @click="goDetail(cell)">
            <img class="icon" :src="require('@/assets/icon/detail_icon_' + (index+1) + '.png' )">
            <span class="text">{{cell.text}}</span>
            <span class="arrow"></span>
        </div>
    </div>

  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'detail',
    components: {
        swiper,
        swiperSlide
    },
    data(){
        return {
            detail: {},
            // 轮播配置
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            // 列表
            cellList: [
                { text: '站点基本信息', url: '/infomation' },
                { text: '实时数据', url: '/realtime' },
                { text: '站点视频', url: '' },
                { text: '统计', url: '/table' },
                { text: '报警', url: '' },
                { text: '现场', url: '' }
            ],
        }
    },
    methods: {
        routerBack() {
            this.$router.back()
        },
        goDetail(cell) {
            
            this.detail.type = this.$route.params.type;
            this.detail.id = this.$route.params.detail_id;

            this.$router.push({
                path: cell.url,
                query: this.detail                
                // query: {
                //     id: this.$route.params.detail_id,
                //     type: this.$route.params.type
                // }
            });
        },
        // 获取企业详情信息
        getDetail() {
          let params = this.$route.params;
          if(params.type == 3){ // 空气站
            console.log('空气站', params)
            let url = this.$url;
            this.$http.get(url+'/air/one/details',{ params:{
              id: params.detail_id
            }}).then(res => {
                this.detail = res.data.data;
                console.log(this.detail)
            })
          }else {  // 
            this.$http.get(`/enterpiseInfo/info/${params.type}/${params.detail_id}`)
              .then(res => {
                this.detail = res.data.data;
                console.log('水质站或者污染企业', this.detail)
              })
          }

        }
    },
    created() {
        
        this.getDetail()
    }
}
</script>

<style scoped>
    img {
        width: 100%;
        height: 100%;
        border: 0;
    }
    .y-swiper {
        overflow: hidden;
        width: 710px;
        /* padding: 0 20px; */
        height: 356px;
        margin-top: 20px;
    }

    .cell {
        display: flex;
        align-items: center;
        padding: 30px;
        color: #fff;
    }
    .cell .icon {
        width: 35px;
        height: 35px;
        margin-right: 15px;
    }
    .cell .icon img { width: 100%; height: 100%; }
    .cell .text {
        font-size: 26px;
        width: calc(100% - 85px);
    }
    .cell .arrow {
        width: 20px;
        height: 20px;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(45deg);
        margin-right: 20px;
    }


</style>
