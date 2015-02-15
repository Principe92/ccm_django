angular
  .module('turnos.group')
  .directive('groups', groups);

//  groups.$inject['djangoUrl'];

/**
* @namespace Group
*/
function groups(djangoUrl) {
  'use strict';
  /**
  * @name directive
  * @desc The directive to be returned
  * @memberOf turnos.group.directives.Group
  */
  var directive = {
    restrict: 'E',
    scope: {
      groups: '='
    },
    // templateUrl: djangoUrl.reverse('department_index')
    templateUrl: '/static/admin/html/group_list.html'
  };

  return directive;
};
