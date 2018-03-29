<template>
  <div class="list" padding>
      <y-header>
        <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
        <span>{{$route.query.name}}<span style="font-size: 3.4667vw;">(52在线)</span></span>
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
      </y-header>
    
      <div class="list-container">
        <cell v-for="n in 10" :key="n" @click.native="goDetail(n)"></cell>
      </div>
      
  </div>
</template>

<script>
import cell from '@/components/simple/cell';
export default {
    name: 'list',
    components: {
        cell
    },
    data() {
        return {

        }
    },
    methods: {
        handleback() {
            this.$router.push('/')
        },
        goDetail(id) {
            let type = this.$route.params.type,
                detail_id = id;
            this.$router.push(`/list/${type}/detail/${detail_id}`)
        }
    },
    created() {
        // console.log(this.$route.query.name)
    }
}
</script>

<style scoped>
    .list-container {
        height: 1200px;
        overflow: scroll;
    }
</style>
