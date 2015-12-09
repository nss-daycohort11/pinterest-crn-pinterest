/// this module pulls together all other modules for data to be injected into the index.html when user adds info to their database ///

var contentBoxApp = angular.module('contentBoxApp', ['ngRoute', 'firebase']);

contentBoxApp.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/home");
  }
});
}]);

contentBoxApp.config(["$routeProvider", function($routeProvider) {
$routeProvider
.when('/pinster/login', {
      templateUrl: 'Partials/login.html',
      controller: 'login'
    })
.when('/pinster/user', {
      templateUrl: 'Partials/userBoards.html',
      controller: 'userBoards'
    })
.when('/pinster/main', {
  // the rest is the same for ui-router and ngRoute...
  controller: "GridCtrl", 
  templateUrl: 'Partials/main.html'
})
.otherwise('/pinster/login');
;
}]);
