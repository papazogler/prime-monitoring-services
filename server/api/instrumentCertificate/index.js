'use strict';

var express = require('express');
var controller = require('./instrumentCertificate.controller');
var multiparty = require('connect-multiparty'),
	multipartyMiddleware = multiparty();
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:instrumentId/:serial', multipartyMiddleware, controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;