var express = require('express');
var app = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var Logger = require('arsenic-logger');

// grab the mongoose module
var mongoose = require('mongoose');

// config files
var db = require('./config/db');

var  port = process.env.PORT || 8080;

// connect to our mongoDB database
mongoose.connect(db.url, function(err){
	if(err) {
		Logger.info('FAILED TO CONNECT TO MONGO');
	} else {
		Logger.info('Connected to mongo at: ', db.url);
	}
});

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

var router = express.Router();
require('./app/routes')(router); // configure our routes

app.use('/api', router);

// startup our app at http://localhost:8080
app.listen(port, function() {
	// shoutout to the user
	Logger.info('Server listening on port ' + port);
});

// expose app
exports = module.exports = app;
