angular.module('myApp', [
	'ngRoute',
	'myApp.services',
	'myApp.directives'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'templates/main.html',
	})
	.otherwise({
		redirectTo: '/'
	});
});