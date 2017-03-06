(function () {

  angular
    .module('sitePUSH')
    .controller('disclaimerCtrl', disclaimerCtrl);

 

  disclaimerCtrl.$inject = ['$scope', 'getData'];
  function disclaimerCtrl ($scope, getData) {
    
    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();