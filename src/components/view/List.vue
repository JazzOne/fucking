<template>
  <div class="list" padding>
      <y-header>
        <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
        <span>{{title}}<span style="font-size: 3.4667vw;">({{lists.length}}在线)</span></span>
        <img src="@/assets/logo.png" slot="right"  style="width: 10.6667vw">
      </y-header>

      <y-search @filter="filterShow = true"></y-search>

      <div class="list-container">
        <cell v-for="(item, index) in lists"
              :key="index"
              :list="item"
              :type="$route.query.name"
              @click.native="goDetail(item)"></cell>
      </div>

      <!-- 筛选弹框 -->
      <y-popup v-model="filterShow" :center="false">
          <div pop-container padding>
            <div pop-header>筛选条件</div>
            <div pop-content>
                <div v-for="(filter, index) in filters" :key="index">
                    <div class="title">{{filter.title}}</div>
                    <div class="content">
                        <span v-for="(list, index) in filter.list"
                              :key="index"
                              @click="clickFilter(index)">{{list.text}}</span>
                    </div>
                </div>
            </div>
            <div pop-footer> <span class="submit-btn">确认</span> </div>
          </div>
      </y-popup>

  </div>
</template>

<script>
import cell from '@/components/simple/cell';
import ySearch from '@/components/global/y-search';
import yPopup from '@/components/global/y-popup';

export default {
    name: 'list',
    components: {
        cell,
        ySearch,
        yPopup
    },
    data() {
        return {
            filterShow: false,
            filters: [
                {title: '在线状态', list: [{text: '在线'}, {text: '离线'}]},
                {title: '监测监控', list: [{text: '在线监测'}, {text: '物联监控'}]},
                {title: '行业类别', list: [{text: '国控站'}, {text: '市控站'}, {text: 'B射线扬尘站'}, {text:'808微型站'}, {text:'804微型站'}, {text:'801微型站'} ]},
            ],
            // 企业列表
            lists: [],
        }
    },
    computed: {
        title() {
            switch(this.$route.query.name) {
                case "2":
                    return '水质站'
                break;
                case "1":
                    return '污染企业'
                break;
            }
        }
    },
    methods: {
        // 路由跳转
        handleback() {
            this.$router.push('/')
        },
        goDetail(item) {
            let type = this.$route.query.name,
                detail_id = item.id;
            if(type == 3){
              detail_id = item.baseEnterpriseId;
            }
            localStorage.setItem('id',detail_id)
            this.$router.push(`/list/${type}/detail/${detail_id}`)
        },

        // 获取企业列表
        getList() {
            var type = this.$route.query.name;
            this.$service.getEnterpiseList(type).then(res => {
                // 当前企业列表
                this.lists = res.data;
            })
        },
      // 获取空气站列表
        getAtmosphereList() {
          let url = this.url
          this.$http.get(url+'/GIS/air/details',{ params:{}})
          .then(res => {
            this.lists = res.data.data;
          })
        },
        clickFilter(index) {
            this.currentIndex = index;
        }
    },
    created() {
        // console.log(this.$route.query.name)
      if(this.$route.query.name == 3){
        this.getAtmosphereList()
      }else {
        this.getList()
      }
    }
}
</script>

<style scoped>
    .list-container {
        height: 1100px;
        overflow: scroll;
    }

</style>
