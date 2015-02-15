/**
* GroupController
* @namespace turnos.group.controllers
*/
(function () {
  'use strict';

  angular
    .module('turnos.controllers')
    .controller('MainController', MainController);

  MainController.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log'];

  /**
  * @namespace GroupController
  */
  function MainController($rootScope, $scope, $http, Groups, $log) {
    var vm = this;
  }
})();
