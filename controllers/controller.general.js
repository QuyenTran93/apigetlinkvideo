'use strict';

var request = require('request').defaults({ 'encoding': null });

exports.requestPromise = (option) => {
  return new Promise((resolve, reject) => {
    request(option, (error, response, body) => {
      resolve({
        'error': error,
        'response': response,
        'body': body
      });
    });
  });
}