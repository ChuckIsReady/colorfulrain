/**
 * [rain 函数]
 * 雨滴的类，被雨云实例化并被显示在雨云的图层中。
 * @变量   params [雨滴的各种参数的数组]
 * 
 */
function rain(params){
    继承图层类型
    读取对应的雨滴图案
    通过算法使有风的情况下也尽量减少不可视区域的雨
    随机生成自己的位置
    读取其他参数
    显示图案到本图层
}
/**
 * [onframe 函数]
 * 雨的循环函数，用于计算什么时候雨滴消失以及实现雨的位移
 */
rain.prototype.onframe = function(){
    自身位置移动对应的参数
    当雨滴的位置出错或者超过应该消失的位置时
        标记已消失
        产生涟漪或者溅射
    当雨滴位置超过屏幕时将自身从父图层移除，释放内存
}
