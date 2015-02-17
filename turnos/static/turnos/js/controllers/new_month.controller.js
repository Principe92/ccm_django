angular
  .module('turnos.group')
  .controller('new_roleCtrl', new_roleCtrl)
  .controller('new_monthCtrl', new_monthCtrl);

  new_monthCtrl.$inject = ['$scope', '$modalInstance', 'Groups', 'group_id'];
  new_roleCtrl.$inject = ['$scope', '$modalInstance', 'Groups', 'group_id'];

  function new_monthCtrl($scope, $modalInstance, Groups, group_id){
    // List of months
    $scope.month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'July',
                        'Agosto', 'Septiembre', 'Octobre', 'Noviembre', 'Diciembre'];

    // Set the year on the form
    $scope.year = new Date().getFullYear();

    // Submit new month form
    $scope.submit = function(){
      var data = {month: parseInt($scope.new_month, 10), observation: $scope.observation};
      console.log('Create new month: ', data);
      Groups.newSchedule(group_id, data).then(success, error);
    }

    // Clear new month form
    $scope.clean = function(){
      $modalInstance.dismiss('cancel');
    }

    function success(data, status, headers, config) {
      console.log('New schedule created');
      $modalInstance.close(data);
    }

    function error(data, status, headers, config) {
      console.log('Error creating new schedule');
    }
  }

  function new_roleCtrl($scope, $modalInstance, Groups, group_id){

    $scope.clean = function(){
      $modalInstance.dismiss('cancel');
    }

    $scope.submit = function(){
      var data = {
        'department' : group_id,
        'title' : $scope.role_title
      }

      Groups.newRole(group_id, data).then(success, error);
    }

    function success(data, status, headers, config){
      console.log('New role created !!');
      $modalInstance.close(data);
    }

    function error(data, status, headers, config){
      console.log('Error creating new role')
    }
  }
