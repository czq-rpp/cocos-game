var express = require('express');
var app = express();
var msgpack = require("msgpack-lite");

app.get('/pack/:json', function (req, res) {
  var jsonVal = req.param('json');
  var jsonObject = JSON.parse(jsonVal);
  // encode from JS Object to MessagePack (Buffer)
  var buffer = msgpack.encode(jsonObject);
  var bufferString = buffer.toString('hex');
  res.send(bufferString);
});

app.get('/unpack/:UPjson', function (req, res) {
  var unPackJsonVal = req.param('UPjson');
  var buffer = new Buffer(unPackJsonVal,'hex')
  // decode from MessagePack (Buffer) to JS Object
  var data = msgpack.decode(buffer);
  res.send(data);
});

app.listen(3000);