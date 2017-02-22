(function () {

  angular
    .module('sitePUSH')
    .directive('pageFooter', pageFooter);

  function pageFooter () {
    return {
      restrict: 'EA',
      scope: {
        content : '=content'
      },
      templateUrl: '/common/directives/pageFooter/pageFooter.template.html'
    };
  }

})();