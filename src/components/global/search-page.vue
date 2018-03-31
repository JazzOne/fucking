<template>
  <div class="search-page" padding>
      <y-header>
        <img src="@/assets/icon/back-icon.png" class="backbtn" slot="left" width="25" height="25" @click="handleback">
        <span>搜索</span>
        <img src="@/assets/logo.png" slot="right" width="25" height="25">
      </y-header>


      <div class="search">
          <input class="search-input" type="text" placeholder="请输入搜索内容..." v-model="value">
          <img v-if="value" class="search-close" :src="require('@/assets/icon/search-clear.png')" alt="" @click="close">
      </div>
    
      <ul class="searchData" v-if="searchData.length > 0">
        <li v-for="(item, index) in searchData" :key="index" @click="selectSearch(item)" >
            {{item.name}}
        </li>
      </ul> 

  </div>
</template>

<script>
export default {
    name: 'search-page',
    data() {
        return {
            value: '',
            // 后端一次返回所有的搜索结果
            results: [
                {
                    name: '重庆小康有限责任公司',
                }, {
                    name: '重庆中康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }, {
                    name: '重庆康康有限责任公司',
                }
            ],
            // 路由来源路径。选择了搜索项需要跳回来源页面
            pathFrom: '',
        }
    },
    computed: {
        searchData() {
            let search = this.value;
            if(search) {
                return this.results.filter((result) => {
                    return Object.keys(result).some((key) => {
                        return String(result[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.results;
        },
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            // console.log(from.fullPath)
            vm.pathFrom = from.fullPath
        })
    },
    
    methods: {
        // 返回上一页
        handleback() {
            this.$router.back()
        },

        // 清空搜索内容
        close() {
           this.value = ''
        },

        // 选中搜索项
        selectSearch(item) {
            this.value = item.name;
            setTimeout(() => {
            //     // console.log(this.$route.fullPath)
                this.$router.push({
                    path: this.pathFrom,
                    query: {
                        value: this.value
                    }
                })
            }, 1000);
        }
    },
    created() {
    }
}
</script>

<style scoped>
    /* input style reset */
    input {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        border: 0;
        background: transparent;
        color: #fff;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
        /* WebKit browsers */   
        color: #fff;   
    }   
    input:-moz-placeholder, textarea:-moz-placeholder {   
        /* Mozilla Firefox 4 to 18 */   
        color: #fff;   
    }   
    input::-moz-placeholder, textarea::-moz-placeholder {   
        /* Mozilla Firefox 19+ */   
        color: #fff;   
    }   
    input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
        /* Internet Explorer 10+ */   
        color: #fff;   
    }


    .search {
        border: 1px solid rgba(255, 255, 255, .4);
        height: 60px;
        border-radius: 30px;
        margin: 20px 0;
        display: flex;
        align-items: center;
    }

    .search-input {
        width: 85%;
        height: 60px;
        margin-left: 40px;
    }

    .search-close {
        width: 30px;
        height: 30px;
    }

    .searchData {
        padding: 20px 0;
        height: 1000px;
        overflow: scroll;
    }
    .searchData li {
        font-size: 26px;
        color: #fff;
        margin: 30px 0;
        text-align: center;
        padding: 20px 0;
    }
</style>
