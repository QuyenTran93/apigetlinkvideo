'use strict';

var _ = require('lodash');
var youtubedl = require('youtube-dl');

exports.regexUrl = /^(((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?\$)|([a-zA-Z0-9_-]{11})/;

exports.getInfoAsync = (uri, options) => {
  // Optional arguments passed to youtube-dl.
  // options = ['--username=user', '--password=hunter2'];
  !options || !_.isArray(options) && (
    options = []
  );
  return new Promise((resolve, reject) => {
    youtubedl.getInfo(uri, options, (err, info) => {
      if (err)
        reject(err);
      else
        resolve(info);
    });
  });
};