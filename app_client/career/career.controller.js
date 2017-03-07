(function () {

  angular
    .module('sitePUSH')
    .controller('careerCtrl', careerCtrl);

 

  careerCtrl.$inject = ['$scope', 'getData'];
  function careerCtrl ($scope, getData) {
    $scope.showjobs = false;
    getData.jobs()
        .then(function (data){
            if(data.lenght != 0){
                $scope.showjobs = true;
                $scope.jobs = data;
                $scope.info1 = "Would you like to join PUSH?";
                $scope.info2 = "Send us your CV or give us a call. In the meanwhile, you can check our job openings below";
            }else{
                $scope.showjobs = false;
                $scope.info1 = "Would you like to join PUSH?";
                $scope.info2 = "Currently we have no open positions, but we’re always happy to receive your CV or your phone call, so don’t hesitate!";
            }
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