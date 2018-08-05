/*
 * @Author: zaccheus 
 * @Date: 2018-07-17 13:30:28 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 17:16:55
 */

var Bird = require('Bird');

var State = cc.Enum({
    Menu: -1,
    Run: -1,
    Over: -1
});

var GameManager = cc.Class({
    extends: cc.Component,

    properties: {
        //-- 获取小鸟
        bird: Bird,
        bird1: cc.Node,
        bird2: cc.Node,
        //-- 获取gameOverMenu对象
        gameOverMenu: cc.Node,
        _start: null,
        _ready: null,
        _score: 0,
        _state: null,
        //-- 获取分数对象
        scoreText: cc.Label,
    },

    statics: {
        State
    },

    onLoad() {
        D.GameManager = GameManager;
        D.game = this;
        // activate colliders
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        this.animPlay(this.bird1);
        //-- 游戏状态
        this._state = State.Menu;
        //-- 分数
        this._score = 0;
        this.scoreText.string = this._score;
        this.gameOverMenu.active = false;
        this.bird.init();
    },

    animPlay(bird) {
        var animCtrl = bird.getComponent(cc.Animation);
        animCtrl.playAdditive("Fly");
        animCtrl.playAdditive("Bounce");
    },

    onStartClick() {
        this._start = cc.find("Canvas/start");
        this._ready = cc.find("Canvas/ready");
        this._start.active = false;
        this._ready.active = true;
        this.animPlay(this.bird2);
        this.bird.registerInput();
    },

    // 加载Game场景(重新开始游戏)
    restart: function () {
        cc.director.loadScene('start');
    }
});