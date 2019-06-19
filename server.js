'use strict';

var express = require('express');
global.config = require('./config/environment');

var app = express();

//	require
require('./config/app.configs')(app);
require('./config/app.routers')(app);

app.listen(global.config.port, (err) => {
	if (err)
		return console.log('Something bad happened', err);
	console.log(`API is listening on ${global.config.port}`);
});