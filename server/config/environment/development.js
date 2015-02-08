'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/primemonitoringservices-dev'
  },

  s1HttpOptions: function (body) {
    return {
      hostname: process.env.S1_SERVICE_HOST || 'prime.oncloud.gr',
      port: process.env.S1_SERVICE_PORT,
      path: process.env.S1_SERVICE_PATH || '/s1services',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    };
  },

  //s1 user
  s1User: {
    username: process.env.S1_USERNAME,
    password: process.env.S1_PASSWORD,
    appId: process.env.S1_APPID
  },

  seedDB: true
};
