angular
 .module('turnos.group')
 .controller('DialogCtrl', DialogCtrl);


 DialogCtrl.$inject = ['$scope', '$modalInstance', 'message'];

 function DialogCtrl($scope, $modalInstance, message){
   $scope.msgHead = message.head;
   $scope.msgBody = message.msg;

   $scope.cancel = function(){
     $modalInstance.dismiss('cancel');
   }

   $scope.eliminate = function(){
     $modalInstance.close(true);
   }
 }
