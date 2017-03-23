(function () {

  angular
    .module('sitePUSH')
    .controller('whatwedoCtrl', whatwedoCtrl);



  whatwedoCtrl.$inject = ['$scope', 'getData'];
  function whatwedoCtrl ($scope, getData) {

    getData.whatwedo()
        .then(function (data){
            $scope.categories = data;
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
