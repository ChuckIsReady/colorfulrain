/**
 * [$ 函数]
 * 用于模仿JQ制作一个$选择器用于绑定页面上的元素。
 * @param   id [对应元素的id属性]
 * @return     [抓取到的元素]
 */
var $ = function(id){
    this.id=id;
    if(id.substr(0,1) == "." ){
        return document.querySelectorAll(id);
    }else{
        return document.querySelector(id);
    }
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
    if(rainlevel>5) {
      ra_listen.disabled = true;
      $("#listen-display").style.textDecoration='line-through';
    }
     else {
      ra_listen.disabled = false ;
      $("#listen-display").style.textDecoration='none';
    }
     sld_rainlevel.value = rainlv ;
     rainlevel = rainlv;
      if(!rainlv){
        for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].canrain = 0;
        };
     } 
      else {
        for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].canrain = 1;
        };
     }    
      if(-21<windlv&&windlv<21){
       windlevel = windlv;
       sld_windlevel.value = windlv;
       for (var i = rainLayercount -1 ; i >= 0; i--) {
           rainCloudList[i].changeangle(windlv);
       }; 
     }
      else{
       windlevel = 0;
       for (var i = rainLayercount -1 ; i >= 0; i--) {
           rainCloudList[i].changeangle(0);
       }; 
      }    
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
  mute = this.checked>>0;
}
ra_listen.onchange= function(){
  listen_single = this.checked>>0;
}
sel_bg.value = bgimg;
sel_bg.onchange = function(){
    var val = this.value;
    bgimg = val;
    var imglist = ["net.jpg","day-ripple.gif","day-slience.jpg","night-slience.jpg","night-linghtstrom-active.gif"];
    switch (parseInt(val)){
        case 0:
        changestate(10,0);
            break;
        case 1:
        changestate(0,99);
            break;
        case 2:
        changestate(1,99);
            break;
        case 3:
        changestate(2,99);
            break;
        case 4:
        changestate(20,20);
            break;
    }
    bgbox.style.backgroundImage = "url(./img/"+imglist[val]+")";
}
sld_rainlevel.value = rainlevel;
sld_rainlevel.onchange = function(){
    if(rainlevel>5) {
      ra_listen.disabled = true;
      $("#listen-display").style.textDecoration='line-through';
    }
     else {
      ra_listen.disabled = false ;
      $("#listen-display").style.textDecoration='none';
    }
    rainlevel = this.value;
}
sld_windlevel.value = windlevel;
sld_windlevel.onchange = function(){
    windlevel = this.value;
    for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].changeangle(this.value);
    };
}
rain3.onclick = function(){
    for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].canrain = 0;
    };
    rainCloudList[4].canrain = 1;
}
btn_fps.onclick = function(){
    addChild(new FPS());
    this.disable = "disable";
}
btn_toggle.onclick = function(){
    var p = !rainCloudList[0].canrain; 
    for (var i = rainLayercount -1 ; i >= 0; i--) {
        rainCloudList[i].canrain = p;
    };
    if(p) checkRainAudio();
    else pauseAllRain();
};
btn_color.onclick = function(){
    colorfulrain = !colorfulrain;
    makeColorful();
};