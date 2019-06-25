'use strict';

var express = require('express');
var router = express.Router();

var fbCtrl = require('./facebook.controller');

router.get('/getUrl', fbCtrl.getUrl);

module.exports = router;