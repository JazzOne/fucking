<template>
  <div class="amap">
    <div class="chart-title" id="demo">
        <div>
            <img src="@/assets/icon/time-icon.png" style="vertical-align: middle; " width="12" height="12" /> 
            <span style="vertical-align: middle;">24小时监测</span>   
        </div>
        <div class="map-legend">
            <span> <img src="@/assets/icon/dabiao.png"> 达标 </span>
            <span> <img src="@/assets/icon/chaobiao.png"> 超标 </span>      
        </div>
    </div>
    <div id="map-container" style="width: 100%; height: 60vw"></div>
  </div>
</template>

<script>

export default {
    name: 'amap',
    methods: {
        initMap() {
            let map = new AMap.Map('map-container', {
                // resizeEnable: true,
                // zoom: 11,
                // // center: [116.397428, 39.90923]
                // center: [105.646647,29.489524]
                resizeEnable: true,
                zoom: 10,
                center:  [105.646647, 29.489524]
            });

            var lnglats=[ //也可以使用LngLat对象
                [105.644116,29.481391],
                
                // [116.382122,39.921176],
                // [116.387271,39.922501],
                // [116.398258,39.914600]
            ];

            var infoWindow = new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(0, -40)//-113, -140
            });

            var content = [];
                content.push('<span style="font-weight: 200;">万灵镇断面</span>');
                content.push('<span style="color: #ff4799">COD: 75(60)</span>');   
                
            for(var i = 0, marker; i < lnglats.length; i++){
                marker = new AMap.Marker({
                    position: lnglats[i],
                    map,
                });

                marker.content = content.join('<br/>');
                //给Marker绑定单击事件
                marker.on('click', markerClick);
            }
            map.setFitView();

            function markerClick(e){
                console.log(e.target)
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
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

<style>
    

    .amap .chart-title {
        display: flex;
        justify-content: space-between;
        padding: 0 27px;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        font-size: 26px;
        color: #ccc;
        padding: 0 27px;
    }
    .map-legend { 
        display: flex; 
        align-items: center;
    }
    .map-legend > span { padding: 0 10px; }
    .map-legend img{
        width: 24px;
        height: 28px;
        margin-right: 5px;
    }


    /* 高德信息窗口 */
    .amap-info-contentContainer {
        padding: 10px 12px;
        background-color: #fff;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
    };
</style>
