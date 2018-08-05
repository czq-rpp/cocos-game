/*
 * @Author: zaccheus 
 * @Date: 2018-07-17 15:45:01 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-18 15:17:18
 */

var PipeGroup = require('PipeGroup');

cc.Class({
    extends: cc.Component,

    properties: {
        pipePrefab: cc.Prefab,
        pipeLayer: cc.Node,
        initPipeX: 0,
        //-- 创建PipeGroup需要的时间
        spawnInterval: 0
    },
    onLoad() {
        D.pipeManager = this;
    },

    startSpawn() {
        this.spawnPipe();
        this.schedule(this.spawnPipe, this.spawnInterval);
    },

    //-- 创建管道组
    spawnPipe() {
        var pipeGroup = null;
        if (cc.pool.hasObject(PipeGroup)) {
            pipeGroup = cc.pool.getFromPool(PipeGroup);
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab).getComponent(PipeGroup);
        }
        this.pipeLayer.addChild(pipeGroup.node);// 触发onEnable
        pipeGroup.node.active = true;
        pipeGroup.node.x = this.initPipeX;
    },

    reset () {
        this.unschedule(this.spawnPipe);
    }
});