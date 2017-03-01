(function () {

  angular
    .module('sitePUSH')
    .controller('newsCtrl', newsCtrl);

  newsCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function newsCtrl ($scope, getData, saveNewsId) {

    getData.oneNew(saveNewsId.get())
      .then(function (data){
        console.log(data);
        $scope.new = data;
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