(function () {

  angular
    .module('sitePUSH')
    .controller('portfolioCtrl', portfolioCtrl);

  portfolioCtrl.$inject = ['$scope', 'getData'];
  function portfolioCtrl ($scope, getData) {
    var vm = this;
    
    var choice = "Film";
    getData.portfolio(choice)
      .then(function (data){
        vm.data = { portfolio: data };
      },function (error){
        vm.message = "Sorry, something's gone wrong, please try again later";
      });

    vm.selectMenu = function(choice)
    {
      getData.portfolio(choice)
        .then(function (data){
          vm.data = { portfolio: data };
        },function (error){
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    }

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();