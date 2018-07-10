/*
 * @Author: zaccheus 
 * @Date: 2018-07-10 16:26:54 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 17:03:22
 */

// 封装函数send，传入res参数、errcode--表示错误数字、errmsg表示错误信息、data返回的数据
// 主要作用就是返回带状态的json字符串
exports.send = function(res,errcode,errmsg,data){
	if(data == null){
		data = {};
	}
	data.errcode = errcode;
	data.errmsg = errmsg;
	var jsonstr = JSON.stringify(data);
	res.send(jsonstr);
};