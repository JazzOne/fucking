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
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <swiper :options="swiperOption" class="y-swiper">
        <swiper-slide v-for="(n, i) in detail.attachmentChild" :key="i">
            <img :src="n.attachmentAddress" alt="">
            <!-- {{n}} -->
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

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
                { text: '报警', url: '/warn' },
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

            // console.log(this.detail.type, '===============////////////////////')
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
          console.log(params)
          if(params.type == 3){
            let url = this.url
            this.$http.get(url+'/GIS/air/one/details',{ params:{
              id:params.detail_id
            }}).then(res => {
                this.detail = res.data.data;
            })
          }else {
            this.$http.get(`http://172.21.92.62:8080/enterpiseInfo/info/${params.type}/${params.detail_id}`)
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
