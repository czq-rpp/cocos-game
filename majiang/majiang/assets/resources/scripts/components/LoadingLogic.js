/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 09:39:39 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 14:59:24
 */

cc.Class({
    extends: cc.Component,
    // 挂在属性
    properties: {
        tipLabel: cc.Label,
        _stateStr: '', //表示状态的字符串
        _progress: 0.0, //
        _splash: null,
        _isLoading: false
    },
    //组件所在节点进行初始化时（节点添加到节点树时）执行
    onLoad() {
        //sys判断1、不要原生；2、要移动端
        if (!cc.sys.isNative && cc.sys.isMobile) {
            //this代表本脚本组件，获取canvas节点
            var cvs = this.getComponent(cc.Canvas);
            //canvasUI根节点属性设置
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        //运行本组件脚本的initMgr方法
        this.initMgr();
        //设置label组件的内容
        //等于表示状态的字符串
        this.tipLabel.string = this._stateStr;
        //找到splash节点,当 cc.find 只传入第一个参数时，将从场景根节点开始逐级查找
        this._splash = cc.find("Canvas/splash");
        //设置splash节点的激活状态，其父节点必须激活
        this._splash.active = true;
    },

    initMgr() {
        //Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。    
        //在cc这个规定的命名空间中定义一个空对象
        cc.vv = {};
        // 引用用户模块化脚本
        var UserMgr = require("UserMgr");
        cc.vv.userMgr = new UserMgr();
        //引进HTTP对象，在这个场景脚本中用到的是其封装的sendRequest方法，是原生ajax请求会把后端返回的json字符串解析成json传递过来
        cc.vv.http = require("HTTP");
        cc.vv.net = require("Net");
        //
        var GameNetMgr = require("GameNetMgr");
        cc.vv.gameNetMgr = new GameNetMgr();
        cc.vv.gameNetMgr.initHandlers();
        //
        var VoiceMgr = require("VoiceMgr");
        cc.vv.voiceMgr = new VoiceMgr();
        // 音频初始化，详见AudioMgr.js
        var AudioMgr = require("AudioMgr");
        cc.vv.audioMgr = new AudioMgr();
        cc.vv.audioMgr.init();
        //params--把地址栏？的参数封装到这个对象中
        cc.args = this.urlParse();
    },

    urlParse() {
        var params = {};
        if (window.location == null) {
            return params;
        }
        var name, value;
        var str = window.location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    },

    start() {
        // 加载完load之后在大部分平台上渐隐公司logo图片及调用checkVersion方法
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        //1、非ios平台或者2、非原生平台
        //渐隐效果在非原生的所有平台上面有，在非ios操作系统上全部有！=== ios原生操作系统上面没有
        if (cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative) {
            var t = Date.now();
            var fn = function () {
                var dt = Date.now() - t;
                if (dt < SHOW_TIME) {
                    setTimeout(fn, 33);
                } else {
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    if (op < 0) {
                        self._splash.opacity = 0;
                        self.checkVersion();
                    } else {
                        self._splash.opacity = op;
                        setTimeout(fn, 33);
                    }
                }
            };
            setTimeout(fn, 33);
        } else {
            this._splash.active = false;
            this.checkVersion();
        }
    },

    checkVersion() {
        // 连接后端接口--get_serverinfo；
        // 1、如果连接不上，请求终止————xhr.abort()改变状态值————连接失败，即将重试；
        // 2、5秒后继续请求————fnRequest，改变状态值————正在连接服务器;
        // 3、成功————complete设为true，即完成不再请求，把返回的json值ret带给onGetVersion方法
        // 4、主要是检查版本，把ret复制给vv中的SI
        // 5、执行startPreloading，即开始加载资源，进login场景
        var self = this;
        var xhr = null;
        var complete = false;

        var onGetVersion = function (ret) {
            if (ret.version == null) {
                console.log("error.");
            } else {
                cc.vv.SI = ret;
                if (ret.version != cc.VERSION) {
                    // cc.find("Canvas/alert").active = true;
                    console.log("如果有原生版本，这里会提示升级原生版本")
                } else {
                    self.startPreloading();
                }
            }
        };

        var fnRequest = function () {
            self._stateStr = "正在连接服务器";
            xhr = cc.vv.http.sendRequest("/get_serverinfo", null, function (ret) {
                xhr = null;
                complete = true;
                onGetVersion(ret);
            });
            setTimeout(fn, 5000);
        }

        var fn = function () {
            if (!complete) {
                if (xhr) {
                    xhr.abort();
                    self._stateStr = "连接失败，即将重试";
                    setTimeout(function () {
                        fnRequest();
                    }, 5000);
                } else {
                    fnRequest();
                }
            }
        };
        fn();
    },

    startPreloading() {
        // 这里主要是对加载textures资源的封装，用到的方法是cc.loader.loadResDir
        this._stateStr = "正在加载资源，请稍候";
        this._isLoading = true;
        var self = this;

        var progressCallback = function (completedCount, totalCount, item) {
            // console.log("completedCount:" + completedCount + ",totalCount:" + totalCount);
            if (self._isLoading) {
                self._progress = completedCount / totalCount;
            }
        };

        cc.loader.loadResDir("textures", progressCallback, function (err, assets) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            self.onLoadComplete();
        });
    },

    onLoadComplete() {
        // cc.loader.loadResDir加载完成后的回调
        this._isLoading = false;
        this._stateStr = "准备登陆";
        cc.director.loadScene("login");
    },

    update(dt) {
        // 每一帧都会运行的函数，这里主要涉及状态值：_stateStr和资源加载进度值_progress
        if (this._stateStr.length == 0) {
            return;
        }
        this.tipLabel.string = this._stateStr + ' ';
        if(this._isLoading){
            this.tipLabel.string += Math.floor(this._progress * 100) + "%";   
        }
        else{
            // 这里比较有趣，主要是表示进度的随机.或..或...
            var t = Math.floor(Date.now() / 1000) % 4;
            for(var i = 0; i < t; ++ i){
                this.tipLabel.string += '.';
            }            
        }
    },
});