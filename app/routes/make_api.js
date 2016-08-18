//get our database
var Makes = require('../models/Make.js');

exports.getMakes = function(req, res, next) {
	Makes.find(function(err, makes){
		if(err){
			res.send(err);
		}

		res.json({
			'result' : 'ok',
			'data' : makes
		});
	});
};

exports.addMakes = function(req, res, next) {
	var makes = new Makes();

	makes.name = req.body.name;

	makes.save(function(err){
		if(err){
			res.send(err);
		}

		res.json({
			'result' : 'ok',
			'message' : 'Make created'
		});
	});
};