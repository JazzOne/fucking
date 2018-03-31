<template>
  <div class="detail-realtime" padding>
    <y-header>
      <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
      <span>实时数据</span>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <y-tabs :tabs="tabs" class="menu" @change="changeTab" v-if=" $route.query.type == 'company' "></y-tabs>

    <echartLine card>
      <span slot="left" style="color: #fff;">COD 3月24日</span>
      <span slot="right" style="color: #fff;">设备编号:EZH209</span>
    </echartLine>

    

    
    <template v-if=" $route.query.type !== 'company' ">
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
    <template v-if=" $route.query.type == 'company' && theIndex == 1">
      <div card>
        <div cell>
          <span>开关量</span>
          <span>1</span>
        </div>
        <div cell>
          <span>A相电流</span>
          <span>23.1m³/分</span>
        </div>
        <div cell>
          <span>B相电流</span>
          <span>--</span>
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
        </div>
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
    }
  },
  methods: {
    handleback() {
      this.$router.back()
    },
    changeTab(index) {
      this.theIndex = index;

      console.log(this.tabs[index])
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
