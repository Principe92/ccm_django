angular
  .module('turnos.group')
  .controller('GroupMemberController', GroupMemberController)
  .controller('GroupRoleController', GroupRoleController);

GroupMemberController.$inject = ['$rootScope','$scope', '$log', 'group', 'turns'];
GroupRoleController.$inject = ['$rootScope','$scope', '$log', 'group', 'turns'];

function GroupMemberController($rootScope, $scope, $log, group, turns){

  $scope.scheduleList = turns;
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  console.log('group', $scope.scheduleList);

}


function GroupRoleController($rootScope, $scope, $log, group, turns){

  $scope.scheduleList = turns;
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  console.log('group', $scope.scheduleList);

}
