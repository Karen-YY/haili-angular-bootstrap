/**=========================================================
 * Module: login-ctrl.js
 * 登录控制器
 * @author: haili042
 =========================================================*/

App.controller('LoginCtrl', ['$http', '$state', '$scope', function($http, $state, $scope) {

    $scope.name = '';

    $scope.login = function () {
        var url = '',
            params = {};

        $scope.authMsg = '';

        if ($scope.loginForm.$valid) { // 校验表单
            $http.post(url, params)
                .then(function (res) {

                });
        }

    };
}]);