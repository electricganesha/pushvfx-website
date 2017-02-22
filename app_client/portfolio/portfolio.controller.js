(function () {

  angular
    .module('sitePUSH')
    .controller('portfolioCtrl', portfolioCtrl);

  portfolioCtrl.$inject = ['$scope', 'getData'];
  function portfolioCtrl ($scope, getData) {
    var vm = this;

    /*vm.choice = 0;

    switch(choice)
    {
        case(0):
            vm.data = { film: data };
        break;
        case(1):
            vm.data = { interactive: data };
        break;
    }

    getData.latestwork()
      .then(function (data){
        vm.data = { bestprojects: data };
      },function (error){
        vm.message = "Sorry, something's gone wrong, please try again later";
      });*/

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();