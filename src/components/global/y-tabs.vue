<template>
  <div class="tabs">
    <div class="tab" 
         :class="{ 'active': index == currentIndex, 'dark': dark }"
         v-for="(item, index) in tabs" 
         :key="index" 
         @click="clickTab(index)">
      {{item.name}}
    </div>
  </div>
</template>
<script>
export default {
  name: "y-tabs",
  props: {
    tabs: Array,
    dark: Boolean
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  watch: {
    tabs() {
      this.currentIndex = 0;
    }
  },
  methods: {
    clickTab(index) {
      this.currentIndex = index;
      this.$emit('change', this.currentIndex)
    }
  }
}
</script>
<style lang="css" scoped>
  .tabs {
    display: flex;
    border: 1px solid rgba(255, 255, 255, .1);
    height: 54px;
    line-height: 54px;
    border-radius: 27px;
  }
  .tabs .tab {
    flex: 1;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  .tabs .tab.active {
    background-color: #fff;
    color: #07456a;
    border-radius: 27px;    
  }
  .tabs .tab.active.dark {
    background: rgba(255, 255, 255, .3);
    color: #fff;
    /* font-size: 30px; */
  }
  .tabs .tab.dark {
    font-size: 26px;
  } 
</style>