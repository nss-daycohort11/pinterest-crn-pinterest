contentBoxApp.controller('userBoards', ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray, $firebaseObject) {
   console.log("got into user boards!"); 
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

  var ref = new Firebase("https://crn-pinterest.firebaseio.com/");
  var currentAuth = ref.getAuth();

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
  var allPinsRef = new Firebase("https://crn-pinterest.firebaseio.com/allPins/");

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
  $scope.url = "";

  //on click of "save" in modal, create new object
  //with user's input data to post under user's key in firebase
  $scope.createNewBoard = function() {
    console.log("you clicked save!");

    var newBoard = {
      "headerText": $scope.title,
      "blurbText": $scope.description,
      "img": $scope.imageurl,
      "url": $scope.url
    }

    console.log("newBoard", newBoard);

    allPinsRef.push(newBoard);
    userRef.child("boards").push(newBoard);
    $("#loginModal").modal("hide");

  }

  // userBoardsRef is the Firebase ref to given users "boards" object
  var userBoardsRef = new Firebase("https://crn-pinterest.firebaseio.com/users/" + currentAuth.uid + "/boards");

  //grid items variable used to populate userBoards partial
  $scope.gridItems = $firebaseArray(userBoardsRef);
  
  //searching function on main page:
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