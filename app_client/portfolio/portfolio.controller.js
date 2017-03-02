(function () {

  angular
    .module('sitePUSH')
    .controller('portfolioCtrl', portfolioCtrl);

  portfolioCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function portfolioCtrl ($scope, getData, saveNewsId) {
    
    var choice = "Film";
    getData.portfolio(choice)
      .then(function (data){
        $scope.category = choice;
        $scope.portfolio = data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    $scope.saveId = function(id){
      saveNewsId.set(id);
    }

    $scope.selectMenu = function(choice)
    {
      getData.portfolio(choice)
        .then(function (data){
          $scope.category = choice;
          $scope.portfolio = data;
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });
    }

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

  }

})();