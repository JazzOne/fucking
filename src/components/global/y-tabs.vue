<template>
  <div class="tabs">
    <div class="tab" v-for="(item, index) in tabs" :key="index">
      {{item.name}}
    </div>
  </div>
</template>
<script>
export default {
  name: "y-tabs",
  props: {
    tabs: Array
  },
  data () {
    return {
    };
  }
}
</script>
<style lang="css" scoped>
  .tabs {
    display: flex;
    border: 1px solid rgba(255, 255, 255, .1)
  }
  .tabs .tab {
    flex: 1;
  }
</style>