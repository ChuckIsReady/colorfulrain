/**
 * [ripple 函数]
 * 涟漪的类
 * @变量   params [接受涟漪的各种基本参数]
 * 
 */
function ripple(params){
    base(this, LSprite, []);
    var e = this;
    e.px = params.x-250+0.5*windlevel;
    e.py = params.y ;
    e.zit = params.zoomInTimes;
    e.fot = params.fadeOutTimes;
    e.aps = params.alphaSpeed;
    e.color = "#"+params.color;
    e.lw = 0.5;
    e.w=3;
    e.h=1;
    e.i = 0;   
    rippleLayer.addChild(e); 
}

/**
 * [onframe 函数]
 * 涟漪循环事件，根据参数实现涟漪的扩大及渐隐
 * 
 */
ripple.prototype.onframe = function(){
    var e = this;
    e.graphics.clear ();
    e.graphics.drawEllipse(e.lw,e.color, [e.px-e.w*0.5,e.py-0.5*e.h,e.w,e.h]);
    if(e.i<e.zit)
        {e.i++;e.w*=1.5;e.h*=1.3;}
   else if(e.i<e.fot)
        {e.i++; e.alpha -=e.aps;}
   else {
        rippleLayer.removeChild(e);
    } 
}