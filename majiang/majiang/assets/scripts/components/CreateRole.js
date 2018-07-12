/*
 * @Author: zaccheus 
 * @Date: 2018-07-11 14:14:24 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-11 14:29:37
 */

cc.Class({
    extends: cc.Component,

    properties: {
        inputName:cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        this.onRandomBtnClicked();
    },

    // 随机组合昵称
    onRandomBtnClicked:function(){
        var names = [
            "上官",
            "欧阳",
            "东方",
            "端木",
            "独孤",
            "司马",
            "南宫",
            "夏侯",
            "诸葛",
            "皇甫",
            "长孙",
            "宇文",
            "轩辕",
            "东郭",
            "子车",
            "东阳",
            "子言",
        ];
        
        var names2 = [
            "雀圣",
            "赌侠",
            "赌圣",
            "稳赢",
            "不输",
            "好运",
            "自摸",
            "有钱",
            "土豪",
        ];
        // 很棒的根据数组长度来随机取值的方法！！！
        var idx = Math.floor(Math.random() * (names.length - 1));
        var idx2 = Math.floor(Math.random() * (names2.length - 1));
        // 把editbox里面的值变成上面随机组合的值
        this.inputName.string = names[idx] + names2[idx2];
    },

    // 确定按钮回调
    onBtnConfirmClicked:function(){
        var name = this.inputName.string;
        if(name == ""){
            console.log("invalid name.");
            return;
        }
        console.log(name);
        cc.vv.userMgr.create(name);
    }

    // update (dt) {},
});
