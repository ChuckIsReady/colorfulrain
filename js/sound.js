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

	if(lastmute == 1 && mute == 1 )return;
	if(mute){
		lastmute = mute;
		pauseAll();
		return;
	}
	if(lastmute == 1){lastbgimg = 99; lastrainlevel =99;}
	lastmute = mute;
	checkBgAudio ();
	checkRainAudio();
	checkWindAudio();
}
/**
 * [checkBgAudio 函数]
 * 背景音效检查函数，根据场景决定音效的不同
 * 
 */
function checkBgAudio (){
	//如果背景没有更换则直接退出
	if (bgimg == lastbgimg)return;
	lastbgimg = bgimg;
	pauseAllBg();
	//bgimg决定的场景：
	//0：实际空间纹理
	//1：清晨波纹荡漾
	//2：清晨平静水面
	//3：夜晚平静水面
	//4：夜晚闪电风暴
	switch(bgimg>>0){
		case 0:
		pauseAllBg();
		break;
		case 1:
		s_day_ripple.play();
		s_day_ripple_bird.play();
		break;
		case 2:
		s_day_ripple_bird.play();
		break;
		case 3:
		s_night_slience.play();
		break;
		case 4:
		s_night_strom.play();
		default:
		break;

	}
	
}
/**
 * [checkRainAudio 函数]
 * 雨音效检查函数，根据雨的大小决定音效和声音大小
 * 
 */
function checkRainAudio(){
	//如果雨的大小没有更换则直接退出
	if (rainlevel == lastrainlevel)return;
	lastrainlevel = rainlevel;
	if(rainlevel==0) {pauseAllRain();return;}
	pauseAllRain();
	if(rainlevel<7){
	 s_middle_rain.play();
	 s_middle_rain.volume = 0.4+0.3*(rainlevel)/7;
	}
	else if(rainlevel<16){
	s_middle_rain.play();
	s_middle_rain.volume = 0.7+0.3*(rainlevel-7)/9;
	}
	else if(rainlevel<21){
	s_huge_rain.play();
	s_huge_rain.volume = 0.1+0.9*(rainlevel-16)/6;
	}

}
/**
 * [checkWindAudio 函数]
 * 风音效检查函数，根据风的大小决定音效和声音大小
 * 
 */
function checkWindAudio(){
	//如果风的大小没有更换则直接退出
	if (windlevel == lastwindlevel)return;
	lastwindlevel = windlevel;
	if(windlevel==0) {pauseAllWind();return;}
	pauseAllWind();
	if(windlevel>0){
	 s_wind.play();
	 s_wind.volume = (windlevel)/20;
	}
	else if(windlevel<0){
	s_wind.play();
	s_wind.volume = -windlevel/20;
	}

}
/**
 * [pauseAllWind 函数]
 * 风音效全部停止
 * 
 */
function pauseAllWind(){
	s_wind.pause();
}
/**
 * [pauseAllRain 函数]
 * 雨音效全部停止
 * 
 */
function pauseAllRain(){
	s_huge_rain.pause();
	s_middle_rain.pause();
}
/**
 * [pauseAllBg 函数]
 * 背景音效全部停止
 * 
 */
function pauseAllBg(){
	s_night_slience.pause();
	s_day_ripple_bird.pause();
	s_day_ripple.pause();
	s_night_strom.pause();
}
/**
 * [pauseAll 函数]
 * 所有音效停止
 * 
 */
function pauseAll(){
	s_night_slience.pause();
	s_day_ripple_bird.pause();
	s_day_ripple.pause();
	s_night_strom.pause();
	s_huge_rain.pause();
	s_middle_rain.pause();
	s_wind.pause();
}
/**
 * [raindropSound 函数]
 * 播放单独雨滴的音效
 * 
 */
function raindropSound(){
		if(mute||!listen_single)return;
		if(	s_raindrop_list[0]>20)	s_raindrop_list[0]=1;
		s_raindrop_list[s_raindrop_list[0]++].play();
}
/**
 * [sputteringSound 函数]
 * 播放单独溅射的音效
 * 
 */
function sputteringSound(){
		if(mute||!listen_single)return;
		if(	s_sputtering_list[0]>5)	s_sputtering_list[0]=1;
		s_sputtering_list[s_sputtering_list[0]++].play();
}