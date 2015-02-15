/**
* Departments
* @namespace turnos.group.services
*/
(function () {
  'use strict';

  angular
    .module('turnos.group.detail.services')
    .factory('Groups', Groups);

  Groups.$inject = ['$http', 'djangoUrl'];

  /**
  * @namespace Groups
  * @returns {Factory}
  */
  function Groups($http, djangoUrl) {

    var Groups = {
      all: all,
      create: create,
      get: get
    };

    return Groups;

    ////////////////////

    /**
    * @name all
    * @desc Get all Posts
    * @returns {Promise}
    * @memberOf turnos.group.services.Groups
    */
    function all() {
    //  return $http.get('/ccm/test/sys/group_list/')
      return $http.get(djangoUrl.reverse('ccm:group_listAPI'));
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf turnos.group.services.Groups
    */
    function create(group, content) {
      console.log(content);
      return $http.post(djangoUrl.reverse('ccm:group_turnView', [group]), content);
    }

    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf turnos.group.services.Groups
    */
    function create(group, month, content) {
      console.log('data', content);
      return $http.post(djangoUrl.reverse('ccm:group_turnView', [group, month]), content);
    }

    /**
     * @name get
     * @desc Get the Posts of a given user
     * @param {string} username The username to get Posts for
     * @returns {Promise}
     * @memberOf turnos.group.services.Groups
     */
    function get(group) {
    //  return $http.get('/ccm/test/sys/group_list/' + group_id);
    console.log('Over Here')
      return $http.get(djangoUrl.reverse('ccm:group_listAPI'), {pk:group});
    }
  }
})();
