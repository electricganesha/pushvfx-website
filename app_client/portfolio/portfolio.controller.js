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
        $scope.still = 'stillBigFilm';
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
          switch($scope.category){
            case "Film":
              $scope.still = 'stillBigFilm';
              console.log("Film");
              break;
            case "Interactive":
              $scope.still = 'stillBigInteractive';
              console.log("Interactive");
              break;
            case "Animation":
              $scope.still = 'stillBigAnimation';
              console.log("Animation");
              break;
          }
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