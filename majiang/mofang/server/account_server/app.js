/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:15 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-09 17:13:06
 */

var db = require('../utils/db');
var configs = require(process.argv[2]);

//init db pool.
db.init(configs.mysql());

//

var config = configs.account_server();
var as = require('./account_server');
as.start(config);

// var dapi = require('./dealer_api');
// dapi.start(config);