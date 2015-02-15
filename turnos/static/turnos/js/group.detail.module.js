angular
  .module('turnos.group.detail', [
    'turnos.config',
    'turnos.group.detail.controllers',
    'turnos.group.detail.services',
    'ngCookies',
    'ui.bootstrap',
  ]).run(init);

  function init($http, $cookies){
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    console.log('csrftoken: ' + $cookies.csrftoken);
  };

angular
  .module('turnos.config', []);

angular
  .module('turnos.group.detail.controllers', []);

angular
  .module('turnos.group.detail.services', ['ng.django.urls',]);
