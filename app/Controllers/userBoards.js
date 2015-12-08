contentBoxApp.controller('userBoards', ["currentAuth", "$scope", "$firebaseArray", "$firebaseObject", function(currentAuth, $scope, $firebaseArray, $firebaseObject) {
   console.log("got into user boards!", currentAuth); 
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

  var regex;
  $scope.escapeRegExp = function(string){
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  $scope.addBoardModal = false;

  $scope.showAddBoardModal = function() {
    console.log("you clicked on the add board modal!");
    $scope.loggingIn = true;
  }

  var userRef = new Firebase("https://crn-pinterest.firebaseio.com/users/" + currentAuth.uid);

  $scope.userData = $firebaseObject(userRef);

  console.log("userData", $scope.userData);

  $scope.$watch('loggingIn', function() {
    if ($scope.loggingIn) {

      var cat = $("#loginModal");
      console.log("cat", cat)
      cat.modal('show');
      $scope.loggingIn = false;
    };
  });

  //variables for create-board modal input fields
  $scope.title = "";
  $scope.imageurl = "";
  $scope.description = "";

  //on click of "save" in modal, create new object
  //with user's input data to post under user's key in firebase
  $scope.createNewBoard = function() {
    console.log("you clicked save!");

    var newBoard = {
      "headerText": $scope.title,
      "blurbText": $scope.description,
      "img": $scope.imageurl
    }
    console.log("newBoard", newBoard);


    userRef.child("boards").push(newBoard);

  }


  
  //$scope.userData = userData;


  var allPinsRef = new Firebase("https://crn-pinterest.firebaseio.com/allPins")

  $scope.gridItems = $firebaseArray(allPinsRef);
  
  $scope.search = '';
  $scope.$watch('search', function (value) {
      regex = new RegExp('\\b' + $scope.escapeRegExp(value), 'i');
  });
  $scope.filterBySearch = function(gridItem) {
      if (!$scope.search) return true;
      return regex.test(gridItem.headerText + " " + gridItem.blurbText);
  };
  $scope.toggleBlurb = function($event) {
    console.log($event);
  };

}]);