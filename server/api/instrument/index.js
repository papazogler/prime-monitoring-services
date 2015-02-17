'use strict';

var express = require('express');
var controller = require('./instrument.controller.js');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/file/:fileId', auth.isAuthenticated(), controller.getFile);
router.get('/:id/spares', auth.isAuthenticated(), controller.spares);
router.get('/:id/serials', auth.isAuthenticated(), controller.serials);

module.exports = router;
