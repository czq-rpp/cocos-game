/*
 * @Author: zaccheus 
 * @Date: 2018-07-17 10:41:00 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 15:29:17
 */

cc.Class({
    extends: cc.Component,

    properties: {
        //-- 滚动的速度
        speed: 0,
        //-- X轴边缘
        resetX: 0
    },

    update (dt) {
        if (D.game.se === 'gm') {
            return;
        }
        var x = this.node.x;
        x += this.speed * dt;
        if (x <= this.resetX) {
            x -= this.resetX;
        }
        this.node.x = x;
    }
});
