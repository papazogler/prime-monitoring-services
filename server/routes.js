/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/instrumentCertificates', require('./api/instrumentCertificate'));
  app.use('/api/ships', require('./api/ship'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/customers', require('./api/s1customer'));
  app.use('/api/instruments', require('./api/instrument'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
