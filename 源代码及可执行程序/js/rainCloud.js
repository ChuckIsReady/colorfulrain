/**
 * [rainCloud 函数]
 * 雨云的基本类
 * @变量   params [接受雨的各种基本参数]
 *
 */
function rainCloud(params){
    base(this, LSprite, []);
    var e = this;
    e.canrain = 1;
    e.maxheight = params.maxheight ;  
    e.rainParams = params.rainParams;
    e.changeangle(e.rainParams.angle);
    e.rainlevelcount = 10-rainlevel;
    var maskObj = new LSprite();
    //建立遮罩，制造雨消失的效果
    maskObj.graphics.drawRect(0, "#ff0000", [0, 0, 640, e.maxheight]);
    e.mask = maskObj;
    
}
/**
 * [changeangle 函数]
 * 改变雨的下落角度，实现风的显示效果
 * @变量   angle [修改后的角度]
 * 
 */
rainCloud.prototype.changeangle = function(angle){
     var e = this;
    e.rainParams.angle = angle;
    e.rainParams.xstep = e.rainParams.step*Math.sin(angle * Math.PI / 180);
    e.rainParams.ystep = e.rainParams.step*Math.cos(angle * Math.PI / 180);
}
/**
 * [rainnow 函数]
 * 雨云的下雨函数，利用局部变量实例化一个雨滴并将其添加到自己的图层上
 * 
 */
rainCloud.prototype.rainnow = function(){
    var e = this;
    obj = new rain(e.rainParams);
    e.addChild(obj);
}

/**
 * [onframe 函数]
 * 雨云的循环函数，这里实现雨的“切换下雨”以及“雨的大小调节”
 * 
 */
rainCloud.prototype.onframe = function(){
    var e = this;
       if(e.canrain) 
       {
        if(!e.rainlevelcount--){
            e.rainlevelcount = 20 - rainlevel;
            e.rainnow();
        }
         
       }
              
}