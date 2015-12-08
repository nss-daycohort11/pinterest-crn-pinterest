var contentBoxApp = angular.module('contentBoxApp', ['ngRoute', 'firebase']);

contentBoxApp.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
    console.log("I see Auth!!");
    var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

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
.when('/pinster/main', {
  // the rest is the same for ui-router and ngRoute...
  controller: "AccountCtrl",
  templateUrl: 'Partials/partial1.html',
  resolve: {
    // controller will not be loaded until $requireAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above
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


contentBoxApp.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
   console.log("got into AccountCtrl!", currentAuth); 
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
}]);






// contentBoxApp.run(["$rootScope", "$location", function($rootScope, $location) {
// $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
//   // We can catch the error thrown when the $requireAuth promise is rejected
//   // and redirect the user back to the home page
//   if (error === "AUTH_REQUIRED") {
//     $location.path("/home");
//   }
// });
// }]);

// contentBoxApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//     when('/pinster/main', {
//       templateUrl: 'Partials/main.html',
//       controller: 'GridCtrl',
//       resolve: {
//       // controller will not be loaded until $requireAuth resolves
//       // Auth refers to our $firebaseAuth wrapper in the example above
//       "currentAuth": ["Auth", function(Auth) {
//       // $requireAuth returns a promise so the resolve waits for it to complete
//       // If the promise is rejected, it will throw a $stateChangeError (see above)
//       return Auth.$requireAuth();
//     }]
//   }
//     })
//     .when('/pinster/login', {
//       templateUrl: 'Partials/login.html',
//       controller: 'login'
//     })
//     .otherwise('/pinster/login.html');

//   }]);
