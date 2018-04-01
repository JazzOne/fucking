<template>
  <div class="detail-realtime" padding>
    <y-header>
      <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
      <span>实时数据</span>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <y-tabs :tabs="tabs" class="menu" @change="changeTab" v-if=" $route.query.type == '1' "></y-tabs>

    <echartLine card :datalist="list" :time="time" v-if="listTrue">
      <span slot="left" style="color: #fff;">{{listtitle.yzName}} {{listtitle.dateTime}}</span>
      <span slot="right" style="color: #fff;">设备编号:{{listtitle.yzCode}}</span>
    </echartLine>




    <template v-if=" $route.query.type !== '1' ">
      <div card>
        <div cell>
          <span>高锰酸钾指数</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>总磷</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>氨氮</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>生物毒性</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>温度</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>PH(无量纲)</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>浊度(FTU)</span>
          <span>3.96 mg/L</span>
        </div>
        <div cell>
          <span>导电率(us/cm)</span>
          <span>3.96 mg/L</span>
        </div>
      </div>
    </template>
    <template v-if=" $route.query.type == '1' && theIndex == 1">
      <div card v-for="li in listtitle.equipments">
        <div cell v-for="item in li.yzs">
          <span>{{item.yzname}}</span>
          <span>{{item.value}}</span>
        </div>
       <!-- <div cell>
          <span>A相电流</span>
          <span>23.1m³/分</span>
        </div>
        <div cell>
          <span>B相电流</span>
          <span>&#45;&#45;</span>
        </div>
        <div cell>
          <span>C相电流</span>
          <span>1</span>
        </div>
        <div cell>
          <span>A相电压</span>
          <span>1</span>
        </div>
        <div cell>
          <span>B相电压</span>
          <span>1</span>
        </div>
        <div cell>
          <span>C相电压</span>
          <span>1</span>
        </div>
        <div cell>
          <span>能耗</span>
          <span>1</span>
        </div>
        <div cell>
          <span>总能耗</span>
          <span>1</span>
        </div>-->
      </div>
    </template>
    <!-- <template v-if=""></template> -->


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
      tabs: [{name: '在线监测'}, {name: '工程监控'}],
      theIndex: 0,
      listtitle:'',
      list:[],
      reals:[],
      time:[],
      listTrue:true
    }
  },
  created() {
    this.$nextTick(() => {
      this.getlistcon()
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

      console.log(this.tabs[index])
    },
    getlistcon(){
      let self = this
      let params = this.$route.params;
      function sortNumber(a,b) {
        return a - b
      }
      let id =  localStorage.getItem('id')
      this.$http.get(`http://172.21.92.215:8080/enterpiseInfo/monitor/1/${id}`)
        .then(res => {
          self.listtitle = res.data.data
          let timeList = []
          let avg = []
          self.reals = res.data.data.reals.sort(function (s, t) {
            var a = s.time;
            var b = t.time;
            return a - b
          })
          self.reals.forEach((val)=>{
            timeList.push(Number(val.time))
            avg.push(Number(val.avg))
          })
          self.time = timeList
          self.list = avg
          self.listTrue = false
          setTimeout(()=>{
            self.listTrue = true
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
</style>
