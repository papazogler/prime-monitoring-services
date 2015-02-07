/**
 * Created by Stavros on 6/2/2015.
 */
'use strict';

var express = require('express');
var controller = require('./s1customer.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.show);

module.exports = router;
