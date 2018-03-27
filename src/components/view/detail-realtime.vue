<template>
  <div class="detail-realtime" padding>
    <y-header>
      <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
      <span>实时数据</span>
      <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

    <echartLine card>
      <span slot="left" style="color: #fff;">COD 3月24日</span>
      <span slot="right" style="color: #fff;">设备编号:EZH209</span>
    </echartLine>

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

  </div>
</template>

<script>
import echartLine from '@/components/complex/charts/echart-line'
export default {
  name: 'realtime',
  components: {
    echartLine
  },
  methods: {
    handleback() {
      this.$router.back()
    },
  }
}
</script>

<style scoped>

</style>
