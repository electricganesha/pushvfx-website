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
          $scope.portfolio = data;
          switch(choice){
            case "Film":
              $scope.still = 'stillBigFilm';
              $scope.category = choice;
              break;
            case "Interactive":
              $scope.still = 'stillBigInteractive';
              $scope.category = "VR/INTERACTIVE";
              break;
            case "Animation":
              $scope.still = 'stillBigAnimation';
              $scope.category = "3D ANIMATION";
              break;
            case "Motion Graphics":
              $scope.still = 'stillBigMotion';
              $scope.category = choice;
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
