(function () {

  angular
    .module('sitePUSH')
    .controller('contactsCtrl', contactsCtrl);

 

  contactsCtrl.$inject = ['$scope', 'getData'];
  function contactsCtrl ($scope, getData) {
    
    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();