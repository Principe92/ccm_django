(function () {
  'use strict';

  angular
    .module('turnos.config')
    .config(config)

  config.$inject = ['$locationProvider', '$httpProvider', '$interpolateProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider, $httpProvider, $interpolateProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Change content type for POST so Django gets correct request object
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
  }

})();
