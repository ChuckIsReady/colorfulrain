/**
 * [rainCloud 函数]
 * 雨云的基本类
 * @变量   params [接受雨的各种基本参数]
 *
 */
function rainCloud(params){
    继承图层属性
    默认自身能下雨
    读取其他参数
    建立遮罩，制造雨落入水中消失的效果（否则将出现整个图案直接消失）
}
/**
 * [changeangle 函数]
 * 改变雨的下落角度，实现风的显示效果
 * @变量   angle [修改后的角度]
 * 
 */
rainCloud.prototype.changeangle = function(angle){
    将参数中的角度修改
    将参数中的坐标位移值由三角函数重新计算
}
/**
 * [rainnow 函数]
 * 雨云的下雨函数，利用局部变量实例化一个雨滴并将其添加到自己的图层上
 * 
 */
rainCloud.prototype.rainnow = function(){
    新建临时变量
    使用参数建立新雨滴
    将雨滴加入到本雨云图层
}

/**
 * [onframe 函数]
 * 雨云的循环函数，这里实现雨的“切换下雨”以及“雨的大小调节”
 * 
 */
rainCloud.prototype.onframe = function(){
    如果可以下雨
        经过（20-雨的大小）的次数，运行rainnow程序，产生一滴雨   
}