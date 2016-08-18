var Logger = require('arsenic-logger');
/**
 * /api/makes -> GET -> get all vehicl makes
 * /api/makes -> POST -> create a vehicle makes
 * /api/makes/:make_id -> GET -> get a single make
 * /api/makes/:make_id -> PUT -> update a make
 * /api/makes/:make_id -> DELETE -> delete a make
 */

var makeApi = require('./routes/make_api.js');
var modelApi = require('./routes/model_api.js');

var api_req = require('./api_routes.js');

module.exports = function(apiRouter){

	//middle wear for all our routes
	apiRouter.use(function(req, res, next){
		Logger.info('Something is requesting from our api');
		Logger.info('Something is requesting from our api');
		next();
	});

	/**
	 * @req post
	 * @req get
	 */
	apiRouter.post('/makes', makeApi.addMakes)

	apiRouter.get('/makes', makeApi.getMakes);

	/**
	 * @params make_slug
	 * @params model_slug
	 * 
	 * @req get
	 * @req put
	 * @req delete
	 */
	apiRouter.get('/makes/:make/:model/:id', modelApi.getModel);
	apiRouter.get('/makes/:make/:model', modelApi.getModel);

	/**
	 * Api calls made to edmunds to gather data
	 * get all makes
	 */
	apiRouter.get('/edmunds/makes/', api_req.getEdmundsMakes);

	/**
	 * defualt route
	 * 
	 * @req get
	 */
	apiRouter.get('/', function(req, res){
		res.json({message: 'Hooray, my spec rider api is working'});
	})
};