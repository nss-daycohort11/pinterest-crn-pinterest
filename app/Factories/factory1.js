/// factory is used for a central location, where other modules can check the auth data for users, it's called as a dependencies in our app.js file ///

contentBoxApp.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
  	console.log("I see Auth!!");
    var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);