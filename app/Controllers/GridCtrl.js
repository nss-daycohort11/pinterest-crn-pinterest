contentBoxApp.controller('GridCtrl', ["currentAuth", "$scope", "$firebaseArray", function(currentAuth, $scope, $firebaseArray) {
   console.log("got into GridCtrl!", currentAuth); 
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

  var regex;
  $scope.escapeRegExp = function(string){
      return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

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