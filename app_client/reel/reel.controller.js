(function () {

  angular
    .module('sitePUSH')
    .controller('reelCtrl', reelCtrl);

 

  reelCtrl.$inject = ['$scope', 'getData'];
  function reelCtrl ($scope, getData) {
    var choice;
    
    getData.reels()
      .then(function (data){
        $scope.reels = data;
      },function (error){
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });

    $scope.selectMenu = function(choice)
    {
        if(choice == "ALL"){
           getData.reels()
                .then(function (data){
                    $scope.reels = data;
                },function (error){
                    $scope.message = "Sorry, something's gone wrong, please try again later";
                }); 
        }else{
            getData.reelsByCat(choice)
                .then(function (data){
                    $scope.category = choice;
                    $scope.reels = data;
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