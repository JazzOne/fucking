<template>
  <div class="chart-circle" ref="container">
      <canvas class="canvas" width="300" height="250" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
    name: 'chart-circle',
    mounted() {
        this.drawCircle()
        // this.drawMain(this.$refs.canvas, 80, "#85d824", "#eef7e4")
    },
    methods: {
        drawCircle() {

            let canvas = this.$refs.canvas;
            let context = canvas.getContext("2d"); 
            
            var circle = {
                x : canvas.width/2,    //圆心的x轴坐标值
                y : canvas.height/2,    //圆心的y轴坐标值
                r : 70      //圆的半径
            };

            // 内环
            context.beginPath();
            context.strokeStyle = "blue";
            context.lineWidth = 10;
            context.lineCap = "round";
            
            context.arc(circle.x, circle.y, circle.r, Math.PI * 1.5, Math.PI, false);
            context.stroke();

            // 外环
            circle.r = 100
            context.beginPath();
            context.strokeStyle = "blue";
            context.lineWidth = 10;
            
            context.arc(circle.x, circle.y, circle.r, Math.PI * 1.5, Math.PI, false);
            context.stroke();

            // 中心文字
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
            context.fillStyle = '#fff';  
            var font_size = 26;  
            context.font = font_size + "px Helvetica";  
            var text_width = context.measureText('14').width;  
            // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
            context.fillText('14', circle.x-text_width/2, circle.y + font_size/2 - 10)
            context.stroke();  

            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
            context.fillStyle = '#fff';  
            var font_size = 16;  
            context.font = font_size + "px Helvetica";  
            var text_width = context.measureText('优良天数').width;  
            // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
            context.fillText('优良天数', circle.x-text_width/2, circle.y + font_size/2 + 20)
            context.stroke();  
            
        },
        // drawMain(drawing_elem, percent, forecolor, bgcolor) {  
        //     /* 
        //         @drawing_elem: 绘制对象 
        //         @percent：绘制圆环百分比, 范围[0, 100] 
        //         @forecolor: 绘制圆环的前景色，颜色代码 
        //         @bgcolor: 绘制圆环的背景色，颜色代码 
        //     */  
        //     var context = drawing_elem.getContext("2d");  
        //     var center_x = drawing_elem.width / 2;  
        //     var center_y = drawing_elem.height / 2;  
        //     var rad = Math.PI*1.5/100;   
        //     var speed = 0;  
            
        //     // 绘制背景圆圈  
        //     function backgroundCircle(radius){  
        //         context.save();  
        //         context.beginPath();  
        //         context.lineWidth = 8; //设置线宽  
        //         // var radius = 70  
        //         context.lineCap = "round";  
        //         context.strokeStyle = bgcolor;  
        //         context.arc(center_x, center_y, radius, Math.PI * 1.5, Math.PI, false);  
        //         context.stroke();  
        //         context.closePath();  
        //         context.restore();  
        //     }  
        
        //     //绘制运动圆环  
        //     function foregroundCircle(n, radius){  
        //         context.save();  
        //         context.strokeStyle = forecolor;  
        //         context.lineWidth = 8;  
        //         context.lineCap = "round";  
        //         // var radius = 70;  
        //         context.beginPath();  
        //         //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        //         context.arc(center_x, center_y, radius , -Math.PI/2, -Math.PI/2 +n*rad, false);   
        //         context.stroke();  
        //         context.closePath();  
        //         context.restore();  
        //     }  
        
        //     //绘制文字  
        //     function text(n){  
        //         context.save(); //save和restore可以保证样式属性只运用于该段canvas元素  
        //         context.fillStyle = forecolor;  
        //         var font_size = 13;  
        //         context.font = font_size + "px Helvetica";  
        //         var text_width = context.measureText('优良天数').width;  
        //         // context.fillText(n.toFixed(0)+"%", center_x-text_width/2, center_y + font_size/2);  
        //         context.fillText('优良天数', center_x-text_width/2, center_y + font_size/2)
        //         context.restore();  
        //     }  
        
        //     //执行动画  
        //     (function drawFrame(){  
        //         window.requestAnimationFrame(drawFrame);  
        //         context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);  
        //         backgroundCircle(70);  
        //         text(speed);  
        //         foregroundCircle(speed, 70);  
        //         if(speed >= percent) return;  
        //         speed += 1;  
        //     }()); 
            
        //     (function drawFrame(){  
        //         window.requestAnimationFrame(drawFrame);  
        //         context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);  
        //         backgroundCircle(100);  
        //         text(speed);  
        //         foregroundCircle(speed, 100);  
        //         if(speed >= percent) return;  
        //         speed += 1;  
        //     }()); 
             
        // },
    }
}
</script>

<style scoped>
    .canvas {
        display: block;
        margin: 0 auto;
    }
</style>
