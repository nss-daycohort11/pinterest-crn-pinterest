var app = angular.module("app", ['ngRoute', 'firebase']);

app.config(['$routeProvider',
  function($routeProvider) {
  	$routeProvider.
  		when('/app/login', {
  		templateUrl: 'partials/login.html',
  		controller: 'loginCtrl'
  	})
		.otherwise('/app/login');

    
  }]);