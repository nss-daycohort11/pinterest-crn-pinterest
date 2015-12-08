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
      controller: 'GridCtrl',
      resolve: {
    // controller will not be loaded until $requireAuth resolves
    "currentAuth": ["Auth", function(Auth) {
      console.log("running currentAuth!");
      // $requireAuth returns a promise so the resolve waits for it to complete
      // If the promise is rejected, it will throw a $stateChangeError (see above)
      return Auth.$requireAuth();
    }]
  }
    })
.when('/pinster/main', {
  // the rest is the same for ui-router and ngRoute...
  controller: "GridCtrl",
  templateUrl: 'Partials/main.html',
  resolve: {
    // controller will not be loaded until $requireAuth resolves
    "currentAuth": ["Auth", function(Auth) {
      console.log("running currentAuth!");
      // $requireAuth returns a promise so the resolve waits for it to complete
      // If the promise is rejected, it will throw a $stateChangeError (see above)
      return Auth.$requireAuth();
    }]
  }
})
.otherwise('/pinster/login.html');
;
}]);





