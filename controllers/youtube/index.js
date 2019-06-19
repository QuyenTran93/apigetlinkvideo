'use strict';

var express = require('express');
var router = express.Router();

var youtubeCtrl = require('./youtube.controller');

router.get('/getUrl', youtubeCtrl.getUrl);

module.exports = router;