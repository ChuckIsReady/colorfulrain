/**
 * 本文件为主函数文件，用于储存大部分变量的值，以及整个程序初始化的情况
 */

var backLayer,rainLayer,rippleLayer,rippleLayer,sputterLayer;//图层声明
var r = {};//雨滴样式存储的对象
var rainlevel = 0;//雨的大小
var windlevel = 0;//风的大小
var bgimg = 1;//背景图的序号
var rainLayercount = 16;//雨云的层数
var canrain = 0;//是否允许下雨
//彩色雨的雨颜色数组
var colorlist = ["#fffe6d1","#2ecc71","#9b59b6","#f1c40f","#e67e22","#e74c3c","#ecf0f1"];
var colorfulrain = 0;//是否下彩色雨
//canvas背景图片。这里选择一张透明的图片以便显示下面元素的图片.
//也就是说实际上背景不是用canvas绘制的，这样可以节省canvas需要运算的内容
//并减少代码量和修图数量（canvas实现动态图片需要手动将每帧画面平铺）
var loadData = [
{name:"background",path:"./img/blank.png"}
];
var rainCloudTypeList = [];//雨云存储数组
/**
 * [cloneObj 函数]
 * 对象克隆函数，克隆对象及其所有属性与方法
 * @变量   obj [需克隆的对象]
 * @return      [克隆的新对象]
 */
var cloneObj = function(obj){
    var newO = {};
for(var key in obj){
    var val =   obj[key];
    newO[key]= typeof val ==='object'?arguments.callee(val):val;
}
return newO;
}
/**
 * [main 函数]
 * 主函数，用于加载所有资源，显示进度，并在加载完成后显示画面
 * 
 */
function main(){ 
    loadingLayer = new LoadingSample1(); 
    addChild(loadingLayer); 
    LLoadManage.load( 
        loadData, 
        function(progress){ 
            loadingLayer.setProgress(progress); 
        }, 
        allInit 
    ); 
} 
/**
 * [makeColorful 函数]
 * 转换雨的颜色，并根据全局变量colorfulrain的值确定是否生成彩色雨的素材
 * 
 */
function makeColorful(){
var rainbit = new  LSprite();
for (var i = 0; i < 8; i++) {
    rainbit.graphics.clear();
    if(colorfulrain)
    rainbit.graphics.drawLine(0.6-(i*0.04), colorlist[i], [0,0, 0, 60-(i*7)]);
    else 
    rainbit.graphics.drawLine(0.7-(i*0.04), "#fff", [0,0, 0, 60-(i*7)]);            
    r[i] = new LBitmapData(null, 0, 0, 1, 60);
    r[i].draw(rainbit);
    }
}   

/**
 * [allInit 函数]
 * 程序初始化
 * @变量   result [载入背景]
 * 
 */
function allInit(result){ 
    datalist = result; 
    removeChild(loadingLayer); 
    loadingLayer = null; 
    //加载完成，释放载入图层的空间，开始进行其他处理
    var bitmapData = new LBitmapData(datalist["background"]);
    var bitmap = new LBitmap(bitmapData);
    backLayer = new LSprite();
    addChild(backLayer); 
    backLayer.addChild(bitmap);
    //初始化背景
    rainLayer = new LSprite();
    addChild(rainLayer);
    //初始化雨图层
    rippleLayer = new LSprite();
    addChild(rippleLayer);
    //建立并保存雨的图案
    var maskObj = new LSprite();
    //建立遮罩，制造水面的效果
    maskObj.graphics.drawVertices(0, "#000",[[156,259],[213,289],[143,319],[256,412],[272,405],[310,423],[328,418],[567,281],[270,249],[329,297],[382,297],[382,330],[348,330],[348,324],[320,324],[329,297],[270,249]]);
    rippleLayer.mask = maskObj;
    makeColorful();
    //建立溅射层，用于制作荷叶上水滴溅射效果
    sputterLayer = new LSprite();
    var maskObj = new LSprite();
    //建立遮罩，控制溅射的效果的范围
    maskObj.graphics.drawVertices(0, "#f2f",[[319,297],[382,297],[382,330],[319,330]]);
    sputterLayer.mask = maskObj;
    addChild(sputterLayer);


    //建立雨云层    
     rainCloudTypeList.rainparams= [
    {rainheight:60, maxheight:480, angle:0, step:15, rZIT:5, rFOT:13, rFapS:0.1, rmap:1, rcl:888},
    {rainheight:53, maxheight:433, angle:0, step:13, rZIT:5, rFOT:13, rFapS:0.1, rmap:2, rcl:888}, 
    //下面这层开始产生涟漪
    {rainheight:46, maxheight:392, angle:0, step:11, rZIT:6, rFOT:13, rFapS:0.1, rmap:3, rcl:'fff'},
    {rainheight:43, maxheight:362, angle:0, step:9, rZIT:5, rFOT:13, rFapS:0.1, rmap:4, rcl:'bbb'},
    {rainheight:32, maxheight:320, angle:0, step:7, rZIT:5, rFOT:13, rFapS:0.1, rmap:5, rcl:'999'},
    {rainheight:25, maxheight:293, angle:0, step:6, rZIT:4, rFOT:13, rFapS:0.1, rmap:6, rcl:888},
    {rainheight:18, maxheight:261, angle:0, step:5, rZIT:3, rFOT:13, rFapS:0.1, rmap:7, rcl:666},
    //下面为附加的斜雨
    {rainheight:60, maxheight:480, angle:5, step:15, rZIT:5, rFOT:13, rFapS:0.1, rmap:1, rcl:888},
    {rainheight:53, maxheight:433, angle:-5, step:13, rZIT:5, rFOT:13, rFapS:0.1, rmap:2, rcl:888},
    //以下为附加的多层雨，解决涟漪过于集中的问题
    {rainheight:46, maxheight:372, angle:0, step:11, rZIT:6, rFOT:13, rFapS:0.1, rmap:3, rcl:'ccc'},
    {rainheight:43, maxheight:348, angle:0, step:9, rZIT:5, rFOT:13, rFapS:0.1, rmap:4, rcl:'888'},
    {rainheight:43, maxheight:330, angle:0, step:9, rZIT:5, rFOT:13, rFapS:0.1, rmap:4, rcl:'888'},
    {rainheight:32, maxheight:305, angle:0, step:7, rZIT:5, rFOT:13, rFapS:0.1, rmap:5, rcl:'888'},
    {rainheight:25, maxheight:278, angle:0, step:6, rZIT:4, rFOT:13, rFapS:0.1, rmap:6, rcl:888},
    {rainheight:25, maxheight:283, angle:0, step:6, rZIT:4, rFOT:13, rFapS:0.1, rmap:6, rcl:'888'},
    {rainheight:18, maxheight:258, angle:0, step:5, rZIT:3, rFOT:13, rFapS:0.1, rmap:7, rcl:666},
    {rainheight:18, maxheight:271, angle:0, step:5, rZIT:3, rFOT:13, rFapS:0.1, rmap:7, rcl:'666'}
    ];
    rainCloudTypeList.maxheight=[480,433,392,362,320,293,261,480];
    rainCloudList = {};
    for (var i = 0; i < rainLayercount; i++) {
        var params = {};
        params.maxheight = rainCloudTypeList.maxheight[i];
        params.rainParams = rainCloudTypeList.rainparams[i];
        rainCloudList[i] = new rainCloud(params);
        rainCloudList[i].width = 1140;
        rainCloudList[i].x = -250; 
        rainLayer.addChild(rainCloudList[i]);
    };
    rainLayer.addEventListener(LEvent.ENTER_FRAME,onframe);  
    //显示第2个白天场景，将对应参数设置好  
    changestate(0,99);
    for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].canrain = 1;
    };
    pauseAllRain();
}
/**
 * [onframe 函数]
 * 程序会不断重复运行的程序，在这里加入每个图层需要重复运行的函数
 * 
 */
function onframe(){
    for (var j = 0; j < rainLayercount; j++) {
       rainCloudList[j].onframe();
       for(var i = rainCloudList[j].childList.length - 1; i >= 0; i--){
            rainCloudList[j].childList[i].onframe();
       }
    };
    for (var i = rippleLayer.childList.length - 1; i >= 0; i--) {
        rippleLayer.childList[i].onframe();
    };
    for (var i = sputterLayer.childList.length - 1; i >= 0; i--) {
        sputterLayer.childList[i].onframe();
    };
}
