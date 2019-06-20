'use strict';

module.exports = function(app) {

  app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.log('Bad Request');
      return res.status(400).send('Bad Request')
    }
    var errTmp = null;
    try {
      decodeURIComponent(req.path)
    } catch (e) {
      errTmp = e;
    }
    if (errTmp) {
      console.log('Request error URI malformed', req.url);
      return res.status(400).send('Request error URI malformed')
    }
    next();
  });

  app.use('/youtube', require('../controllers/youtube'));

  app.route('/*').get(function(req, res) {
    res.send(`Let's run baby...`);
  });
};