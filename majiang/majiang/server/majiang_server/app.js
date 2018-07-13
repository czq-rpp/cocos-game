/*
 * @Author: zaccheus 
 * @Date: 2018-07-13 14:07:49 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-13 14:12:49
 */

var http_service = require("./http_service");

//从配置文件获取服务器信息
var configs = require(process.argv[2]);
var config = configs.game_server();

//开启HTTP服务
http_service.start(config);