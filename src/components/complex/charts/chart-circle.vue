<template>
  <div class="chart-circle" ref="container" >
      <div class="lengend">
        <p>
            剩余天数：{{rest}}天
        </p>
        <p>
            目标天数：{{target}}天
        </p>
      </div>
      <canvas class="canvas" width="300" height="200" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
    name: 'chart-circle',
    props: ['good', 'target', 'rest'],
    
    mounted() {
        

        let total = 365,
            small = (this.target/total *100).toFixed(0),
            big = (this.rest/total *100).toFixed(0);
        
        this.drawCircle(small, big)
        // this.drawMain(tshis.$refs.canvas, 80, "#85d824", "#eef7e4")
    },
    methods: {
        drawCircle(small, big) {

            let canvas = this.$refs.canvas;
            let context = canvas.getContext("2d"); 
            var rad = Math.PI*1.5/100;
            
            var circle = {
                x : canvas.width/2,    //圆心的x轴坐标值
                y : canvas.height/2,    //圆心的y轴坐标值
                r : 50      //圆的半径
            };

            // 内环
            
            // 背景条
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 10;
            context.lineCap = "round";
            context.arc(circle.x, circle.y, circle.r, Math.PI * 1.5, Math.PI, false);
            context.stroke();

            // 进度条
            context.beginPath();
            context.strokeStyle = "#fc9413";
            context.lineWidth = 10;
            context.lineCap = "round";
            // context.arc(circle.x, circle.y, circle.r, Math.PI * 1.5, Math.PI, false);
            
            context.arc(circle.x, circle.y, circle.r, -Math.PI/2, -Math.PI/2 + small*rad, false); 
            context.stroke();

            

            // 外环
            circle.r = 75
            context.beginPath();
            context.strokeStyle = "#fff";
            context.lineWidth = 10;
            
            context.arc(circle.x, circle.y, circle.r, Math.PI * 1.5, Math.PI, false);
            context.stroke();


            circle.r = 75
            context.beginPath();
            context.strokeStyle = "#7b97ff";
            context.lineWidth = 10;
            
            context.arc(circle.x, circle.y, circle.r, -Math.PI/2, -Math.PI/2 + big*rad, false);
            context.stroke();

            // 中心文字
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
            context.fillStyle = '#fff';  
            var font_size = 25;  
            context.font = font_size + "px Helvetica";  
            var text_width = context.measureText(this.good).width;  
            // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
            context.fillText(this.good, circle.x-text_width/2, circle.y + font_size/2 - 10)
            context.stroke();  

            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
            context.fillStyle = '#fff';  
            var font_size = 14;  
            context.font = font_size + "px Helvetica";  
            var text_width = context.measureText('优良天数').width;
            // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
            context.fillText('优良天数', circle.x-text_width/2, circle.y + font_size/2 + 20)
            context.stroke();  

            
        },
        drawMain(drawing_elem, percent, forecolor, bgcolor) {  
            /* 
                @drawing_elem: 绘制对象 
                @percent：绘制圆环百分比, 范围[0, 100] 
                @forecolor: 绘制圆环的前景色，颜色代码 
                @bgcolor: 绘制圆环的背景色，颜色代码 
            */  
            var context = drawing_elem.getContext("2d");  
            var center_x = drawing_elem.width / 2;  
            var center_y = drawing_elem.height / 2;  
            var rad = Math.PI*1.5/100;   
            var speed = 0;  
            
            // 绘制背景圆圈  
            function backgroundCircle(radius){  
                context.save();  
                context.beginPath();  
                context.lineWidth = 8; //设置线宽  
                // var radius = 70  
                context.lineCap = "round";  
                context.strokeStyle = bgcolor;  
                context.arc(center_x, center_y, radius, Math.PI * 1.5, Math.PI, false);  
                context.stroke();  
                context.closePath();  
                context.restore();  
            }  
        
            //绘制运动圆环  
            function foregroundCircle(n, radius){  
                context.save();  
                context.strokeStyle = forecolor;  
                context.lineWidth = 8;  
                context.lineCap = "round";  
                // var radius = 70;  
                context.beginPath();  
                //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.arc(center_x, center_y, radius , -Math.PI/2, -Math.PI/2 +n*rad, false);   
                context.stroke();  
                context.closePath();  
                context.restore();  
            }  
        
            //绘制文字  
            function text(n){  
                context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
                context.fillStyle = forecolor;  
                var font_size = 13;  
                context.font = font_size + "px Helvetica";  
                var text_width = context.measureText('优良天数').width;  
                // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
                context.fillText('优良天数', center_x-text_width/2, center_y + font_size/2);
                context.restore();  
            }  


            //执行动画  
            (function drawFrame(){  
                window.requestAnimationFrame(drawFrame);  
                context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);  // 改善圆的清晰度

                text(speed);
                backgroundCircle(70); 
                foregroundCircle(speed, 70);
                            
                if(speed >= percent) return;  
                speed += 1;  
            }()); 


        },
    }
}
</script>

<style scoped>
    .canvas {
        display: block;
        margin: 0 auto;
    }


    .chart-circle {
        position: relative;
    }
    .lengend {
        position: absolute;
        top: 16px;
        left: 100px;
        font-size: 24px;
        color: #fff;
    }
    .lengend p {
        margin: 20px 0;
    }
</style>
