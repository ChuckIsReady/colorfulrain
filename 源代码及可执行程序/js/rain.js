/**
 * [rain 函数]
 * 雨滴的类，被雨云实例化并被显示在雨云的图层中。
 * @变量   params [雨滴的各种参数的数组]
 * 
 */
function rain(params){
    base(this, LSprite, []);
    var e = this;
    e.bitmap = new LBitmap(r[params.rmap]);
    e.rotate = -params.angle;
    //通过算法使有风的情况下也尽量减少不可视区域的雨的计算
    if(windlevel>=0){
        b = 250*windlevel/20
        a = 250-b;
    }
    else 
    {
        b = 250*-windlevel/20;
        a = 250;
    }
    e.x=a+parseInt(Math.random()*(640+b));   
    //使雨从不可见的高空落下
    e.y = -60 ;
    e.red = 0;
    //接收参数
    e.rainheight = params.rainheight;
    e.maxheight = params.maxheight;
    e.xstep = params.xstep;
    e.ystep = params.ystep;
    e.rZIT = params.rZIT;
    e.rFOT = params.rFOT;
    e.rFapS = params.rFapS;
    e.rcl = params.rcl;
    e.disappear = e.maxheight - e.rainheight+4;
    //添加图形到本图层
    e.addChild(e.bitmap);
}
/**
 * [onframe 函数]
 * 雨的循环函数，用于计算什么时候雨滴消失以及实现雨的位移
 */
rain.prototype.onframe = function(){
    var e = this;
    //雨滴移动
    e.x += e.xstep;
    e.y += e.ystep;
    //雨滴移动
    if(e.x < 0   || e.y > e.disappear  ){
        if(!e.red){//产生涟漪或者溅射
            e.red =1;
             if(e.x>569&&e.x<632&&e.y>297-e.rainheight&&e.y<330-e.rainheight){
              var params={x:e.x,y:e.y+e.rainheight-9,zoomInTimes:e.rZIT,fadeOutTimes:e.rFOT,alphaSpeed:e.rFapS};
              var a = new sputter(params); //滴在荷叶上产生溅射
              if(rainlevel<5)sputteringSound();//当雨小于5级时才产生单独的声音，否则会因为过于密集而听不清                
            }
            else{
            var params={x:e.x,y:e.y+e.rainheight-9,zoomInTimes:e.rZIT,fadeOutTimes:e.rFOT,alphaSpeed:e.rFapS,color:e.rcl};
            var a = new ripple(params); //水面上产生涟漪
            if(e.x>390&&e.x<750&&rainlevel<5) raindropSound();//当雨小于5级时才产生单独的声音，否则会因为过于密集而听不清 
           }
            
        }        
        if(e.y > 480) e.parent.removeChild(e);//当雨位置超过屏幕时从父图层移除，释放内存。
    }
}
