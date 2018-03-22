<template>
  <div class="home">
    <y-header>
      <img src="@/assets/logo.png" slot="left" width="30" height="30">
      <y-tabs style="width: 200px;" :tabs="headerTabs" slot="area"></y-tabs>
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
      headerTabs: [{name: '1'}, {name: '1'}, {name: '1'}],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
