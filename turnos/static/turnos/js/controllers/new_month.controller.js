angular
  .module('turnos.group')
  .controller('new_roleCtrl', new_roleCtrl)
  .controller('new_monthCtrl', new_monthCtrl)
  .controller('new_eventCtrl', new_eventCtrl)
  .controller('new_groupCtrl', new_groupCtrl)
  .controller('DialogCtrl', DialogCtrl)
  .controller('person_roleCtrl', person_roleCtrl);


  new_monthCtrl.$inject = ['$scope', '$modalInstance', 'Groups', 'group_id'];
  new_roleCtrl.$inject = ['$scope', '$modalInstance', 'Groups', 'group_id'];
  new_eventCtrl.$inject = ['$scope', '$modalInstance', 'Groups', 'group_id', 'defForm', 'defLoad', 'calendar_id'];
  new_groupCtrl.$inject = ['$scope', '$modalInstance', 'Groups'];
  person_roleCtrl.$inject = ['$scope', '$modalInstance', 'Persons', 'roles', 'member'];
  DialogCtrl.$inject = ['$scope', '$modalInstance', 'message'];

  function DialogCtrl($scope, $modalInstance, message){
    $scope.msgHead = message.head;
    $scope.msgBody = message.msg;
    $scope.headVisible = true;
    $scope.bodyVisible = true;

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    }

    $scope.eliminate = function(){
      $modalInstance.close(true);
    }
  }

  function new_monthCtrl($scope, $modalInstance, Groups, group_id){
    /*$scope.next_month = get_month;

    function get_month(){
      var m = new Date().getMonth() + 1;
      if (m > 12) m = 1;
      return m;
    }*/

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

  function new_eventCtrl($scope, $modalInstance, Groups, group_id, defForm, defLoad, calendar_id){
    console.log(defForm);

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.today = function() {
      $scope.dt = new Date(); //$filter('date')(new Date(),$scope.format);
    };

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
    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    // Check if we are being called to update an event
    if (defLoad.update){
      $scope.event_title = defForm.title;
      $scope.event_id = defForm.number;
      $scope.dt = defForm.date;
      $scope.mytime = defForm.date;
    }
    else{
      $scope.mytime = new Date();
      $scope.today();
    }

    // Submit new event form
    $scope.submit = function(){
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

      Groups.newEvent(group_id, calendar_id, data).then(success, error);
    }

    // Clear new event form
    $scope.clean = function(){
      $modalInstance.dismiss('cancel');
    }

    function success(data, status, headers, config){
      console.log('New event created !!');
      $modalInstance.close(data);
    }

    function error(data, status, headers, config){
      console.log('Error creating new event')
    }
  }

  function new_groupCtrl($scope, $modalInstance, Groups){
    var defaultForm = {
      title : "",
      newRole_1 : "",
      newRole_2 : "",
      newRole_3 : ""
    };

    $scope.group_name = "Audio";

    // Submit a form
    $scope.submit = submit;
    $scope.cancel = cancel;

    function cancel(new_group){
      //make the record pristine
      $scope.groupForm.$setPristine();
      $scope.group_name = null;
      $scope.group_rol_1 = null;
      $scope.group_rol_2 = null;
      $scope.group_rol_3 = null;
      $modalInstance.dismiss('cancel');
    }



    function submit(){
    // $scope.closeDialog();
    var data = {
      'title' : $scope.group_name,
      'newRole_1' : $scope.group_rol_1,
      'newRole_2' : $scope.group_rol_2,
      'newRole_3' : $scope.group_rol_3
      }

      console.log('new department: ' , data);

      Groups.newGroup(data).then(success, error);
    }

     function success(data, status, headers, config){
      console.log('New group created !!');
      $modalInstance.close(data);
    }

    function error(data, status, headers, config){
      console.log('Error creating new group')
    }
  }

  function person_roleCtrl($scope, $modalInstance, Persons, roles, member){
    $scope.roleList = roles;
    $scope.member = member.person;

    // Load default values
    // loadDefault();

    // Save the new roles
    $scope.submit = function (){

      // If we changed something in the form
      if ($scope.mForm.$dirty && $scope.mForm.$valid){
        console.log('form is dirty');

        // Check which boxes were checked and add their ids to the list
        var roles = [];
        for (i = 0; i<$scope.roleList.length; i++){
          var id = $scope.roleList[i].id;

          if ($('#' + id).is(":checked")){
            roles.push(id);
          }
        }

        // submit the roles for saving
        if (roles.length != 0){
          data = {'roles': roles};
          Persons.newEventRole(member.person.id, member.event.id, data).then(success, error);
        }
        else{
          alert("Debes seleccionar un rol antes de guardar o haz clik en libre o no convocado");
        }

      }

      // We didn't change anything in the form, so just close
      else{
        $modalInstance.dismiss('cancel');
      }

    }

    // Cancel the modal
    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    }

    $scope.assigned = function(id){
        // Check if role is in the list of the roles of the member
        for (j = 0; j < member.event.roles.length; j++){
          console.log('Index: ' + j);
          var assigned = member.event.roles[j].id;

          if (assigned == id){
            // Role has been assigned to member
            return true;
          }
        }

        return false;
    }

    function success(data, status, headers, config){
     console.log('roles modified !!');
     $modalInstance.close(data);
    }

   function error(data, status, headers, config){
     console.log('Error modifying role !!')
   }
  }
