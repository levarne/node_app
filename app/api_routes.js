var Makes = require('./models/Make.js');
var Models = require('./models/Model.js');

var http = require('http');

var api = {
            uri : 'api.edmunds.com',
            endpoint : '/api/vehicle/v2',
            application : 'SpecMyRide',
            key : 'b7kp2kkvy955cmtjqjgnbesy',
            rate_limit : {
                call_per_second : 10,
                call_per_day : 5000
            }
          }

exports.getEdmundsMakes = function(req, res, next){
    // https://api.edmunds.com/api/vehicle/v2/makes?view=full&fmt=json&api_key=b7kp2kkvy955cmtjqjgnbesy

    //get all makes
    var options = {
        host: api.uri,
        port: 80,
        path: api.endpoint + '/makes?view=full&fmt=json&api_key=' + api.key,
        method: 'GET',
    };

    recreateDataResponse(Makes, options, function(err, data){
        if(err) {
            res.send(err);
        }

        res.json({
            'result' : 'ok',
            'data' : data
        });
    });
};

exports.getEdmundsModel = function(params, callback){
    // https://api.edmunds.com/api/vehicle/v2/bmw/models?view=full&fmt=json&api_key=b7kp2kkvy955cmtjqjgnbesy

    //get specific model
    var options = {
        host: api.uri,
        port: 80,
        path: api.endpoint + '/' + params.name +'/models?view=full&fmt=json&api_key=' + api.key,
        method: 'GET',
    };

    console.log('options uri ', options.path);
    getData = function(responseData) {
        var api_data = '';

        responseData.on('data', function (chunk) {
            api_data += chunk;
        });

        responseData.on('end', function () {
            var jsonData = JSON.parse(api_data);

            Models.create(jsonData.models, function(err){
                console.info('saving collection documents...');
                if(err) {
                    callback(err);
                }

                callback(null, {
                    'result' : 'ok',
                    'data' : jsonData.models
                })
            });
        });
    }

    http.request(options, getData).end();
};

function recreateDataResponse(collection, options, callback){
    getData = function(responseData) {
        var api_data = '';

        responseData.on('data', function (chunk) {
            api_data += chunk;
        });

        responseData.on('end', function () {
            var jsonData = JSON.parse(api_data);

            collection.remove({}, function(err){
                console.info('Removing collection documents...');
                if(err){
                    res.send(err);
                }

                collection.create(jsonData.makes, function(err){
                    console.info('Recreating collection documents...');
                    if(err) {
                        callback(err);
                    }

                    console.info('Done recreating collection documents...');
                    callback(null, jsonData.makes);
                })
            });
        });
    }

    http.request(options, getData).end();
}