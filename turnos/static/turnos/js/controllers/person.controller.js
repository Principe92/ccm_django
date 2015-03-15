angular
  .module('turnos.group')
  .controller('PersonController', PersonController)
  .controller('PersonCreateController', PersonCreateController);

PersonController.$inject = ['$scope', 'persons'];
PersonCreateController.$inject = ['$scope', 'groups', 'Persons', '$location'];


function PersonController($scope, persons){
  $scope.personList = persons;
}

function PersonCreateController($scope, groups, Persons, $location){
  $scope.groupList = groups;
  var goback = true;

  $scope.save = create;
  $scope.cancel = clear;
  $scope.saveNew = function(){
    goback = false;
    create();
  }

  // Test
  $scope.names = angular.copy("Oscar");
  $scope.first_surname = angular.copy("Malagon");

  function create(){

    var department = [];
    for (i = 0; i<$scope.groupList.length; i++){
      id = $scope.groupList[i].id;

      if ($('#' + id).is(":checked")){
        department.push(id)
      }
    }

    var data = {
      'name' : $scope.names,
      'first_surname' : $scope.first_surname,
      'second_surname' : $scope.second_surname,
      'email' : $scope.email,
      'address' : $scope.address,
      'pbox' : $scope.zip,
      'city' : $scope.city,
      'province' : $scope.province,
      'country' : $scope.country,
      'number' : $scope.number,
      'nationality' : $scope.nationality,
      'department' : department
    };

    console.log(data);
    Persons.newPerson(data).then(success, error);
  }

  function clear(){
    $location.path("/ccm/person");
  }

  function success(data, status, headers, config){
    console.log('successfully created a person');

    if (goback){
      $location.path("/ccm/person");
    } else{
      $scope.newGroupForm.$setPristine();
    }
  }

  function error(data, status, headers, config){
    console.log('error creating new person', data.error);
  }
}
