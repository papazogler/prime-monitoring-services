/**
 * Created by Stavros on 6/2/2015.
 */
'use strict';
var config = require('../../config/environment');
var http = require("../http-utils/http.request");

function isAuthenticated() {
  var login = {
    service: "login",
    username: config.s1User.username,
    password: config.s1User.password,
    appId: config.s1User.appId
  };

  http.requestWithEncoding(config.s1HttpOptions(login, login, function (err, data) {
    if (err) {
      console.send(err);
    }
    else {
      var parse = JSON.parse(data);
      var vessels = parse.rows;
      res.json(vessels);

      //console.log(win1253.decode(data));
    }
  }));

  var res = {
    "success": true,
    "clientID": "Wj8T3tvs...  ...tlrT8",
    "objs": [
      {
        "COMPANY": "1000",
        "COMPANYNAME": "Demo Company SA",
        "BRANCH": "1000",
        "BRANCHNAME": "Athens",
        "MODULE": "0",
        "MODULENAME": "Center",
        "REFID": "1",
        "REFIDNAME": "Administrator"
      }
    ]
  };

  var auth = {
    service: " authenticate",
    clientID: "Wj8T3tvs...  ...tlrT8",
    COMPANY: "1000",
    BRANCH: "1000",
    MODULE: "0",
    REFID: "1"
  };
}

function getClientID() {
  return "9J8pJsP8KKnwH68bDKObDKL5TLHhMND9UKHoKoKrGs56MIKqC6X2JKbvPrObDKL9KKzdR5DMH6bbLN1LTL0bDKLHGKztR58bDK9vU4HAKIKrGt4bD31ZT7PO9JL59JL4HL4bDqPnLLHmPKLL9JL5JLLMLcLaJa9mOLTJQ7DD9JOmI2KqC5T5GLHLINLXJKDLOa55H64bDKDF9JGmKKn6M50bD31G9JGmK4D6M4D1I5b2Gs9GGqabDKKbDZ1JKaLvHKmbDqD8SIKrHb0bDKDoLarPTrKbDKLXK4XdQ4DAR4nrLNbDOqrZQ71AML55ML4bDqH4";
};

module.exports.isAuthenticated = isAuthenticated;
module.exports.getClientID = getClientID;
