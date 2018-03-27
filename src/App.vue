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
@import './assets/global.css';
* {
  padding: 0;
  margin: 0;
}
html, body, #app{
  height: 100%;
  background: url('./assets/background.png')center center no-repeat;
  /* background: linear-gradient(to bottom,#07456a,#44718b,#07456a); */
  font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
a { text-decoration: none; color: #fff; }
ul, ol, li { list-style: none; }

[cell] {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    font-size: 26px;
    color: #fff;
}


.backbtn {
  transform: rotate(180deg);
}
</style>
