
contentBoxApp.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
  	console.log("I see Auth!!");
    var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);