angular
  .module('turnos.group')
  .controller('GroupMemberController', GroupMemberController)
  .controller('GroupRoleController', GroupRoleController);

GroupMemberController.$inject = ['$rootScope','$scope', '$log', 'groups', 'turns', 'members', '$modal'];
GroupRoleController.$inject = ['$rootScope','$scope', '$log', 'groups', 'turns', 'roles', 'Groups', '$modal'];

// List of months
var month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                    'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];


function GroupMemberController($rootScope, $scope, $log, group, turns, members, $modal){

  $scope.scheduleList = turns;
  $scope.memberList = members;
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  $scope.monthNames = [];

  if ($scope.scheduleList.length == 0){
    // Disable the turns menu dropdown by adding the class, disable
    $("#turns_menu").addClass("disabled")
  }

  for (i = 0; i<turns.length; i++){
    var date = new Date(turns[i].month)
    $scope.monthNames[i] = month_list[date.getMonth()];
  }

  // Initialize the new month Modal
  $scope.openNewMonth = function (size){

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/new_month.html/',
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
        templateUrl: '/ccm/modal/view/new_role.html/',
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

}


function GroupRoleController($rootScope, $scope, $log, groups, turns, roles, Groups, $modal){

  $scope.scheduleList = turns;
  $scope.roleList = roles;
  $scope.group_id = groups.data.id;
  $scope.group_name = groups.data.title;
  $scope.monthNames = [];

  if ($scope.scheduleList.length == 0){
    // Disable the turns menu dropdown by adding the class, disable
    $("#turns_menu").addClass("disabled")
  }

  for (i = 0; i<turns.length; i++){
    var date = new Date(turns[i].month)
    $scope.monthNames[i] = month_list[date.getMonth()];
  }

  // Initialize the new month Modal
  $scope.openNewMonth = function (size){

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/new_month.html/',
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
        templateUrl: '/ccm/modal/view/new_role.html/',
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

}
