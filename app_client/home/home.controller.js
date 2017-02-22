(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'getData'];
  function homeCtrl ($scope, getData) {
    var vm = this;

    getData.latestwork()
      .then(function (data){
        vm.data = { bestprojects: data };
      },function (error){
        vm.message = "Sorry, something's gone wrong, please try again later";
      });

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();