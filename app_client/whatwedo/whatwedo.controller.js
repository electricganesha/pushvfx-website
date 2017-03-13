(function () {

  angular
    .module('sitePUSH')
    .controller('whatwedoCtrl', whatwedoCtrl);

 

  whatwedoCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function whatwedoCtrl ($scope, getData, saveNewsId) {

    getData.whatwedo()
        .then(function (data){
            $scope.categories = data;
        },function (error){
            $scope.message = "Sorry, something's gone wrong, please try again later";
        });

    $scope.saveId = function(id){
      saveNewsId.set(id);
    }
    
    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };
  }

})();