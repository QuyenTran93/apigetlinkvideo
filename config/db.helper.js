'use strict';

var mongoose = require('mongoose');
var dbConfig = global.config.dbConfig;

var prepareConnectionUri = () => {
  var dbStringUri = 'mongodb://';
  if (dbConfig.settings.user != '')
    dbStringUri += `${dbConfig.settings.user}:${dbConfig.settings.password}@`;
  dbStringUri += `${dbConfig.settings.address}:${dbConfig.settings.port}/${dbConfig.settings.database}`;

  if (!!dbConfig.settings.replicaSet) {
    dbStringUri += `?replicaSet=${dbConfig.settings.replicaSet}`; //using for replication db - DON'T REMOVE IT
  }
  return dbStringUri;
}

exports.makeConnectionDb = () => {
  var stringUri = prepareConnectionUri();

  mongoose.connect(stringUri, dbConfig.options, function(err) {
    if (err) {
      console.error('MongoDB connection error: ' + err);
      process.exit(-1);
    }
  });

  mongoose.connection.on('connected', function() {
    console.info('MongoDB event connected');
  });

  mongoose.connection.on('disconnected', function() {
    console.warn('MongoDB event disconnected');
  });

  mongoose.connection.on('reconnected', function() {
    console.info('MongoDB event reconnected');
  });

  mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });
}