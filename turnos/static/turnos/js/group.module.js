angular.module('turnos.group', [
    'ng.django.urls', 'ngRoute', 'ngCookies', 'ngDialog', 'ui.bootstrap'
  ]).run(init);

function init($http, $cookies){
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  
  console.log('csrftoken: ' + $cookies.csrftoken);
};
