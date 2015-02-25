angular
  .module('turnos.group')
  .controller('GroupJSControl', GroupJSControl)
  .controller('myGroupJSControl', myGroupJSControl);

GroupJSControl.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log', 'groupList', '$modal'];
myGroupJSControl.$inject = ['$rootScope','$scope', '$http', 'Groups', '$log',
  '$route', 'group', '$filter', 'roles', '$modal', 'events'];


function myGroupJSControl($rootScope, $scope, $http, Groups, $log,
  $route, group, $filter, roles, $modal, events) {

  var vm = this;

  // List of months
  $scope.month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                      'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];

  $scope.scheduleList = group.data.calendars;
  $scope.monthNames = [];
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  $scope.memberList = group.data.members;
  $scope.roleList = roles;
  $scope.eventList = events;
  var calendar_id = $route.current.params.month

  //$scope.empty = $scope.scheduleList.length == 0;

  // Initialize the new month Modal
  $scope.openNewMonth = function (size){

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/new_month.html',
      controller: 'new_monthCtrl',
      size : size,
      resolve: {
        group_id: function () {
          return $scope.group_id;
        }
      }
    });

    instance.result.then(
      function(data){
      },

      function (){
         $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // Initialize the new role Modal
    $scope.openNewRole = function (size){

      var instance = $modal.open({
        templateUrl: '/ccm/modal/view/new_role.html',
        controller: 'new_roleCtrl',
        size : size,
        resolve: {
          group_id: function () {
            return $scope.group_id;
          }
        }
      });

      instance.result.then(
        function(data){
        },

        function (){
           $log.info('Modal dismissed at: ' + new Date());
        });
      };

      // Initialize the new event Modal
      $scope.openNewEvent = function (size){

        var instance = $modal.open({
          templateUrl: '/ccm/modal/view/new_event.html',
          controller: 'new_eventCtrl',
          size : size,
          resolve: {
            group_id: function(){ return $scope.group_id; },

            calendar_id: function(){ return $scope.calendar_id; }
          }
        });

        instance.result.then(
          function(data){
          },

          function (){
             $log.info('Modal dismissed at: ' + new Date());
          });
        };

        // Initialize the new event Modal
        $scope.modifyRole = function(event){
          var dom = event.currentTarget.id;

          // Split dom to extract ids
          var split = dom.split("_");
          var person_id = parseInt(split[1], 10);
          var event_id = parseInt(split[3], 10);

          var instance = $modal.open({
            templateUrl: '/ccm/modal/view/person_role.html',
            controller: 'person_roleCtrl',
            resolve: {
              roles: function(){ return $scope.roleList; },

              member: function(){
                for (i=0; i< $scope.memberList.length; i++){
                  if (person_id == $scope.memberList[i].id){
                    return $scope.memberList[i];
                  }
                }
            }
          }
          });

          instance.result.then(
            function(data){
            },

            function (){
               $log.info('Modal dismissed at: ' + new Date());
            });
          };

  for (i = 0; i<$scope.scheduleList.length; i++){
    var date = new Date($scope.scheduleList[i].month)
    $scope.monthNames[i] = $scope.month_list[date.getMonth()];
  }

  if ($scope.scheduleList.length == 0){
    // Disable the turns menu dropdown by adding the class, disable
    $("#turns_menu").addClass("disable");
  }

  // move edit icon to right top if the member has some roles

  // $("#role_menu").addClass("event_menu_icon");

  //var csrftoken = $.cookie('csrftoken');
}


/**
* @namespace GroupController
*/
function GroupJSControl($rootScope, $scope, $http, Groups, $log, groupList, $modal) {
  var vm = this;

  $scope.groups = groupList;

  // Initialize the new month Modal
  $scope.openNewGroup = function (size){

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/new_group.html',
      controller: 'new_groupCtrl',
      size : size
    });

    instance.result.then(
      function(data){
        $scope.groups.push(data.data);
      },

      function (){
         $log.info('Modal dismissed at: ' + new Date());
      });
    };

  console.log(groupList);
};
