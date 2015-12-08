contentBoxApp.controller('login', ["$scope", "Auth",
  function($scope, Auth) {
  	console.log("I see login!!");
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

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
		    // sets new user data object to firebase
		    newfbRef.set(userData);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.removeUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$removeUser({
        email: $scope.email,
        password: $scope.password
      }).then(function() {
        $scope.message = "User removed";
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.email = "";
    $scope.password = "";

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