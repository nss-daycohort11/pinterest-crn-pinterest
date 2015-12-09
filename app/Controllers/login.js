/// this module allows the user to log in/register with email and password for the website ///

contentBoxApp.controller('login', ["$scope", "Auth",
  function($scope, Auth) {
  	console.log("I see login!!");
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

    /// registering with email/password - firebase then creates a unique id for this user to keep their profiles for future use ///
      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
      	var uid = userData.uid;
      	console.log("user created. User id:", userData.uid);
        $scope.message = "User created with uid: " + userData.uid;
        var newfbRef = new Firebase("https://crn-pinterest.firebaseio.com/users/" + uid);
		    var userData = {
		    	"user": uid,
		    	"email": $scope.email,
		    	"password": $scope.password
		    };
		    /// sets the new user data object to the firebase database ///
		    newfbRef.set(userData);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    /// leaving email and password an empty string so what user inputs can then be saved to the database //
    $scope.email = "";
    $scope.password = "";

    /// if user has already registered, this allows them to log in without complications ///
    $scope.login = function() {
	    var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
			ref.authWithPassword({
	  		email    : $scope.email,
	  		password : $scope.password
			}, function(error, authData) {
		  	if (error) {
		    	console.log("Login Failed!", error);
		  	} else {
		    	console.log("Authenticated successfully with payload:", authData);
		  	}
			});
	  }
  }
]);