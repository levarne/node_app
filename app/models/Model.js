
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
	id : {type : String, default: '', index : true},
	name : {type : String, default: ''},
	niceName : {type : String, default: '', index : true},
    make : {
        _id : {},
        name : {type : String, default: ''},
        niceName : {type : String, default: ''}
    },
    years : [
        {
            _id : {},
            id : {type : Number},
            year : {type : Number},
            styles : [
                {
                    _id : {},
                    id : {type : Number},
                    name : {type : String, default: ''},
                    trim : {type : String, default: ''},
                    submodel : {
                            body : {type : String, default: ''},
                            modelName : {type : String, default: ''},
                            niceName : {type : String, default: ''}
                    },
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Model', modelSchema);