angular
  .module('turnos.group')
  .factory('Persons', Persons);

Groups.$inject = ['$http', 'djangoUrl', '$q'];

/**
* @namespace Groups
* @returns {Factory}
*/
function Persons($http, djangoUrl, $q) {
  'use strict';

  var Persons = {
    list : list
  };

  return Persons;

  function list() {
  //  return $http.get('/ccm/test/sys/group_list/')
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:person_listAPI'))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }
};
