'use strict';

module.exports = function(app) {

  app.use('/youtube', require('../controllers/youtube'));

	app.route('/*').get(function(req, res) {
		res.send(`Let's run baby...`);
	});
};