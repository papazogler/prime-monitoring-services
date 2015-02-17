/**
 * Created by Stavros on 17/2/2015.
 */
'use strict';
var config = require('../../config/environment');
var http = require("../http-utils/http.request");
var s1 = require("./s1.login");

exports.getFile = function getFile(filename, callback) {

  s1.authenticate(function (err, clientId) {
    if (err) {
      console.log(err);
    } else {
      var q = {
        "service": "getFile",
        "clientID": clientId,
        "appId": config.s1User.appId,
        "filename": filename
      };
      q = JSON.stringify(q);
      http.requestWithEncoding(config.s1HttpOptions(q), q, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          callback(data);
        }
      });
    }
  });
};

exports.getStreamFile = function getFile(filename, response) {

  s1.authenticate(function (err, clientId) {
    if (err) {
      console.log(err);
    } else {
      var q = {
        "service": "getFile",
        "clientID": clientId,
        "appId": config.s1User.appId,
        "filename": filename
      };
      q = JSON.stringify(q);
      http.streamRequestWithEncoding(config.s1HttpOptions(q), q, response);
    }
  })
};
