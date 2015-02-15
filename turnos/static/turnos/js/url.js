var url = angular.module('myURL', ['ng.django.urls','ngResource']);

url.factory('Department', ['$resource', 'djangoUrl',
    function($resource, djangoUrl){
      $resource(djangoUrl.reverse('ccm:department_list'), {'id':'@id', 'type':'department_list'});
    }
]);
