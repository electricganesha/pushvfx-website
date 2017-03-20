(function () {

  angular
    .module('sitePUSH')
    .controller('portfolioCtrl', portfolioCtrl);

  portfolioCtrl.$inject = ['$scope', 'getData', 'saveNewsId'];
  function portfolioCtrl ($scope, getData, saveNewsId) {
    
    var choice = "All";
    if(choice == "All"){
      getData.allPortfolio()
      .then(function (data){
        $scope.category = choice;
        $scope.portfolio = data;
        $scope.still = 'stillBigAll';
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
    }

    $scope.saveId = function(id){
      saveNewsId.set(id);
    }

    $scope.selectMenu = function(choice)
    {
      if(choice == "All"){
        getData.allPortfolio()
          .then(function (data){
            $scope.category = choice;
            $scope.portfolio = data;
            $scope.still = 'stillBigAll';
          },function (error){
            $scope.message = "Sorry, something's gone wrong, please try again later";
          });
      }else{
        getData.portfolio(choice)
        .then(function (data){
          $scope.category = choice;
          $scope.portfolio = data;
          switch($scope.category){
            case "Film":
              $scope.still = 'stillBigFilm';
              break;
            case "Interactive":
              $scope.still = 'stillBigInteractive';
              break;
            case "Animation":
              $scope.still = 'stillBigAnimation';
              break;
          }
        },function (error){
          $scope.message = "Sorry, something's gone wrong, please try again later";
        });
      }
    }

    $scope.showError = function (error) {
      $scope.$apply(function() {
        $scope.message = error.message;
      });
    };

  }

})();