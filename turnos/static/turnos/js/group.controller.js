/**
* GroupController
* @namespace turnos.group.controllers
*/
(function () {
  'use strict';

  angular
    .module('turnos.group.controllers')
    .controller('GroupController', GroupController);

  GroupController.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log'];

  /**
  * @namespace GroupController
  */
  function GroupController($rootScope, $scope, $http, Groups, $log) {
    var vm = this;

    var defaultForm = {
      title : "",
      newRole_1 : "",
      newRole_2 : "",
      newRole_3 : ""
    };

    $scope.groups = [];

    activate();

    // Submit a form
    $scope.submitForm = submit;

    // Clear a form
    $scope.clearForm = clear;

    function clear(new_group){
      //make the record pristine
      $scope.groupForm.$setPristine();
      $scope.new_group = angular.copy(defaultForm);
    }



    function submit(){
    // $scope.closeDialog();
      Groups.create($scope.new_group).then(createSuccessFn, createErrorFn);
    }

     /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.layout.controllers.IndexController
    */
    function activate() {
      Groups.all().then(groupsSuccessFn, groupsErrorFn);

      $scope.$on('group.created', function (event, post) {
        console.log('post: ' , post);
        $scope.groups.push(post);
      });

      $scope.$on('group.created.error', function () {
        $scope.groups.pop();
      });

    }

    /**
    * @name groupsSuccessFn
    * @desc Update groups array on view
    */
    function groupsSuccessFn(data, status, headers, config) {
      $scope.groups = data.data;
      console.log('data:', $scope.groups)
    }

    /**
    * @name groupsErrorFn
    * @desc Show error loading groups
    */
    function groupsErrorFn(data, status, headers, config) {}

    /**
    * @name createSuccessFn
    * @desc add newly created group to list
    */
    function createSuccessFn(data, status, headers, config) {
      console.log(data);
      $rootScope.$broadcast('group.created', data);
    }

    /**
    * @name createErrorFn
    * @desc Show error creating new group
    */
    function createErrorFn(data, status, headers, config) {
    console.log("Status: " + status + ", Data: " + data);
    }
  }
})();
