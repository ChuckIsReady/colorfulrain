/**
 * 本文件为声音控制文件，实现音效与程序的绑定
 * 
 */
//绑定变量与页面的audio控件对应的音频文件。
var s_day_ripple = $("#s-day-ripple");
var s_day_ripple_bird = $("#s-day-ripple-bird");
var s_night_slience = $("#s-night-slience");
var s_night_strom = $("#s-night-strom");
var s_huge_rain = $("#s-huge-rain");
var s_middle_rain = $("#s-middle-rain");
var s_wind = $("#s-wind");
//设置一个单独的溅射和涟漪音效数组
var s_raindrop_list=[];
var s_sputtering_list=[];
//记录上一次检查时的背景图片序号，雨与风的大小，是否静音
var lastbgimg;
var lastwindlevel;
var lastrainlevel;
var lastmute;
//音效的开关变量
var listen_single = 0;
var mute = 0;

//设置一个单独的溅射和涟漪音效数组，解决html不能同一个文件同时多次播放的问题。
for (var i = 1; i<21; i++) {
	s_raindrop_list[i] = $("#s-raindrop"+i);
};
	s_raindrop_list[0] = 1;//第一个位置用作计数器，实现同时播放多个水滴声音。

for (var i = 1; i<6; i++) {
	s_sputtering_list[i] = $("#s-sputtering"+i);
};
	s_sputtering_list[0] = 1;

s_day_ripple_bird.volume = 0.3;
s_day_ripple.volume = 0.5;

//以下函数用于每隔100毫秒运行全局音效确认函数。
setInterval("checkAudio()",100);

/**
 * [checkAudio 函数]
 * 确认所有音效的函数，根据各个音效变量的值来决定声音的播放与停止。
 * 
 */
function checkAudio(){
	如果静音与否没有变化，退出函数
	如果静音
		将上次静音与否置为真
		停止所有音效，退出
	如果上次选择了静音，那么将上次的背景序号和上次的雨大小重置
	将上次静音与否置为与目前相同
	禁止所有音效
}
/**
 * [checkBgAudio 函数]
 * 背景音效检查函数，根据场景决定音效的不同
 * 
 */
function checkBgAudio (){
	如果背景没有更换则直接退出
	禁止所有背景音效
	//bgimg代表的场景：
	//0：实际空间纹理
	//1：清晨波纹荡漾
	//2：清晨平静水面
	//3：夜晚平静水面
	//4：夜晚闪电风暴
	由bgimg决定播放哪种背景音效	
	}
	
}
/**
 * [checkRainAudio 函数]
 * 雨音效检查函数，根据雨的大小决定音效和声音大小
 * 
 */
function checkRainAudio(){
	如果雨的大小没有更换则直接退出
	如果雨的大小为0，停止下雨音效并退出
	停止所有下雨音效
	由rainlevel决定播放哪种下雨音效
	并调整音量大小
}
/**
 * [checkWindAudio 函数]
 * 风音效检查函数，根据风的大小决定音效和声音大小
 * 
 */
function checkWindAudio(){
	//如果风的大小没有更换则直接退出
	//如果风的大小为0，停止风的音效并退出
	由windlevel决定播放哪种风的音效
	并调整音量大小
}
/**
 * [pauseAllWind 函数]
 * 风音效全部停止
 * 
 */
function pauseAllWind(){
	风音效全部停止
}
/**
 * [pauseAllRain 函数]
 * 雨音效全部停止
 * 
 */
function pauseAllRain(){
	雨音效全部停止
}
/**
 * [pauseAllBg 函数]
 * 背景音效全部停止
 * 
 */
function pauseAllBg(){
	背景音效全部停止
}
/**
 * [pauseAll 函数]
 * 所有音效停止
 * 
 */
function pauseAll(){
	所有音效停止
}
/**
 * [raindropSound 函数]
 * 播放单独雨滴的音效
 * 
 */
function raindropSound(){
	如果正在静音或者未允许监听雨滴，退出
	本次调用播放第i++号雨滴的音效，并在0<i<21内循环
}
/**
 * [sputteringSound 函数]
 * 播放单独溅射的音效
 * 
 */
function sputteringSound(){
	如果正在静音或者未允许监听雨滴，退出
	本次调用播放第i++号溅射的音效，并在0<i<6内循环
}