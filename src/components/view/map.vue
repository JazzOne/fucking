<template>
  <div class="amap">

    <div id="container"></div>
  </div>
</template>

<script>

  export default {
    name: 'amap',
    methods: {
      initMap(){
        //初始化地图对象，加载地图
        var district, map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],//地图中心点
          zoom: 10 //地图显示的缩放级别
        });
        addBeiJing();
        function addBeiJing() {
          //加载行政区划插件
          AMap.service('AMap.DistrictSearch', function() {
            var opts = {
              subdistrict: 1,   //返回下一级行政区
              extensions: 'all',  //返回行政区边界坐标组等具体信息
              level: 'city'  //查询行政级别为 市
            };
            //实例化DistrictSearch
            district = new AMap.DistrictSearch(opts);
            district.setLevel('district');
            //行政区查询
            district.search('荣昌区', function(status, result) {
              console.log(result)
              var bounds = result.districtList[0].boundaries;
              var polygons = [];
              if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                  //生成行政区划polygon
                  var polygon = new AMap.Polygon({
                    map: map,
                    strokeWeight: 1,
                    path: bounds[i],
                    fillOpacity: 0.7,
                    fillColor: '#ffffff',
                    strokeColor: '#000000',
                  });
                  polygons.push(polygon);
                }
                map.setFitView();//地图自适应
              }
            });
          });
        }
      }
    },

    created() {
    },
    mounted() {
      this.initMap();
    }
  }
</script>


