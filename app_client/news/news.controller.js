(function () {

  angular
    .module('sitePUSH')
    .controller('newsCtrl', newsCtrl);

  newsCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function newsCtrl ($scope, getData, saveNewsId) {

    getData.oneNew(saveNewsId.get())
      .then(function (data){
        $scope.newTopTitle = data.data.topTitle;
        $scope.newTitle = data.data.title;
        $scope.newdescription = data.data.description;
        $scope.myInterval = 10000;
        $scope.slides = data.data.stills;
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