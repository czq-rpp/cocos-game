/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 17:09:21 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-11 15:00:40
 */

var mysql = require("mysql");
var crypto = require('./crypto');

var pool = null;

function nop(a, b, c, d, e, f, g) {

}

// 封装的query方法，连接数据库
// 两个参数分别是1、sql查询语句和2、callback回调函数
function query(sql, callback) {
  // 数据池连接数据库服务器方法
  pool.getConnection(function (err, conn) {
    // 如果错误的话会返回一个err对象
    if (err) {
      // 数据库连接错误的情况，直接callback(err,null,null)，这里的callback是这个函数function (err, rows, fields) {},在这里面再执行外面层的callback，出现了回调地狱
      callback(err, null, null);
    } else {
      // 数据库连接成功的情况，会返回第二个参数coon，执行query方法
      conn.query(sql, function (qerr, vals, fields) {
        //释放连接  
        conn.release();
        //事件驱动回调  
        callback(qerr, vals, fields);
      });
    }
  });
};

exports.init = function (config) {
  // 创建数据池
  pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PSWD,
    database: config.DB,
    port: config.PORT,
  });
};

// 封装数据库方法：1、传入两个参数：account和回调函数
exports.get_user_data = function (account, callback) {
  // 如果没有传入callback回调函数则用上面的nop函数
  callback = callback == null ? nop : callback;
  // 如果account参数为空，直接调用callback(null)函数，并退出脚本
  if (account == null) {
    callback(null);
    return;
  }

  // sql查询语句
  var sql = 'SELECT userid,account,name,lv,exp,coins,gems,roomid FROM t_users WHERE account = "' + account + '"';
  
  // 执行上面封装的query方法
  query(sql, function (err, rows, fields) {
    if (err) {
      // 连接失败，返回null，输出错误
      callback(null);
      throw err;
    }

    if (rows.length == 0) {
      // 查询成功，但是数据库并没有此人的信息，返回null
      callback(null);
      return;
    }
    rows[0].name = crypto.fromBase64(rows[0].name);
    callback(rows[0]);
  });
};

// account逻辑上数据库中肯定是不存在的，这里还是保险起见又做了一次判断
// 以后有时间可以做一个扩展检查name是否已经存在！！！！即游戏的昵称
exports.is_user_exist = function(account,callback){
  callback = callback == null? nop:callback;
  if(account == null){
      callback(false);
      return;
  }

  var sql = 'SELECT userid FROM t_users WHERE account = "' + account + '"';
  query(sql, function(err, rows, fields) {
      if (err) {
          throw err;
      }

      if(rows.length == 0){
          callback(false);
          return;
      }
      // 数据库中查询到结果，返回true，其他都返回false
      callback(true);
  });  
}


exports.create_user = function(account,name,coins,gems,sex,headimg,callback){// 参数分别是：账户、昵称、用户金币、用户宝石、用户性别、用户头像、回调函数
	callback = callback == null? nop:callback;
	if(account == null || name == null || coins==null || gems==null){// 账户、昵称、用户金币、用户宝石只要有一个为空，返回callback(false)
			callback(false);
			return;
	}
	if(headimg){
			headimg = '"' + headimg + '"';
	}
	else{
			headimg = 'null';
	}
	name = crypto.toBase64(name);// 姓名加密
	var sql = 'INSERT INTO t_users(account,name,coins,gems,sex,headimg) VALUES("{0}","{1}",{2},{3},{4},{5})';// sql插入语句
	sql = sql.format(account,name,coins,gems,sex,headimg);// 这里用到了在http.js中定义的format方法
	console.log(sql);
	query(sql, function(err, rows, fields) {
			if (err) {
					throw err;
			}
			callback(true);
	});
};