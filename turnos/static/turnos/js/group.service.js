angular
  .module('turnos.group')
  .factory('Groups', Groups);

Groups.$inject = ['$http', 'djangoUrl', '$q'];

/**
* @namespace Groups
* @returns {Factory}
*/
function Groups($http, djangoUrl, $q) {
  'use strict';

  var Groups = {
    all: all,
    create: create,
    get: get,
    list : list,
    scheduleList : getScheduleList,
    eventList : getEventList,
    memberList : getMemberList,
    roles : getRoles,
    newEvent : newEvent,
    newSchedule : newSchedule,
    newRole : newRole
  };

  return Groups;

  ////////////////////

  /**
  * @name all
  * @desc Get all Posts
  * @returns {Promise}
  * @memberOf turnos.group.services.Groups
  */

  function newRole(group_pk, data){
    return $http.post(djangoUrl.reverse('ccm:group_rolesAPI', [group_pk]), data);
  }

  function getRoles(group_pk){
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:group_rolesAPI', [group_pk]))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }

  function newEvent(group_pk, calendar_pk, data){
    console.log('group_pk: ' + group_pk);
    console.log('calendar_pk: ' + calendar_pk);
    console.log('data: ', data);
    return $http.post(djangoUrl.reverse('ccm:group_eventAPI', [group_pk, calendar_pk]), data);
  }

  function getEventList(group_pk, calendar_pk){
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:group_eventAPI', [group_pk, calendar_pk]))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }

  /**
   * Creates a new monthly turn for the department
   * @group_id - DB Primary Key of the department
   * @data - an array of key/value pairs
  */
  function newSchedule(group_pk, data) {
    console.log(data);
    return $http.post(djangoUrl.reverse('ccm:group_scheduleAPI', [group_pk]), data);
  }

  function getScheduleList(group_id){
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:group_scheduleAPI', [group_id]))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }

  function getMemberList(group_id){
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:group_memberListAPI', [group_id]))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }

  function all() {
  //  return $http.get('/ccm/test/sys/group_list/')
    return $http.get(djangoUrl.reverse('ccm:group_listAPI'));
  }

  function list() {
  //  return $http.get('/ccm/test/sys/group_list/')
    var defer = $q.defer()
    $http.get(djangoUrl.reverse('ccm:group_listAPI'))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }


  /**
  * @name create
  * @desc Create a new Post
  * @param {string} content The content of the new Post
  * @returns {Promise}
  * @memberOf turnos.group.services.Groups
  */
  function create(content) {
    var data = {title : content.title,
                newRole_1: content.newRole_1,
                newRole_2: content.newRole_2,
                newRole_3: content.newRole_3};

    return $http.post(djangoUrl.reverse('ccm:group_listAPI'), data);
  }

  /**
   * @name get
   * @desc Get the Posts of a given user
   * @param {string} username The username to get Posts for
   * @returns {Promise}
   * @memberOf turnos.group.services.Groups
   */
  function get(group_id) {
  //  return $http.get('/ccm/test/sys/group_list/' + group_id);
  //  return $http.get(djangoUrl.reverse('ccm:group_listAPI'), {pk:group_id});

    var defer = $q.defer()
    return $http.get(djangoUrl.reverse('ccm:group_detailAPI', [group_id]))
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        defer.reject(status);
      });
    return defer.promise;
  }
};
