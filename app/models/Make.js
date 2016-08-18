// grab the mongoose module

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelsScheme = new Schema({
	_id : {},
	id : {type : String, default: '', index : true},
	name : {type : String, default: ''},
	niceName : {type : String, default: '', index : true},
	years : [
		{
			_id : {},
			id : {type : Number},
			year : {type : Number}
		}
	]
});

var makeSchema = new Schema({
	id : {type : Number},
	name : {type : String, default: ''},
	niceName : {type : String, default: ''},
	models : [modelsScheme]
});


module.exports = mongoose.model('Make', makeSchema);
