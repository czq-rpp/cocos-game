/*
 * @Author: zaccheus 
 * @Date: 2018-07-17 17:19:47 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 17:16:21
 */

//-- 绵羊状态
var State = cc.Enum({
    None: -1,
    Run: -1,
    Jump: -1,
    Drop: -1,
    DropEnd: -1,
    Dead: -1
});

var Bird = cc.Class({
    extends: cc.Component,

    properties: {
        x: {
            default: 0,
            visible: false
        },
        readyDone: cc.Node,
        //-- Y轴最大高度
        maxY: 0,
        //-- 地面高度
        groundY: 0,
        //-- 重力
        gravity: 0,
        //-- 起跳速度
        initJumpSpeed: 0,
        //-- 绵羊状态
        _state: {
            default: State.None,
            type: State,
            visible: false
        },
        state: {
            get: function () {
                return this._state;
            },
            set: function (value) {
                if (value !== this._state) {
                    this._state = value;
                    if (this._state !== State.None) {
                        var animName = State[this._state];
                        this.anim.stop();
                        this.anim.play(animName);
                    }
                }
            },
            type: State
        },
        //-- 获取Jump音效
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    init() {
        //-- 当前播放动画组件
        this.anim = this.getComponent(cc.Animation);
        //-- 当前速度
        this.currentSpeed = 0;
        //-- 绵羊图片渲染
        this.sprite = this.getComponent(cc.Sprite);
    },

    //-- 初始化
    registerInput() {
        // -- 添加绵羊控制事件(为了注销事件缓存事件)
        var cvs = cc.find("Canvas");
        cvs.on(cc.Node.EventType.MOUSE_DOWN, this.doJump, this);
        cvs.on(cc.Node.EventType.TOUCH_START, this.doJump, this);
        // cc.eventManager.addListener({
        //     event: cc.EventListener.KEYBOARD,
        //     onKeyPressed: function (keyCode, event) {
        //         this.readyDone.active = false;
        //         this.jump();
        //     }.bind(this)
        // }, this.node);
        // // touch input
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan: function (touch, event) {
        //         this.readyDone.active = false;
        //         this.jump();
        //         return true;
        //     }.bind(this)
        // }, this.node);
    },

    //-- 删除
    enableInput: function (enable) {
        var cvs = cc.find("Canvas");
        if (enable) {
            // cc.eventManager.resumeTarget(this.node);
        } else {
            cvs.off(cc.Node.EventType.MOUSE_DOWN)
            cvs.off(cc.Node.EventType.TOUCH_START)
            // cc.eventManager.pauseTarget(this.node);
        }
    },

    doJump() {
        this.readyDone.active = false;
        this.jump();
    },

    //-- 开始跳跃设置状态数据，播放动画
    jump: function () {
        if (this.x === 0) {
            D.pipeManager.startSpawn();
            this.x = 1;
        }
        this.state = State.Jump;
        this.currentSpeed = this.initJumpSpeed;
        //-- 播放跳音效
        cc.audioEngine.playEffect(this.jumpAudio);
        // this.spawnDust('DustUp');
    },

    // onCollisionEnter: function (other) {
    //     console.log('on collision enter');
    //     if (this.state !== State.Dead) {
    //         var group = cc.game.groupList[other.node.groupIndex];
    //         if (group === 'Obstacle') {
    //             // bump
    //             this.state = Sheep.State.Dead;
    //             D.game.gameOver();
    //             this.enableInput(false);
    //         } else if (group === 'NextPipe') {
    //             // jump over
    //             D.game.gainScore();
    //         }
    //     }
    // },

    //-- 更新
    update(dt) {
        switch (this.state) {
            case State.Jump:
                if (this.currentSpeed < 0) {
                    this.state = State.Drop;
                }
                break;
            case State.Drop:
                if (this.node.y < this.groundY) {
                    this.node.y = this.groundY;
                    this.state = State.DropEnd;
                    // this.spawnDust('DustDown');
                }
                break;
            case State.None:
            case State.Dead:
                return;
        }
        var flying = this.state === State.Jump || this.node.y > this.groundY;
        if (flying) {
            this.currentSpeed -= dt * this.gravity;
            this.node.y += dt * this.currentSpeed;
        }
    }
});