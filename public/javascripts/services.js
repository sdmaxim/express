angular.module('myApp.services', [])
.factory('HitService', function($q, $http) {
	return {
		count: function() {
			var d = $q.defer();
			$http.get('/hits')
			.success(function(data, status) {
				d.resolve(data.hits);
			}).error(function(data, status) {
				d.reject(data);
			});
			return d.promise;
		},
		registerHit: function() {
			var d = $q.defer();
			$http.post('/hit', {})
			.success(function(data, status) {
				d.resolve(data.hits);
			}).error(function(data, status) {
				d.reject(data);
			});
			return d.promise;
		}
	}
})
.factory('authService', function(){
	return {
		login : function (){
			var d = $q.defer();
			$http.post('/login', {})
			.success(function(data, status) {
				d.resolve(data.hits);
			}).error(function(data, status) {
				d.reject(data);
			});
			return d.promise;
		}
	}
});