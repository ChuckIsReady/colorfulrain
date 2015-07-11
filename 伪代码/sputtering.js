/**
 * [sputter 函数]
 * 溅射效果的类，实现溅射的弹射效果
 * @变量   params [接受溅射的各种基本参数]
 * 
 */
function sputter(params){
    继承图层的属性
    接收参数，并调整溅射产生的位置
    设置溅射的大小参数
    将自身加入到溅射图层
}
/**
 * [onframe 函数]
 * 溅射循环事件，实现溅射的弹射效果和删除自身
 * 
 */
sputter.prototype.onframe = function(){
    刷新自身图层，擦除上次循环的痕迹
    画出一个椭圆
    随着循环次数的变化，调整椭圆的参数
    画出一个斜线
    随着循环次数的变化，调整斜线的参数
    超出循环次数，从溅射图层中移除自身，释放内存
}