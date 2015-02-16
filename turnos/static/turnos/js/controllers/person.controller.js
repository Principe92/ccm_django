angular
  .module('turnos.group')
  .controller('PersonController', PersonController);

PersonController.$inject = ['$scope', 'persons'];


function PersonController($scope, persons){
  $scope.personList = persons;
}
