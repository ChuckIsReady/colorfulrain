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
 新建一个对象
 循环对象的所有值，赋值给新对象
 返回复制好的对象
}
/**
 * [main 函数]
 * 主函数，用于加载所有资源，显示进度，并在加载完成后显示画面
 * 
 */
function main(){ 
    新建一个载入图层
    将其添加到底图层上
    载入资源，显示加载进度，加载完成运行allInit函数
} 
/**
 * [makeColorful 函数]
 * 转换雨的颜色，并根据全局变量colorfulrain的值确定是否生成彩色雨的素材
 * 
 */
function makeColorful(){
新建一个图层
循环在图层中画出七种长短不一的雨滴形状，
由全局变量colorfulrain决定是否用colorlist数组中的颜色来画出彩色雨滴
将画好的图案克隆到数组r中
}   

/**
 * [allInit 函数]
 * 程序初始化
 * @变量   result [载入背景]
 * 
 */
function allInit(result){ 
    释放载入图层的空间
    初始化背景图层、雨图层、涟漪图层、溅射图层，加入底图层
    对涟漪图层、溅射图层加上遮罩，只允许指定区域出现特效
    建立雨类型的对象，存储各层雨的样式，涟漪样式
    将场景设置为2号画面，切换声音，停止下雨
}
/**
 * [onframe 函数]
 * 程序会不断重复运行的程序，在这里加入每个图层需要重复运行的函数
 * 
 */
function onframe(){
    对每个雨云对象循环
        运行每个雨云对象上附加的雨滴的循环事件
    运行每个涟漪对象的循环事件
    运行每个溅射对象的循环事件
}
