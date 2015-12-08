app.controller("loginCtrl", ["$scope", "$firebaseAuth", 
	function ($scope, $firebaseAuth) {
	console.log("contoller is linked");
  	//login
  	$scope.facebookLogin = function () {
		var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
	 	// create an instance of the authentication service
	  	var auth = $firebaseAuth(ref);
  		auth.$authWithOAuthPopup("facebook")
  		.then(function (authData){
  			console.log("logged in as:", authData.uid);
  		}).catch(function(error){
  			console.log("authentication failed:", error);
  		});
  	};
}]); //end of contoller

