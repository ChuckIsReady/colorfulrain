/**
 * [sputter 函数]
 * 溅射效果的类，实现溅射的弹射效果
 * @变量   params [接受溅射的各种基本参数]
 * 
 */
function sputter(params){
    base(this, LSprite, []);
    var e = this;
    e.px = params.x-250;
    e.py = params.y+0.5*windlevel;
    e.zit = params.zoomInTimes;
    e.fot = params.fadeOutTimes;
    e.aps = params.alphaSpeed;
    e.color = "#888";
    e.lw = 0.5;
    e.w=3;
    e.h=1;
    e.i = 0;   
    sputterLayer.addChild(e); 
}
/**
 * [onframe 函数]
 * 溅射循环事件，实现溅射的弹射效果和删除自身
 * 
 */
sputter.prototype.onframe = function(){
    var e = this;
    e.graphics.clear ();//每次循环时擦除上次的痕迹  
    if(e.i<e.zit-2)
        {
            e.i++;
            e.w*=1.5;
            e.h*=1.3;
            e.graphics.drawEllipse(e.lw,e.color, [e.px-e.w*0.5,e.py-0.5*e.h,e.w,e.h]);
        }
   else if(e.i<e.fot)
        {
            e.i++; 
            e.alpha -=e.aps;
            e.graphics.drawLine(e.lw,e.color, [e.px+0.5*e.i,e.py-0.5*e.i,e.px+3+0.5*e.i,e.py-e.i]);
        }
   else {
        sputterLayer.removeChild(e);//完成溅射效果，从溅射图层删除自身释放内存
    } 
}