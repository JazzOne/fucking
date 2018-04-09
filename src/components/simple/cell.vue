<template>
  <div class="y-cell" card>

      
      <div class="left"  v-if="list.attachmentChild">
          <!-- {{list.attachmentChild[0].attachmentAddress}} -->
          <img v-if="list.attachmentChild[0]" :src="list.attachmentChild[0].attachmentAddress" alt="">
            <img v-else src="http://113.204.228.66:8010/test/static/rc_app/default/D6ACAFBC-9D99-476f-B867-D13C83B43C97.png">
        
      </div>
      <div class="left" v-if="list.attachmentList">
          
          <img v-if="list.attachmentList[0]" :src="list.attachmentList[0].attachmentAddress" alt="">
            <img v-else src="http://113.204.228.66:8010/test/static/rc_app/default/D6ACAFBC-9D99-476f-B867-D13C83B43C97.png">
      </div>
      <div class="right">
          <div>
            <p class="hd">{{list.name}}</p>
            <p class="desc">所属{{type == '1' ? '行业' : '类别'}}：{{list.industryName ? list.industryName : '--'}}</p>
          </div>
          

          <div class="foot">
              <span>设备状态：正常</span>  
              <span class="status" :class="list.state">
                  {{list.state == 'on' ? '在线' : '离线'}}
              </span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'cell',
    props: {
        type: {
            type: String
        },
        list: {
            type: Object
        }
    }
}
</script>

<style scoped>
    .y-cell {
        display: flex;
        justify-content: flex-start;
        padding: 30px 20px;
    }
    .y-cell .left {
        width: 245px;
        height: 180px;
        margin-right: 30px;
    }
    .y-cell .left img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }


    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(100% - 245px);
        height: 180px;
        color: #fff;
    }
    .right .hd { font-size: 30px; margin-bottom: 10px; }
    .right .desc { font-size: 24px; }    
    .right .foot { 
        font-size: 24px; 
        display: flex; 
        justify-content: space-between;
    }
    .foot .status {
        position: relative;
        display: block;
        padding-left: 35px;
    }
    .foot .status::before {
        position: absolute;
        content: '';
        left: 0;
        top: 50%;
        width: 24px;
        height: 24px;
        margin-top: -12px;
        border-radius: 12px;
    }
    .foot .status.on::before {
        background-color: #14e3a1;
    } 
    .foot .status.off::before {
        background-color: #cccccc;
    }
</style>
