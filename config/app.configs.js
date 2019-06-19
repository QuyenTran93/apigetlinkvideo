'use strict';

var morgan = require('morgan');
var mongoose = require('mongoose');

var dbHelper = require('./db.helper');

morgan.token('pid', (req, res) => {
  getClientIp4(req);
  return _.get(req, 'user._id') || 'Guest';
});

morgan.format('myformat', ':remote-addr - :pid[:date[iso]] ":method :url HTTP/:http-version" :res[content-length] ":referrer" :status = :response-time ms');


module.exports = (app) => {
  //  using morgan
  app.use(morgan('dev'));
  // app.use(morgan('myformat'));

  //  connection to mongodb
  // dbHelper.makeConnectionDb();
};