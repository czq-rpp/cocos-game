/*
 * @Author: zaccheus 
 * @Date: 2018-07-17 16:16:44 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 15:29:25
 */

cc.Class({
    extends: cc.Component,
    properties: {
        speed: 0,
        botYRange: cc.p(0, 0),
        spacingRange: cc.p(0, 0),
        topPipe: cc.Node,
        botPipe: cc.Node
    },
    onEnable () {
        // 随机设置上下管道的y值！
        var botYPos = this.botYRange.x + Math.random() * (this.botYRange.y - this.botYRange.x);
        var space = this.spacingRange.x + Math.random() * (this.spacingRange.y - this.spacingRange.x);
        var topYPos = botYPos + space;
        this.topPipe.y = topYPos;
        this.botPipe.y = botYPos;
    },
    update (dt) {
        if (D.game.se === 'gm') {
            return;
        }

        this.node.x += this.speed * dt;

        // var disappear = this.node.getBoundingBoxToWorld().xMax < 0;
        // if (disappear) {
        //     D.pipeManager.despawnPipe(this);
        // }
    }
});
