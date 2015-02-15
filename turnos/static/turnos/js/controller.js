var app = angular.module('myApp', ['ng.django.urls', 'turnos.group','ngCookies']).run(function($http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
});

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

app.controller ('AppController', ['$scope', '$http', 'djangoUrl',function($scope, $http, djangoUrl){
    $scope.departments = []

    $http.get(djangoUrl.reverse('ccm:department_list')).success(function(data){
      $scope.departments = data;
    })

    $scope.save = function() {
      var data = {group: $scope.new_group.title}
        $http.post(djangoUrl.reverse('department_index'), data)
            .success(function(out_data) {
                // do something
            });
          }
  }
]);
