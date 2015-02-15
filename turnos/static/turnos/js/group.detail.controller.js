/**
* GroupDetailController
* @namespace turnos.group.detail.controllers
*/
(function () {
  'use strict';

  angular
    .module('turnos.group.detail.controllers')
    .controller('GroupDetailController', GroupDetailController);

  GroupDetailController.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log'];

  /**
  * @namespace GroupDetailController
  */
  function GroupDetailController($rootScope, $scope, $http, Groups, $log) {
    var vm = this;

    // Default Form value
    var defaultForm = {
      month : "",
      observation : ""
    };

    $scope.show_monthForm = true;
    $scope.year = 2015;

    $scope.next_month = get_month;

    function get_month(){
      var m = new Date().getMonth() + 1;
      if (m > 12) m = 1;
      return m;
    }

    // List of months
    $scope.month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                        'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];


    $scope.today = function() {
    $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    // Initialize new Event variables
    $scope.show_eventForm = true;
    $scope.mytime = new Date();

    // Testing
    $scope.event_title = "Culto de ninos";
    $scope.event_id = 708;

    $scope.groups = [];

    activate();

    // Submit new month form
    $scope.submitMonthForm = function(pk){
      console.log('Create new month: ', $scope.new_month);
      var data = {month: parseInt($scope.new_month, 10), observation: $scope.observation};
      Groups.create(pk, data).then(createSuccessFn, createErrorFn);
    }

    // Clear new month form
    $scope.clearMonthForm = function(){
      //make the record pristine
      console.log('Clear new month form');
      $scope.newMonthForm.$setPristine();
      $scope.new_month = angular.copy(defaultForm);
      $scope.show_monthForm = true;
    }

    // Submit new event form
    $scope.submitEventForm = function(group, month){
      var data = {  title : $scope.event_title,
                    date : $scope.dt,
                    time : $scope.mytime,
                    id : $scope.event_id};
      console.log('id: ', data);
      Groups.create(group, month, data).then(createSuccessFn, createErrorFn);

    }

    // Clear new event form
    $scope.clearEventForm = function(){
      console.log('Clear new event form')
      // make the record pristine
      $scope.newEventForm.$setPristine();
      $scope.mytime = null;
      $scope.dt = null;
      $scope.event_title = angular.copy("");
    }

     /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.layout.controllers.IndexController
    */
    function activate() {
    //  Groups.all().then(groupsSuccessFn, groupsErrorFn);

    // Add class to month widget
    //$scope.new_month.month.addClass('')

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
      clear();
    //  $rootScope.$broadcast('group.created', data);
    }

    /**
    * @name createErrorFn
    * @desc Show error creating new group
    */
    function createErrorFn(data, status, headers, config) {
    console.log("Status: " + status + ", Data: " + data);
  //  $scope.new_month.month.addClass('has-error')
    }
  }
})();
