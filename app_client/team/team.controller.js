(function () {

  angular
    .module('sitePUSH')
    .controller('teamCtrl', teamCtrl);

 

  teamCtrl.$inject = ['$scope', 'getData'];
  function teamCtrl ($scope, getData) {

    getData.getinstaphotos()
      .then(function (data){
        $scope.instaphotos = data;
        console.log(data);
        $scope.$apply();
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    getData.teammembers()
      .then(function (data){
        $scope.teammembers = data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();