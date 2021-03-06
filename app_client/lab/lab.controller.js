(function () {

  angular
    .module('sitePUSH')
    .controller('labCtrl', labCtrl);

 

  labCtrl.$inject = ['$scope', 'getData'];
  function labCtrl ($scope, getData) {

    getData.lab()
        .then(function (data){
            $scope.lab = data;
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