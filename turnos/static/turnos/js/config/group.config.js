angular
  .module('turnos.group')
  .config(config);

  function config($locationProvider, $httpProvider, $interpolateProvider, $routeProvider){
    'use-strict';

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // Change content type for POST so Django gets correct request object
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';

    // Department List
    $routeProvider
        .when("/ccm/department/", {
          templateUrl: '/ccm/partial/view/group_main.html/',
          controller: 'GroupJSControl',
          resolve: {
            groupList : getGroupList
          }
        })

        .when("/ccm/department/:id/turns/:month/", {
          templateUrl: '/ccm/partial/view/group_detail.html/',
          controller: 'myGroupJSControl',
          resolve: {
          //  turns : getSchedules,
            group : getGroup,
          //  members : getMember,
            events : getEvents,
            roles : getRoles
          }
        })

        .when("/ccm/department/:id/members/", {
          templateUrl: '/ccm/partial/view/group_members.html/',
          controller: 'GroupMemberController',
          resolve: {
            turns : getSchedules,
            groups : getGroup,
            members : getMember
          }
        })

        .when("/ccm/department/:id/roles/", {
          templateUrl: '/ccm/partial/view/group_roles.html/',
          controller: 'GroupRoleController',
          resolve: {
            turns : getSchedules,
            groups : getGroup,
            roles : getRoles
          }
        })

        .when("/ccm/person/", {
          templateUrl: '/ccm/partial/view/person_main.html/',
          controller: 'PersonController',
          resolve: {
            persons : getPersons
          }
        })

        .when("/ccm/person/new", {
          templateUrl: '/ccm/partial/view/person_create.html',
          controller: 'PersonCreateController',
          resolve: {
            groups : getGroupList
          }
        })

        .when("/ccm/person/:id/details/", {
          templateUrl: '/ccm/partial/view/person_details.html/',
        })

        .otherwise({
          redirectTo: '/ccm/department/'
        })

    function getGroupList(Groups){
      var data = Groups.list();
      console.log('group list', data);
      return data;
    }

    function getSchedules($route, Groups){
      var groupID = $route.current.params.id
      var data = Groups.scheduleList(groupID);
      console.log('schedule list', data);
      return data;
    }

    function getRoles($route, Groups){
      var groupID = $route.current.params.id
      var data = Groups.roles(groupID);
      console.log('role list', data);
      return data;
    }

    function getEvents($route, Groups){
      var groupID = $route.current.params.id
      var calendarID = $route.current.params.month
      var data = Groups.eventList(groupID, calendarID);
      console.log('event list', data);
      return data;
    }

    function getMember($route, Groups){
      var groupID = $route.current.params.id
      var data = Groups.memberList(groupID);
      console.log('member list', data);
      return data;
    }

    function getGroup($route, Groups){
      var groupID = $route.current.params.id
      var data = Groups.get(groupID);
      console.log('group', data);
      return data;
    }

    function getPersons(Persons){
      var data = Persons.list();
      console.log('persons', data)
      return data;
    }
  }
