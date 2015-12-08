contentBoxApp.controller('GridCtrl', ["currentAuth", "$scope", "$firebaseArray", "$firebaseObject", function(currentAuth, $scope, $firebaseArray, $firebaseObject) {
   console.log("got into GridCtrl!", currentAuth); 
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

  var regex;
  $scope.escapeRegExp = function(string){
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  var userRef = new Firebase("https://crn-pinterest.firebaseio.com/users/" + currentAuth.uid);

  var userData = $firebaseObject(userRef);

  console.log("userData", userData);
  
  $scope.userData = userData;


  var allPinsRef = new Firebase("https://crn-pinterest.firebaseio.com/allPins")

  $scope.gridItems = $firebaseArray(allPinsRef);

  var userBoardsRef = new Firebase("https://crn-pinterest.firebaseio.com/users/" + currentAuth.uid + "/boards")

  $scope.addPin = function() {
    console.log("description:", event.target.attributes.description.nodeValue);
    console.log("you clicked add pin!");
    console.log("evnet", event);
    console.log("event.target", event.target);
    console.log("event.target.title", event.target.title);
    console.log("event.target.imageUrl", event.target.attributes.imageurl.nodeValue);

    var newBoard = {
      "headerText": event.target.title,
      "blurbText": event.target.attributes.description.nodeValue,
      "img": event.target.attributes.imageurl.nodeValue
    }
    console.log("newBoard", newBoard);

    userRef.child("boards").push(newBoard);
  }
  
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