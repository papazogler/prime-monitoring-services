/**
 * Created by Stavros on 6/2/2015.
 */
'use strict';
var config = require('../../config/environment');
var http = require("../http-utils/http.request");

(function (){
  var clientId;
  function authenticate(callback){
    if(undefined !== clientId) {
      callback(null, clientId);
    }else{
      var login = {
        service: "login",
        username: config.s1User.username,
        password: config.s1User.password,
        appId: config.s1User.appId
      };
      var q = JSON.stringify(login);
      http.requestWithEncoding(config.s1HttpOptions(q), q, function (err, data) {
        if (err) {
          console.log(err);
        }
        else {
          var loginRes = JSON.parse(data);
          if (!loginRes.success) {
            callback(loginRes.error);
          } else {
            var auth = {
              service: "authenticate",
              clientID: loginRes.clientID,
              COMPANY: loginRes.objs[0].COMPANY,
              BRANCH: loginRes.objs[0].BRANCH,
              MODULE: loginRes.objs[0].MODULE,
              REFID: loginRes.objs[0].REFID
            };
            var q = JSON.stringify(auth);
            http.requestWithEncoding(config.s1HttpOptions(q), q, function (err, data) {
              if (err) {
                callback(err);
              } else {
                var authRes = JSON.parse(data);
                if (!authRes.success) {
                  callback(authRes.error);
                } else {
                  clientId = authRes.clientID;
                  callback(null, clientId);
                }
              }
            });
          }
        }
      });
    }
  };

  module.exports.authenticate= authenticate;
})();

