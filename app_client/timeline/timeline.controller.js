(function () {

  angular
    .module('sitePUSH')
    .controller('timelineCtrl', timelineCtrl);

 

  timelineCtrl.$inject = ['$scope', 'getData'];
  function timelineCtrl ($scope, getData) {

    getData.lastSixNews()
      .then(function (data){
        console.log(data);
        $scope.lastNews = data;
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
