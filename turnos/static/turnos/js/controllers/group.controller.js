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
  $scope.month_list = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'July',
      'Agosto',
      'Septiembre',
      'Octobre',
      'Noviembre',
      'Diciembre'
  ];

  $scope.scheduleList = group.data.calendars;
  $scope.monthNames = [];
  $scope.group_id = group.data.id;
  $scope.group_name = group.data.title;
  $scope.memberList = group.data.members;
  $scope.roleList = roles;
  $scope.eventList = events;

  $scope.defEvent = {};
  $scope.update = {
    'update': false,
    'id': 0
  };

  // Create table object
  $scope.turnTable = [];
  formTable();

  $scope.calendar_id = $route.current.params.month;

  // Set current month
  for (i = 0; i<$scope.scheduleList.length; i++){
    if ($scope.scheduleList[i].id == $scope.calendar_id){
      $scope.currentMonth = getMonthName($scope.scheduleList[i].month);
      }
  }

  //$scope.empty = $scope.scheduleList.length == 0;

  // Initialize the new month Modal
  $scope.openNewMonth = function (size){

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/new_month.html/',
      controller: 'new_monthCtrl',
      backdrop: false, // Do not close window if you click outside it
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
      backdrop: false, // Do not close window if you click outside it
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
      templateUrl: '/ccm/modal/view/new_event.html/',
      controller: 'new_eventCtrl',
      backdrop: false, // Do not close window if you click outside it
      size : size,
      resolve: {
        group_id: function(){ return $scope.group_id; },
        defForm: function(){ return $scope.defEvent; },
        defLoad: function(){ return $scope.update; },
        calendar_id: function(){ return $scope.calendar_id; }
      }
    });

    instance.result.then(
      function(data){
        console.log(data.data);

        // Save new data
        if (!$scope.update.update){
          saveEvent(data.data);
        }

        else {
          var get_index = getEventIndexX(data.data.id);
          $scope.eventList[get_index] = data.data;
        }

        // Disable update
        $scope.update.update = false;
      },

      function (){
         $log.info('Modal dismissed at: ' + new Date());
         $scope.update.update = false;
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
      templateUrl: '/ccm/modal/view/person_role.html/',
      controller: 'person_roleCtrl',
      backdrop: false, // Do not close window if you click outside it
      resolve: {
        roles: function(){ return $scope.roleList; },

        member: function(){
          var member;
          var events;

          // Get the member
          for (i=0; i< $scope.memberList.length; i++){
            if (person_id == $scope.memberList[i].id){
              member = $scope.memberList[i];
            }
          }

          // Return an object
          return {
            'person': member,
            'event': getEvent(person_id, event_id)
          };
        }
      }
    });

    instance.result.then(
      function(data){
        console.log(data, person_id, event_id);
        saveRoles(data.data, person_id, event_id);
      },

      function (){}
    );
  };

  $scope.deleteEvent = function(event){
    var dom = event.currentTarget.id;


    // Find the event with the id
    for (i = 0; i < events.length; i++){
      if (dom == events[i].id){
        var mEvent = events[i];
      }
    }

    var number = mEvent.event_number.number;

    var instance = $modal.open({
      templateUrl: '/ccm/modal/view/dialog.html/',
      controller: 'DialogCtrl',
      backdrop: false, // Do not close window if you click outside it
      resolve: {
        message: function(){
          return {
            'head': "¿Eliminar evento " + number + "?",
            'msg': "Todos los roles de las personas convocadas serán eliminados"
          };
        }
      }
    });

    instance.result.then(
      function(){
        removeEvent(mEvent.id);

        Groups.delEvent(mEvent.id).then(delSuccess, delError);
      },

      function(){}
    );
  };

  $scope.modifyEvent = function(event){
    var dom = event.currentTarget.id;

    // Find the event with the id
    for (i = 0; i < events.length; i++){
      if (dom == events[i].id){
        $scope.defEvent = {
          'id': events[i].id,
          'date': events[i].date,
          'title': events[i].title,
          'number': events[i].event_number.number
        };
      }
    }

    $scope.update.update = true;
    $scope.update.id = dom;
    $scope.openNewEvent(); // Call the modal to that creates new events
  }

  for (i = 0; i<$scope.scheduleList.length; i++){
    $scope.monthNames[i] = getMonthName($scope.scheduleList[i].month);
  }

  if ($scope.scheduleList.length == 0){
    // Disable the turns menu dropdown by adding the class, disable
    $("#turns_menu").addClass("disable");
  }

  // move edit icon to right top if the member has some roles

  // $("#role_menu").addClass("event_menu_icon");

  //var csrftoken = $.cookie('csrftoken');

  // retrieves the month name of a date object
  function getMonthName(arg){
    var date = new Date(arg);
    return $scope.month_list[date.getMonth()];
  }

  function getEvent(person_id, event_id){
    for (i = 0; i<$scope.turnTable.length; i++){
      var person = $scope.turnTable[i];

      if (person.id == person_id){

        // Find the event and return its roles
        for (j = 0; j < person.events.length; j++){
          var arg = person.events[j];

          if (arg.id == event_id){
            return arg;
          }
        }
      }
    }
  }

  function formTable(){
    for (i = 0; i<$scope.memberList.length; i++){
      var person = $scope.memberList[i];

      var skeleton = {
        'id': person.id,
        'name': person.name,
        'first_surname': person.first_surname,
        'events': []
      };

      // Add roles for each event
      for (j = 0; j<events.length; j++){
        var arg = events[j];

        var sketch = {
          'id': arg.id,
          'number': arg.event_number.number,
          'title': arg.title,
          'date': arg.date,
          'roles': []
        };

        // Get the roles
        for (k = 0; k<arg.eventList.length; k++){
          var eventroles = arg.eventList[k];

          for (l = 0; l<eventroles.persons.length; l++){
            var member = eventroles.persons[l];

            // If member is in the role list, add the role to his list for the event
            if (member.id == person.id){
              sketch.roles.push({'id': eventroles.role.id, 'title': eventroles.role.title});
            }
          }
        }

        // Add an event to the members event list
        skeleton.events.push(sketch);
      }

      // Add person to turnTable
      $scope.turnTable.push(skeleton);
    }

    console.log($scope.turnTable);
  }

  function saveEvent(data){

    // Add it to eventList
    $scope.eventList.push(data);

    // Add new column to person row
    for (i = 0; i < $scope.turnTable.length; i++){
      var eventBody = {
        'id': data.id,
        'number': data.event_number.number,
        'title': data.title,
        'date': data.date,
        'roles': []
      };

      // Add a new event column to the member
      $scope.turnTable[i].events.push(eventBody);
    }
  }

  function saveRoles(data, person_id, event_id){
    var roles = [];
    var i = 0;
    for (i; i < data.length; i++){
      var rol = getRole(data[i].role);
      roles.push(rol);
    }

    console.log('New Roles: ', roles);
    console.log('id: ', data.length);

    person_index = getPersonIndex(person_id);
    event_index = getEventIndex(person_index, event_id);
    $scope.turnTable[person_index].events[event_index].roles = roles;
  }

  // Get the id and title of a role given its id
  function getRole(id){
    var i = 0;
    for(i = 0; i < roles.length; i++){
      if (id == roles[i].id){
        return {
          'id': roles[i].id,
          'title': roles[i].title
        };
      }
    }
  }

  // Get the index of a person from turnTable given its id
  function getPersonIndex(person_id){
    var i = 0;
    for(i = 0; i < $scope.turnTable.length; i++){
      if (person_id == $scope.turnTable[i].id){
        return i;
      }
    }
  }

  // Get the index of a person from turnTable given its id
  function getEventIndex(person_index, event_id){
    var i = 0;
    for(i = 0; i < $scope.turnTable[person_index].events.length; i++){
      if (event_id == $scope.turnTable[person_index].events[i].id){
        return i;
      }
    }
  }

  function getEventIndexX(event_id){
    var i = 0;
    for(i; i < $scope.eventList.length; i++){
      if (event_id == $scope.eventList[i].id){
        return i;
      }
    }
  }

  // Method to remove an event column with all roles in turnTable
  function removeEvent(event_id){
    // Remove event from turnTable
    var i = 0;
    for(i; i < $scope.turnTable.length; i++){
      // Find index of event array for each person
      var eventIndex = getEventIndex(i, event_id);

      // Delete event roles
      $scope.turnTable[i].events.splice(eventIndex, 1);
    }

    // Remove event
    i = 0;
    for(i; i < $scope.eventList.length; i++){
      if (event_id == $scope.eventList[i].id){
        $scope.eventList.splice(i, 1);
        i = $scope.eventList.length;
      }
    }
  }

  function delSuccess(data, status, headers, config){
    console.log('Successfully eliminated event');
  }

  function delError(data, status, headers, config){
    console.log('Error deleting event');
  }
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
      templateUrl: '/ccm/modal/view/new_group.html/',
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
