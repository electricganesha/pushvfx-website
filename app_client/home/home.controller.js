(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {
    var vm = this;
    getData.latestwork()
        .success(function(data) {
          vm.data = { projects: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();