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
#app {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.backbtn {
  transform: rotate(180deg);
}



/* 弹窗内部容器 */
[pop-container] {
  background-color: #fff;
  width: 90%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px;
}
[pop-container] [pop-header] {
  text-align: center;
  font-size: 30px;
  padding: 0 0 20px 0;
  color: #333333;
}
[pop-container] [pop-content] {
  height: 600px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;  
}
[pop-container] [pop-content] .title {
  color: #07456a;
  background-color: #f8f8f8;
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  border-radius: 30px;
  padding: 3px 30px;
}
[pop-container] [pop-content] .content {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 15px;
  font-size: 30px;
}
[pop-content] .content span {
  margin: 10px 15px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  padding: 5px 25px;
  border-radius: 5px;
  color: #999999;
}

[pop-container] [pop-footer] {
  padding: 15px 0;
}
[pop-container] [pop-footer] .submit-btn {
  display: block;
  border-radius: 10px;
  height: 72px;
  line-height: 72px;
  width: 600px;
  background-color: #07456a;
  color: #fff;
  text-align: center;
  margin: 0 auto;
}

</style>
