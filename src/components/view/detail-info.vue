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
        <img src="@/assets/logo.png" slot="right" style="width: 10.6667vw">
    </y-header>

    <swiper :options="swiperOption" class="y-swiper" >
        <swiper-slide v-for="(n, i) in infos.attachmentChild" :key="i">
            <img :src="n.attachmentAddress" alt="" width="100%" height="100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!-- 污染企业 -->
    <template v-if="$route.query.type == '1'">
        <div class="info">
            <y-tabs dark :tabs="tabs" @change="changeTab"></y-tabs>
            <div card v-if="index == 0">
                <div cell>
                    <span>企业名称</span>
                    <span>{{infos.name}}</span>
                </div>
                <div cell>
                    <span>法人代表</span>
                    <span>{{infos.legalRepresentative}}</span>
                </div>
                <div cell>
                    <span>企业负责人</span>
                    <span>{{infos.head}}</span>
                </div>
                <div cell>
                    <span>负责人联系电话</span>
                    <span>{{infos.headPhone}}</span>
                </div>
                <div cell>
                    <span>行政区域</span>
                    <span>{{infos.areaName}}</span>
                </div>
                <div cell>
                    <span>管控级别</span>
                    <span>区(县)控</span>
                </div>
                <div cell>
                    <span>环保负责人</span>
                    <span>{{infos.envHead}}</span>
                </div>
                <div cell>
                    <span>环保负责人联系电话</span>
                    <span>{{infos.envHeadPhone}}</span>
                </div>
                <div cell>
                    <span>所属流域</span>
                    <span>{{infos.riverBasin}}</span>
                </div>
                <div cell>
                    <span>行业类别</span>
                    <span>{{infos.industryName}}</span>
                </div>
                <div cell>
                    <span>组织机构代码</span>
                    <span>{{infos.orgCode}}</span>
                </div>
                <div cell>
                    <span>企业建设状态</span>
                    <span>{{infos.buildStatus}}</span>
                </div>
                <div cell>
                    <span>企业运行状态</span>
                    <span>{{infos.runStatus}}</span>
                </div>
                <div cell>
                    <span>地址</span>
                    <span>{{infos.address}}</span>
                </div>
                <div cell>
                    <span>经度</span>
                    <span>105.12456</span>
                </div>
                <div cell>
                    <span>纬度</span>
                    <span>29.12456</span>
                </div>
            </div>
            <div card v-else-if="index == 1">
                <div cell>
                    <span>排污许可证编号</span>
                    <span>{{book.licenseCode ? book.licenseCode : '----'}}</span>
                </div>
                <div cell>
                    <span>有效时间</span>
                    <span v-if="book.beginDate || book.endDate">{{book.beginDate}}至{{book.endDate}}</span>
                    <span v-else>----</span>
                </div>
                <div cell>
                    <span>单位时间最大排放量</span>
                    <span v-if="book.maxiMum">{{book.maxiMum}}吨</span>
                    <span v-else>----</span>
                </div>
                <div style="font-size: 3.467vw;padding: 4vw; color: #fff;">
                    <span>排污许可证附页</span>
                    <span class="arrow " :class="book.attachmentAddress ? 'down' : 'up' "></span>
                    <div class="pictures" v-if="book.attachmentAddress">
                        <img :src="img" 
                             v-for="(img, idx) in book.attachmentAddress"
                             :key="idx">

                    </div>
                </div>
            </div>
            <div card v-else>
                <div v-if="step">
                    <!-- <div cell>
                        <span>工艺名称</span>
                        <span>湿法粗粉脱硫工艺</span>
                    </div> -->
                    <div class="pictures">
                        <img :src="step.attachmentAddress" alt="">
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else-if="$route.query.type == '2'">
        <div class="info" card >
            <div cell>
                <span>站点名称</span>
                <span>{{infos.name}}</span>
            </div>
            <div cell>
                <span>站点类型</span>
                <span>国控</span>
            </div>
            <div cell v-if="$route.query.type != '3'">
                <span>所属流域</span>
                <span>{{infos.riverBasin ? infos.riverBasin : '--'}}</span>
            </div>
            <div cell>
                <span>安装位置</span>
                <span>{{infos.address ? infos.address : '--'}}</span>
            </div>
            <div cell>
                <span>经度</span>
                <span>{{infos.lon}}</span>
            </div>
            <div cell>
                <span>纬度</span>
                <span>{{infos.lat}}</span>
            </div>
            <!-- 运维单位字段 -->
            <div cell>
                <span>运维单位</span>
                <span>--</span>
            </div>
            <div cell>
                <span>运维负责人</span>
                <span>{{infos.envHead ? infos.envHead : '--'}}</span>
            </div>
            <div cell>
                <span>运维负责人联系电话</span>
                <span>{{infos.envHeadPhone ? infos.envHeadPhone : '--'}}</span>
            </div>
        </div>
    </template>

    <template v-else-if="$route.query.type == '3'">
        <div class="info" card>
            <div cell>
                <span>站点名称</span>
                <span>{{infos.name}}</span>
            </div>
            <div cell>
                <span>站点类型</span>
                <span>{{infos.controlLevel}}</span>
            </div>
            <div cell>
                <span>监控区域</span>
                <span>--</span>
            </div>
            <div cell>
                <span>安装位置</span>
                <span>{{infos.address}}</span>
            </div>
            <div cell>
                <span>经度</span>
                <span>{{infos.lon}}</span>
            </div>
            <div cell>
                <span>纬度</span>
                <span>{{infos.lat}}</span>
            </div>
            <div cell>
                <span>运维单位</span>
                <span>--</span>
            </div>
            <div cell>
                <span>运维负责人</span>
                <span>{{infos.envHead ? infos.envHead : '--'}}</span>
            </div>
            <div cell>
                <span>运维负责人联系方式</span>
                <span>{{infos.envHeadPhone ? infos.envHeadPhone : '--'}}</span>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import yTabs from '@/components/global/y-tabs';

export default {
    name: 'detail-infomation',
    components: {
        swiper,
        swiperSlide,
        yTabs
    },
    data(){
        return {
            // 轮播配置
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            // tab选项
            tabs: [
                {name: '企业基本信息'},
                {name: '排污许可证'},
                {name: '工艺流程图'}
            ],
            index: 0,

            // 企业排污许可证
            book: {},
            // 工艺流程图
            step: {},

            // 基本信息
            infomation: {}
        }
    },
    computed: {
        infos() {
            return this.$route.query
        }
    },
    methods: {
        routerBack() {
            this.$router.back()
        },
        changeTab(index) {
            
            this.index = index;
            let id = this.infos.id;
            
            switch(this.index) {
                // case 0:
                                
                // break;
                case 1:
                    this.$http.get(`/enterpiseInfo/swage/${id}`)
                        .then(res => {
                            if(Object.prototype.toString.call(res.data) == '[object Null]') {
                                console.log('暂无排污许可证')
                            }else {
                                this.book = res.data.data;
                                console.log(this.book)
                            }
                        })
                break;
                case 2:
                    // console.log('工艺流程图')
                    this.$http.get(`/enterpiseInfo/drawing/${id}`)
                        .then(res => {
                            if(Object.prototype.toString.call(res.data) == '[object Null]') {
                                console.log('无工艺流程图')
                            }else {
                                this.step = res.data.data;
                                console.log(this.step, '工艺流程图')
                                
                            }
                        })
                break;
            }
        }
    },
    created() {
        
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

    .pictures {
        text-align: center;
        margin: 0 auto;
        padding: 30px 0;
        width: 510px;
    }
    .pictures img {
        display: block;
        width: 100%;
        height: 100%;

    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        float: right;
        width: 20px;
        height: 20px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        
    }
    .arrow.down {
        transform: rotate(45deg)
    }
    .arrow.up {
        transform: rotate(-135deg);
        margin-top: 20px;
    }

</style>
