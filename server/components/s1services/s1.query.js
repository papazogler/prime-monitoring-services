/**
 * Created by Stavros on 6/2/2015.
 */
'use strict';
var config = require('../../config/environment');
var http = require("../http-utils/http.request");
var s1 = require("./s1.login");

function execute(query, callback) {

  s1.authenticate(function(err, clientId) {
    if(err) {
      console.log(err);
    }else {
      var q = {
        "service": "getSqlData",
        "clientID": clientId,
        "appId": config.s1User.appId,
        "sql": query
      };
      q = JSON.stringify(q);
      http.requestWithEncoding(config.s1HttpOptions(q), q, function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          var parse = JSON.parse(data);
          callback(parse.rows);
        }
      });
    }
  });
}

function executeWithPaging(query, orderBy, page, maxcount, callback) {
  s1.authenticate(function (err, clientId) {
    if (err) {
      console.log(err);
    } else {
      var skipRows = (page - 1) * maxcount;
      var pagination = ' order by ' + orderBy + ' offset ' + skipRows + ' rows fetch next ' + maxcount + ' rows only';

      var q = {
        "service": "getSqlData",
        "clientID": clientId,
        "appId": config.s1User.appId,
        "sql": query + pagination
      };
      q = JSON.stringify(q);
      http.requestWithEncoding(config.s1HttpOptions(q), q, function (err, data) {
        if (err) {
          console.send(err);
        }
        else {
          var parse = JSON.parse(data);
          callback(parse.rows);
        }
      });
    }
  });
}

module.exports.execute = execute;
module.exports.executeWithPaging = executeWithPaging;


