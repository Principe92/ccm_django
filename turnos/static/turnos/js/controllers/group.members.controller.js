angular
  .module('turnos.group')
  .controller('GroupMemberController', GroupMemberController)
  .controller('GroupRoleController', GroupRoleController);

GroupMemberController.$inject = ['$rootScope','$scope', '$log', 'groups', 'turns', 'members'];
GroupRoleController.$inject = ['$rootScope','$scope', '$log', 'groups', 'turns', 'roles', 'Groups'];

// List of months
var month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                    'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];


function GroupMemberController($rootScope, $scope, $log, group, turns, members){

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

}


function GroupRoleController($rootScope, $scope, $log, groups, turns, roles, Groups){

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
}
