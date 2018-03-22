<template>
  <div class="home">
    <y-header>
      <img src="@/assets/logo.png" slot="left" width="30" height="30">
      <y-tabs style="width: 200px;" :tabs="headerTabs" slot="area" @change="changeMain"></y-tabs>
      <!--<div slot="area" style="width: 200px; height: 30px; background: #000">hahahah</div>-->
    </y-header>
  </div>
</template>

<script>
import yTabs from '@/components/global/y-tabs';
export default {
  name: 'home',
  components: {
    yTabs
  },
  data () {
    return {
      headerTabs: [{name: '空气监测'}, {name: '水质监测'}],
    }
  },
  methods: {
    changeMain(index) {
      console.log(this.headerTabs[index].name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
