angular.module('NerdService', [])

.factory('Nerd', ['$http', function($http){

	return {
		//get all nerds
		get : function(){
			return $http.get('/api/nerds');
		},
		/**
		 * @params object_id
		 */
		delete : function(id){
			return $http.delete('/api/nerds/' + id);
		},
		/**
		 * @params post data
		 */
		create : function(nerdData){
			return $http.post('/api/nerds/', nerdData);
		}
	}

}])