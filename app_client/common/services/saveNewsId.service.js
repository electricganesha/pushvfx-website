(function() {

  angular
    .module('sitePUSH')
    .service('saveNewsId', saveNewsId);

  function saveNewsId () {

    var savedData = {};

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }


    return {
        set: set,
        get: get
    };
  }

})();