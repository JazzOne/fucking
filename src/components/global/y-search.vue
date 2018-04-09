<template>
  <div class="y-search">
      <div class="search" @click="toSearchPage">
          <span class="search-icon">
              <img :src="require('@/assets/icon/search-icon.png')" alt="">
          </span>
          <input type="text" class="search-input" disabled placeholder="输入搜索内容" :value="value" @input="upDateVal($event.target.value)" >
      </div>
      <div class="filter-btn" @click="clickFilter">
          筛选
      </div>
  </div>
</template>

<script>
export default {
    name: 'y-search',
    props: {
        value: String
    },
    methods: {
        toSearchPage() {
            this.$router.push({
                path: '/search'
            })
        },
        upDateVal(val) {
            this.$emit('input', val)
            console.log(val)
        },

        // emit筛选
        clickFilter() {
            this.$emit('filter')
        }
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

    .y-search {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
    }


    .search {
        width: 540px;
        height: 60px;
        border-radius: 30px;
        border: 1px solid #fff;
        font-size: 0;
    }
    .search-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        vertical-align: top;
        /* margin-right: 20px;
        margin-left: 25px; */
    }
    .search-icon img {
        display: block;
        width: 30px;
        height: 30px;
        margin: 15px auto;
    }
    .search-input {
        display: inline-block;
        width: 430px;
        height: 40px;
        padding: 10px 0;
        vertical-align: top;
        
    }
    .filter-btn {
        width: 150px;
        height: 60px;
        line-height: 60px;
        border-radius: 30px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        background: rgba(255, 255, 255, .1);
    }
</style>
