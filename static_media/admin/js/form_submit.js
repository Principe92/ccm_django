my_app.controller('NewMonthForm', function($scope, $http) {
    $scope.submit = function() {
        var in_data = { subject: $scope.subject };
        $http.post('/url/of/your/contact_form_view', in_data)
            .success(function(out_data) {
                // do something
            });
    }
});
