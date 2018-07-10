/*
 * @Author: zaccheus 
 * @Date: 2018-07-09 11:13:22 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-10 13:39:03
 */

var URL = "http://192.168.21.75:9000";
// 游戏自定义版本号
cc.VERSION = 20161227;
var HTTP = cc.Class({
    extends: cc.Component,
    // 静态变量和静态方法
    statics: {
        master_url:URL,
        url: URL,
        sendRequest(path, data, handler, extraUrl) {
            // 1、获取cocos中封装的ajax请求方法
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            // 2、把传入的参数data封装进请求路径requestURL中
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            // 3、把path即'/get_serverinfo'、编码的参数、extraUrl封装进请求路径requestURL中
            if (extraUrl == null) {
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            // 4、用cocos封装的ajax请求
            xhr.open("GET", requestURL, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // 6、请求成功后输出后端返回的信息，并把json字符串解析成json，并handler用回调函数做事对这个（ret）
                    console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if (handler !== null) {
                            handler(ret);
                        } /* code */
                    } catch (e) {
                        console.log("err:" + e);
                        //handler(null);
                    } finally {
                        if (cc.vv && cc.vv.wc) {
                            //       cc.vv.wc.hide();    
                        }
                    }
                }
            };
            // 5、发送
            xhr.send();
        }
    }
});