var app = angular.module("app", ['ngRoute', 'firebase', 'angular.filter']);

app.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider
   .when('/login', {  // when URL ends with this
       templateUrl: 'Partials/login.html',  // location of template
       controller: 'ctrl1.js'  // name of controller (songCtrl.js)
     })
     .otherwise({ redirectTo: '/login' });
 }]);

