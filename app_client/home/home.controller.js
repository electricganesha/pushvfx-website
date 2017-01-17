(function () {

  angular
    .module('sitePUSH')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {
    var vm = this;
    vm.pageHeader = {
      title: 'PUSH',
      strapline: 'PUSH YOURSELF TO NEW IDEAS'
    };
    vm.sidebar = {
      content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for."
    };
    vm.message = "Checking your location";

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();