/*
 * @Author: zaccheus 
 * @Date: 2018-07-05 15:22:13 
 * @Last Modified by: zaccheus
 * @Last Modified time: 2018-07-05 16:38:19
 */

var Weather = require("./weather");
var weatherInstance = new Weather();
var express = require('express');
var app = express();

Weather.notifyNumEvent = function(callNum) {
  console.log(`接口被调用了${callNum}次`);
}

app.get('/weather/:cityName', function (req, res) {
  var cityName = req.params.cityName;
  weatherInstance.search(cityName).then(function (data) {
    res.send(data);
  }).catch(function (err) {
    console.log(err);
  })
});

app.listen(3000);