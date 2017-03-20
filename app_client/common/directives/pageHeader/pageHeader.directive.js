(function () {

  angular
    .module('sitePUSH')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    var controller = function () {  
          var vm = this;
           
          var viewportWidth = $(window).width();

          if (viewportWidth < 768){
              vm.MobileTemplate = true;
          }else{
              vm.MobileTemplate = false;
          }
      };    
    
    return {
      restrict: 'EA',
      controller: controller,
      controllerAs: 'vm',
      templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
    };
  }

})();