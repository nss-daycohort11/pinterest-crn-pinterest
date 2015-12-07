// var app = angular.module("app", ['ngRoute', 'firebase', 'angular.filter']);

// app.config(['$routeProvider',
//   function($routeProvider) {

    
//   }]);

var contentBoxApp = angular.module('contentBoxApp', ['ngRoute']);

contentBoxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/pinster/main', {
      templateUrl: 'partials/main.html',
      controller: 'GridCtrl'
    })
    .otherwise('/pinster/main');

  }]);
