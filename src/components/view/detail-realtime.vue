<template>
  <div class="detail-realtime" padding>
    <y-header>
      <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
      <span>实时数据</span>
      <img src="@/assets/logo.png" slot="right"  style="width: 10.6667vw">
    </y-header>

    <y-tabs :tabs="tabs" class="menu" @change="changeTab" v-if=" $route.query.type == '1' "></y-tabs>

    <echartLine card :datalist="list" :time="time" v-if="listTrue">
      <span slot="left" style="color: #fff;">{{listtitle.yzName}} {{listtitle.dateTime}}</span>
      <span slot="right" style="color: #fff;">设备编号:{{listtitle.yzCode}}</span>
    </echartLine>



    <!-- 水质站 -->
    <template v-if=" $route.query.type == '2' ">
      <div card>
        <div class="waterList" v-for="(info, index) in listInfo">
          <div class="hd">{{info.name}}</div>
          <div cell v-for="yzs in info.yzs">
            <span>{{yzs.yzname}}</span>
            <span>{{yzs.value}}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- 污染企业 -->
    <template v-if=" $route.query.type == '1'">

      <div card v-for="li in listInfo" v-if="theIndex == 0">
        <div cell>
          {{li.name}}
        </div>
        <div cell v-for="yzs in li.yzs" style="margin-left: 2.6667vw; padding: 2.6667vw" >
          <span>{{yzs.yzname}}</span>
          <span>{{yzs.value}}</span>           
        </div>
      </div>
      
      <div card v-for="li in listInfo" v-if="theIndex == 1">
        <div cell>
          {{li.name}}
        </div>
        <div cell v-for="yzs in li.yzs" style="margin-left: 2.6667vw; padding: 2.6667vw" >
          <span>{{yzs.yzname}}</span>
          <span>{{yzs.value}}</span>           
        </div>
      </div>

    </template>
    <!-- 空气站 -->
    <template v-if=" $route.query.type == '3' ">
      <div card>
        <div cell>
          <span>PM2.5</span>
          <span>{{listInfo.pm25}}ug/m³</span>
        </div>
        <div cell>
          <span>PM10</span>
          <span>{{listInfo.pm10}}ug/m³</span>
        </div>  
        <div cell>
          <span>SO2</span>
          <span>{{listInfo.so2}}ug/m³</span>
        </div> 
        <div cell>
          <span>NO2</span>
          <span>{{listInfo.no2}}ug/m³</span>
        </div> 
        <div cell>
          <span>O3</span>
          <span>{{listInfo.o3}}ug/m³</span>
        </div> 
        <div cell>
          <span>CO</span>
          <span>{{listInfo.co}}mg/m³</span>
        </div>
        <div cell>
          <span>TVOC</span>
          <span>{{listInfo.tvoc ? listInfo.tvoc : '--'}}</span>
        </div>
        <div cell>
          <span>大气压</span>
          <span>{{listInfo.apress}}</span>
        </div>
        <div cell>
          <span>温度</span>
          <span>{{listInfo.temperature}}℃</span>
        </div>
        <div cell>
          <span>湿度</span>
          <span>{{listInfo.humidity}}%PH</span>
        </div>
        <div cell>
          <span>风向</span>
          <span>{{listInfo.wdirect}}</span>
        </div>
        <div cell>
          <span>风速</span>
          <span>{{listInfo.wspeed}}</span>
        </div>
        <div cell>
          <span>雨量</span>
          <span>--</span>
        </div>
        <div cell>
          <span>噪声</span>
          <span>--</span>
        </div>
      </div>
    </template>


  </div>
</template>

<script>
import echartLine from '@/components/complex/charts/echart-line'
import yTabs from '@/components/global/y-tabs'
export default {
  name: 'realtime',
  components: {
    echartLine,
    yTabs
  },
  data(){
    return {
      tabs: [{name: '在线监测'}, {name: '工况监控'}],
      theIndex: 0,
      listtitle:'',
      list:[],
      reals:[],
      time:[],
      listTrue:true,
      // 下半部分的因子
      listInfo: ''
    }
  },
  created() {
    this.$nextTick(() => {

      if(this.$route.query.type == 2) {  // 水质站
        let id =localStorage.getItem('id');
        this.$http.post(`/enterpiseInfo/monitor/2/${id}`)
            .then(res => {
              console.log(res)
              let data = res.data.data;

              this.listtitle = data;

              this.listInfo = data.equipments;

              console.log(data.reals)
              // 中间的图表
              let avgs = [],
                  times = [];
              data.reals.map(value => {
                avgs.push(value.avg);
                times.push(value.time);
              });
              this.list = avgs;
              this.time = times;

              this.listTrue = false;
              setTimeout(()=>{
                this.listTrue = true
              },10);
              


            })
      }else if(this.$route.query.type == 3) {

        // 实时监控图表数据
        this.$http.post(`http://172.21.92.248:8080/air/AQI/${this.$route.query.baseEnterpriseId}`).then(res => {
          // console.log(res.data.data)
          let data = res.data.data,
              time = [],
              list = [];
              
          data.forEach(element => {
            time.push(element.time)
            list.push(element.AQI)
          });
          
          this.time = time; 
          this.list = list;
        })

        // 下半部分因子
        this.$http.get(`http://172.21.92.248:8080/air/station`, {
          params: {
            enterprseId:this.$route.query.baseEnterpriseId
          }
        }).then(res => {
          this.listInfo = res.data.data;
        });




      }
    })
  },
  mounted() {
  },
  methods: {
    handleback() {
      this.$router.back()
    },
    changeTab(index) {
      this.theIndex = index;
      if(this.theIndex == 0) {  // 在线监测
        this.getlistcon("1")
      }
      if(this.theIndex == 1){ // 工况监测
        this.getGC("0")
      }
    },
    // 在线监测
    getlistcon(type){
      let self = this
      let query = this.$route.query,
          id =  localStorage.getItem('id')
      
      this.$http.get(`/enterpiseInfo/monitor/${type}/${id}`)
      .then(res => {
        
        let data = res.data.data;
        
        // 顶部的标题
        this.listtitle = data

        // 下半部分列表
        this.listInfo = data.equipments;


        // 中间的图表
        let avgs = [],
            times = [];
        data.reals.map(value => {
          avgs.push(value.avg);
          times.push(value.time);
        })
        this.list = avgs;
        this.time = times
        this.listTrue = false;
        setTimeout(()=>{
          self.listTrue = true
        },10)
        

      });

    },
    // 工程监控
    getGC(type) {
      let id = localStorage.getItem('id');
      this.$http.get(`/enterpiseInfo/monitor/${type}/${id}`)
          .then(res => {
            let data = res.data.data;
            // 顶部的标题
            this.listtitle = data;


            // 底部因子列表
            this.listInfo = data.equipments;
            
            // 中间图表
            let cums = []
            data.reals.map(value => {
               cums.push(value.cum)
            })
            this.list = cums;

            this.listTrue = false

            setTimeout(()=>{
              this.listTrue = true
            },10)

          })
    }
  }
}
</script>

<style scoped>
  .menu {
    width: 400px;
    margin: 0 auto;
  }

  .waterList .hd{
    font-size: 28px;
    font-weight: bold;
    padding: 10px 25px;
    /* border-bottom: 1px solid #dcdcdc; */
    color: #fff;
  }
</style>
