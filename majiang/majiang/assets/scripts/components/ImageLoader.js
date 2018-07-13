/*
 * @Author: zaccheus 
 * @Date: 2018-07-12 09:30:59 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-12 09:53:32
 */

function getBaseInfo(userid,callback){
    if(cc.vv.baseInfoMap == null){
        cc.vv.baseInfoMap = {};
    }
    
    if(cc.vv.baseInfoMap[userid] != null){
        callback(userid,cc.vv.baseInfoMap[userid]);
    }
    else{
        cc.vv.http.sendRequest('/base_info',{userid:userid},function(ret){
            var url = null;
            if(ret.headimgurl){
               url = ret.headimgurl + ".jpg";
            }
            var info = {
                name:ret.name,
                sex:ret.sex,
                url:url,
            }
            cc.vv.baseInfoMap[userid] = info;
            callback(userid,info);
            
        },cc.vv.http.master_url);   
    }  
};

function loadImage(url,code,callback){
    /*
    if(cc.vv.images == null){
        cc.vv.images = {};
    }
    var imageInfo = cc.vv.images[url];
    if(imageInfo == null){
        imageInfo = {
            image:null,
            queue:[],
        };
        cc.vv.images[url] = imageInfo;
    }
    
    cc.loader.load(url,function (err,tex) {
        imageInfo.image = tex;
        var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
        for(var i = 0; i < imageInfo.queue.length; ++i){
            var itm = imageInfo.queue[i];
            itm.callback(itm.code,spriteFrame);
        }
        itm.queue = [];
    });
    if(imageInfo.image != null){
        var tex = imageInfo.image;
        var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
        callback(code,spriteFrame);
    }
    else{
        imageInfo.queue.push({code:code,callback:callback});
    }*/
    cc.loader.load(url,function (err,tex) {
        var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
        callback(code,spriteFrame);
    });
};

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.setupSpriteFrame();
    },

    // 暂时不知道干嘛
    setupSpriteFrame:function(){
        if(this._spriteFrame){
            var spr = this.getComponent(cc.Sprite);
            if(spr){
                spr.spriteFrame = this._spriteFrame;    
            }
        }
    },

    setUserID:function(userid){
        // 两种情况直接退出这个方法：1、非原生平台；2、没有userid
        if(cc.sys.isNative == false){
            return;
        }
        if(!userid){
            return;
        }
        if(cc.vv.images == null){
            cc.vv.images = {};
        }
        // 应该属于原生的，后面再看
        var self = this;
        getBaseInfo(userid,function(code,info){
           if(info && info.url){
                loadImage(info.url,userid,function (err,spriteFrame) {
                    self._spriteFrame = spriteFrame;
                    self.setupSpriteFrame();
                });   
            } 
        });
    }
});
