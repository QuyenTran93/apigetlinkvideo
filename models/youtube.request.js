'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
  'url_request': String,
  'number_request': { type: Number, default: 0 },
  //  info video
  'id': String,
  'display_id': String,
  'title': String,
  'fulltitle': String,
  'duration': String,
  'filezie': Number
  'url_video': String,
  'created_at': { type: Date, default: Date.now },
  'updated_at': { type: Date, default: Date.now }
});

module.exports = mongoose.model(global.'_member_holding_coinbases', modelSchema);