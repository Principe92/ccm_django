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
    list : list,
    newPerson : newPerson,
    newEventRole : newEventRole
  };

  return Persons;

  function list() {
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

  function newPerson(data){
    return $http.post(djangoUrl.reverse('ccm:person_listAPI'), data);
  }

  function newEventRole(person_pk, event_pk, data){
    console.log(data);
    console.log('Person: ' + person_pk);
    console.log('Event: ' + event_pk);
    return $http.post(djangoUrl.reverse('ccm:person_eventAPI', [person_pk, event_pk]), data);
  }
};
