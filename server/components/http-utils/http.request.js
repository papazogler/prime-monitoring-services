/**
 * Created by Stavros on 6/2/2015.
 */
var http = require('http');
var zlib = require('zlib');
var windows1253 = require('windows-1253');

exports.streamRequestWithEncoding = function (options, body, response) {
  console.log(options);
  var req = http.request(options);

  req.on('response', function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    response.writeHead(res.statusCode, {
      'Content-Length': res.headers['content-length'],
      'Content-Type': res.headers['content-type'],
      'Content-Encoding': res.headers['content-encoding']
    });

    res.on('data', function (chunk) {
      response.write(chunk, 'binary');
    });

    res.on('end', function () {
      response.end();
    });
  });

  req.on('error', function (err) {
    callback(err);
  });

  req.write(body, 'utf8');

  req.end();
};

exports.requestWithEncoding = function requestWithEncoding(options, body, callback) {
  console.log(options);
  var req = http.request(options);

  req.on('response', function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

    var chunks = [];
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      var buffer = Buffer.concat(chunks);
      var encoding = res.headers['content-encoding'];
      var contentType = res.headers['content-type'];

      if (encoding === 'gzip') {
        zlib.gunzip(buffer, function (err, decoded) {
          decode(err, contentType, decoded, callback);
        });
      } else if (encoding === 'deflate') {
        zlib.inflate(buffer, function (err, decoded) {
          decode(err, contentType, decoded, callback);
        })
      } else {
        decode(null, contentType, buffer, callback);
      }
    });
  });

  req.on('error', function (err) {
    callback(err);
  });

  req.write(body, 'utf8');

  req.end();
};

function decode(err, contentType, data, callback) {
  if(err){
    console.log(err);
    callback(err, null);
  }else {
    if (contentType === 'image/jpeg') {
      callback(null, data.toString('base64'));
    }else{
      callback(err, windows1253.decode(data && data.toString('binary')));
    }
  }
}

