/**
 * Created by Stavros on 6/2/2015.
 */
var http = require('http');
var zlib = require('zlib');
var windows1253 = require('windows-1253');

function requestWithEncoding(options, body, callback) {
  var req = http.request(options);

  req.on('response', function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    //res.setEncoding('binary');

    var chunks = [];
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      var buffer = Buffer.concat(chunks);
      var encoding = res.headers['content-encoding'];
      if (encoding == 'gzip') {
        zlib.gunzip(buffer, function (err, decoded) {
          var encoded = decoded && decoded.toString('binary');
          var text = windows1253.decode(encoded);
          callback(err, text);
        });
      } else if (encoding == 'deflate') {
        zlib.inflate(buffer, function (err, decoded) {
          var text = windows1253.decode(decoded && decoded.toString('binary'));
          callback(err, text);
        })
      } else {
        var text = windows1253.decode(buffer.toString('binary'));
        callback(null, text);
      }
    });
  });

  req.on('error', function (err) {
    callback(err);
  });

  req.write(body, 'utf8');

  req.end();
}

module.exports.requestWithEncoding = requestWithEncoding;
