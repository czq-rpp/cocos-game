/*
 * @Author: zaccheus 
 * @Date: 2018-07-18 10:41:30 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 16:57:02
 */

var Bird = require('Bird');

cc.Class({
    extends: cc.Component,

    properties: {
        gameOverMenu: cc.Node,
        //-- 获取分数对象
        scoreText: cc.Label,
        score: 0,
        score_num: cc.Label
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // this.onCollisionEnter = null;
        // this.onCollisionStay = null;
        // this.onCollisionExit = null;
        // if (this.realListener) {
        //     console.log(this.realListener)
        //     if (this.realListener.onCollisionEnter) {
        //         console.log(1)
        //         this.onCollisionEnter = onCollisionEnter;
        //     }
        //     if (this.realListener.onCollisionStay) {
        //         this.onCollisionStay = onCollisionStay;
        //         console.log(2)
        //     }
        //     if (this.realListener.onCollisionExit) {
        //         this.onCollisionExit = onCollisionExit;
        //         console.log(3)
        //     }
        // }
    },

    onCollisionEnter: function (other) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group === 'Land' || group === 'Obstacle') {
            // bump
            // this.state = Sheep.State.Dead;
            // D.game.gameOver();
            // this.enableInput(false);
            D.game.se = "gm";
            console.log('dead')
            D.pipeManager.reset();
            this.gameOverMenu.active = true;
            var bird = new Bird()
            bird.enableInput(false);
            console.log(this.score)
            this.score_num.string = this.score;
        } else if (group === 'NextPipe') {
            this.score++;
            this.scoreText.string = this.score;
        }
    },

});