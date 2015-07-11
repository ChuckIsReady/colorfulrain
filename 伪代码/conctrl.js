/**
 * [$ 函数]
 * 用于模仿JQ制作一个$选择器用于绑定页面上的元素。
 * @param   id [对应元素的id属性]
 * @return     [抓取到的元素]
 */
var $ = function(id){
  如果id的第一个字符是.
  使用js获取class元素集的方法
  否则使用js获取id元素的方法
};
/**
 * [changestate 函数]
 * 用于修改雨和风大小
 * @param   rainlv [需要修改的雨的大小]
 * @param   windlv [需修改的风的大小]
 * 
 */
function changestate(rainlv,windlv)
{
    如果雨设置的大小超过5级，禁用监听雨滴的选项
      否则开启监听雨滴的选项
      将雨的等级设置为参数规定等级
      将拖拽条置为对应值
      将风的等级设置为参数规定等级
      将拖拽条置为对应值
     
}

/**
 * 以下为各个控件变量的声明与绑定页面元素
 * 各变量详细介绍见下面的控件操作函数
 */
var btn_toggle = $("#rainctrl");
var btn_color = $("#colorctrl");
var btn_rain3 = $("#rain3");
var btn_fps = $("#fps");
var sld_rainlevel = $("#rainlevelslider");
var val_rainlevel = $("#rain-level-disply");
var sld_windlevel = $("#windlevelslider");
var val_windlevel = $("#wind-level-disply");
var sel_bg = $("#bg-select");
var bgbox = $("#bgbox");
var ra_mute = $("#mute");
var ra_listen = $("#listen-single");

/**
 * 以下为页面控件的操作函数
 * 
 * 以ra_开头的为radio单选控件“静音”及“监听雨滴”（实际上使用的是多选框控件）
 * 以sel_开头的为select下拉选择框，选择背景
 * 以sld_开头的为slider拖动条控件，选择风和雨的大小
 * 以btn_开头的为button按钮控件“只显示第三层雨”“显示FPS”“切换雨颜色”“切换下雨”
 * 
 */
ra_mute.onchange= function(){
  将全局变量mute改为选项值
}
ra_listen.onchange= function(){
  将全局变量listensingle改为选项值
}
将背景设置下拉条显示为对应值
sel_bg.onchange = function(){
  将背景设置下拉条显示为对应值
  根据全局变量imglist的值选择对应背景图片
  调用changestate改变雨和风的大小
}
将雨的等级设置显示为对应值
sld_rainlevel.onchange = function(){
 如果雨设置的大小超过5级，禁用监听雨滴的选项
      否则开启监听雨滴的选项
   将全局变量rainlevel设为设置值
   将雨的等级设置显示为对应值
}
将风的等级设置显示为对应值
sld_windlevel.onchange = function(){
     将全局变量windlevel设为设置值
     改变风的大小
}
rain3.onclick = function(){
    循环所有雨云
      全部置canrain属性为0
      将3号雨云canrain设为1
}
btn_fps.onclick = function(){
    显示FPS模块
    将按钮禁用
}
btn_toggle.onclick = function(){
    令临时变量p为0号雨云的canrain值的相反值
    循环所有雨云
      将雨云canrain设为p
};
btn_color.onclick = function(){
    将全局变量colorfulrain取反
    运行makeColorful();
};