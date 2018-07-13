/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 10:32:23 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 13:57:45
 */

cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume:1.0,
        bgmAudioID:-1,
        sfxVolume:1.0
    },

    // onLoad () {},

    start () {

    },

    init() {
        var t = cc.sys.localStorage.getItem("bgmVolume");
        if(t != null){
            this.bgmVolume = parseFloat(t);    
        }
        
        var t = cc.sys.localStorage.getItem("sfxVolume");
        if(t != null){
            this.sfxVolume = parseFloat(t);    
        }
        // 游戏进入后台时触发的事件。请注意，在WEB平台，这个事件不一定会100％触发，这完全取决于浏览器的回调行为。
        // 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为
        cc.game.on(cc.game.EVENT_HIDE, function () {
            // cc.game.EVENT_HIDE——游戏音频全部暂停播放
            console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            // cc.game.EVENT_SHOW——游戏音频全部继续播放，和上面的pauseAll对应
            console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    },

    getUrl:function(url){
        // 返回原始资产的url，如果原始资产位于“resources”文件夹中，则只需要此项
        // Cocos2d 的一些旧 API 并没有使用上面提到的 Asset 对象，而是直接用 URL 字符串指代资源。
        // 为了兼容这些 API，我们把这类资源叫做 "Raw Asset"。
        // 图片（cc.Texture2D），声音（cc.AudioClip），粒子（cc.ParticleAsset）等资源都是 Raw Asset
        return cc.url.raw("resources/sounds/" + url);
    },

    playBGM(url){
        var audioUrl = this.getUrl(url);
        // console.log(audioUrl);
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
        // 播放api，第一个参数：filePath、第二个参数：loop；第三个参数音量大小
        this.bgmAudioID = cc.audioEngine.play(audioUrl,true,this.bgmVolume);
        // 这时候this.bgmAudioID === 0
    },

    // 设置音效大小
    setSFXVolume:function(v){
        // 如果设置的值不等于1，在本地存储中存下这个值，并设置成这个值
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    },
    
    // 设置音乐大小
    setBGMVolume:function(v,force){
        // console.log(this.bgmAudioID) 等于0；bgmVolume = 1
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        // 存储bgmVolume的值进localStorage本地存储中
        if(this.bgmVolume != v || force){
            // 存储
            cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            // 设置音量（0.0~1.0）
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    },
    // update (dt) {},
});
