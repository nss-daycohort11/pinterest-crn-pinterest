var app = angular.module("app", ['ngRoute', 'firebase']);

app.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider
   .when('/login', {
       templateUrl: 'Partials/login.html',
       controller: 'ctrl1'
     })
     .otherwise({ redirectTo: '/login' });
 }]);

