(function () {

  angular
    .module('sitePUSH')
    .controller('categoryCtrl', categoryCtrl);

  categoryCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function categoryCtrl ($scope, getData, saveNewsId) {

    getData.category(saveNewsId.get())
      .then(function (data){
        $scope.title = data.data.title;
        $scope.description = data.data.description;
        $scope.myInterval = 10000;
        $scope.slides = data.data.stills;
        $scope.links = data.data.links;

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