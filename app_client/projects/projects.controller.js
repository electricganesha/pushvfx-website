(function () {

  angular
    .module('sitePUSH')
    .controller('projectsCtrl', projectsCtrl);

 

  projectsCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function projectsCtrl ($scope, getData, saveNewsId) {

    console.log(saveNewsId.get());
    
    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();