<template>
  <div class="gis" padding>
    <y-header>
        <img src="@/assets/icon/back-icon.png" 
             class="backbtn" 
             width="25" 
             height="25" 
             slot="left" 
             @click="routerBack">
        <span>{{$route.name}}</span>
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
    </y-header>

  </div>

</template>

<script>
import yHeader from '@/components/global/y-header'
export default {
    name: 'gis',
    components: {
        yHeader
    },
    methods: {
        routerBack() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>

</style>
