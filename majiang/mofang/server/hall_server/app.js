/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 16:07:55 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 16:16:34
 */

// 获取并运行client_service封装对象，即起client_service后端服务
var client_service = require("./client_service");

// 获取命令行的参数对应的配置对象
var configs = require(process.argv[2]);
// 获取配置对象的hall_server配置对象
var config = configs.hall_server();

//init db pool.
var db = require('../utils/db');
db.init(configs.mysql());

// client_service后端服务初始化，详见client_service.js文件
client_service.start(config);