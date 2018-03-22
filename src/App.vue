<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html, body, #app{
  height: 100%;
  background: linear-gradient(to bottom,#07456a,#44718b,#07456a);
  font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
</style>
