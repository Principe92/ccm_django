angular
  .module('turnos.group')
  .controller('GroupJSControl', GroupJSControl)
  .controller('myGroupJSControl', myGroupJSControl);

GroupJSControl.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log', 'groupList'];
myGroupJSControl.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log',
  '$route', 'group', 'turns', 'members', '$filter'];


function myGroupJSControl($rootScope, $scope, $http, Groups, $log, $route, group, turns, members, $filter) {
  var vm = this;

  $scope.scheduleList = turns;
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  $scope.memberList = members;

  var calendar_id = $route.current.params.month

  //var csrftoken = $.cookie('csrftoken');

  // Default Form value
  var defaultForm = {
    month : "",
    observation : ""
  };

  $scope.show_monthForm = false;
  $scope.show_eventForm = false;
  $scope.year = new Date().getFullYear();

  $scope.next_month = get_month;

  function get_month(){
    var m = new Date().getMonth() + 1;
    if (m > 12) m = 1;
    return m;
  }

  // List of months
  $scope.month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                      'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];


  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.today = function() {
    $scope.dt = new Date(); //$filter('date')(new Date(),$scope.format);
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
    formatYear: 'yyyy',
    startingDay: 1,
    showWeeks: false
  };

  // Initialize new Event variables
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  // Testing
  $scope.event_title = "Culto de ninos";
  $scope.event_id = 708;

  $scope.groups = [];

  activate();

  // Submit new month form
  $scope.submitMonthForm = function(){
    var data = {month: parseInt($scope.new_month, 10), observation: $scope.observation};
    console.log('Create new month: ', data);
    Groups.newSchedule($scope.group_id, data).then(createSuccessFn, createErrorFn);
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
  $scope.submitEventForm = function(){
    var day = $scope.dt.getDate();
    var month = $scope.dt.getMonth() + 1;
    var year = $scope.dt.getFullYear();

    var hour = $scope.mytime.getHours();
    var minute = $scope.mytime.getMinutes();

    var data = {  day : day,
                  month : month,
                  year : year,
                  hour : hour,
                  minute : minute,
                  title : $scope.event_title,
                  id : parseInt($scope.event_id, 10)};
    Groups.newEvent($scope.group_id, calendar_id, data).then(createSuccessFn, createErrorFn);

  }

  // Clear new event form
  $scope.clearEventForm = nullEventForm;
  function nullEventForm(){
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
    nullEventForm();
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


/**
* @namespace GroupController
*/
function GroupJSControl($rootScope, $scope, $http, Groups, $log, groupList) {
  var vm = this;
  $scope.showMenu = false;

  var defaultForm = {
    title : "",
    newRole_1 : "",
    newRole_2 : "",
    newRole_3 : ""
  };

  $scope.groups = groupList;

  console.log(groupList);

//  activate();

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
};