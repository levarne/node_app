var Logger = require('arsenic-logger');

var Models = require('../models/Model.js');
var api_req = require('../api_routes.js');

exports.getModel = function(req, res, next) {
	Logger.info('**** getModel ****');
	//get a make
	var makeNiceName = req.params.make,
		modelNiceName = req.params.model,
		modelId = req.params.id;

	//one nice name can belong to many models
	
	Logger.debug('makeNiceName ', makeNiceName);
	Logger.debug('modelNiceName ', modelNiceName);

	var query = {
		niceName : modelNiceName,
		'make.niceName' : makeNiceName
	}

	if(modelId) {
		query = {
			id : modelId
		}

		Logger.debug('modelId ', modelId);
	}

	Models.find(query, function(err, models){
		if(err){
			res.send(err);
		}

		if(models.length === 0){
			Logger.warn('Requested make not found. Searching Edmunds');

			var params = {name : makeNiceName};

			api_req.getEdmundsModel(params, function(err, data){
				if(err){
					res.send(err);
				}

				res.json(data);
			});
		} else {
			res.json({
				'result' : "ok",
				'data' : models
			});
		}
		
	});

	Logger.info('**** End ****');
};