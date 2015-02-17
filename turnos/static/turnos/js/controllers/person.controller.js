angular
  .module('turnos.group')
  .controller('PersonController', PersonController)
  .controller('PersonCreateController', PersonCreateController);

PersonController.$inject = ['$scope', 'persons'];
PersonCreateController.$inject = ['$scope', 'groups'];


function PersonController($scope, persons){
  $scope.personList = persons;
}

function PersonCreateController($scope, groups){
  $scope.groupList = groups;

  $scope.submit = create;
  $scope.clean = clear;

  function create(){
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
      'nationality' : $scope.nationality
    };
  }

  function clear(){
    $scope.newPersonForm.$setPristine();

  }
}
