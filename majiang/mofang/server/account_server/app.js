/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:15 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 11:13:31
 */

// 后端入口文件

// 1、引入数据库封装对象； 2、获取命令行的参数对应的配置对象
var db = require('../utils/db');
var configs = require(process.argv[2]);

//init db pool.
db.init(configs.mysql());

// 获取配置对象的account_server配置对象
var config = configs.account_server();
// 获取并运行account_server封装对象，即起account_server后端服务
var as = require('./account_server');
// account_server后端服务初始化，详见account_server.js文件
as.start(config);

// var dapi = require('./dealer_api');
// dapi.start(config);