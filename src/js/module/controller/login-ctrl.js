/**=========================================================
 * Module: src/js/module/controller/login-ctrl.js:25
 * 登录控制器
 * @author: haili042
 * @time: 2016年4月1日 12:45:09
 =========================================================*/

App.controller('LoginCtrl', ['$http', '$state', '$scope', '$rootScope', 'APP_AUTH',
    function($http, $state, $scope, $rootScope, APP_AUTH) {

        $scope.name = '';

        $scope.login = function () {
            var url = '',
                params = {
                    user: $scope.account.user,
                    psw: $scope.account.psw
                };

            // 测试用的
            if ($scope.account.remember) {
                $scope.authMsg = '帐号不存在';
                return false;
            }

            if ($scope.loginForm.$valid) { // 校验表单

                $rootScope.sessionInfo.user = $scope.account.user;

                $state.go('app.home');
                $http.post(url, params)
                    .then(function (res) {
                        // TODO ...
                    }, function () {
                        // 失败了..
                        // TODO ...
                        // 身份认证会影响整个应用, 所以需要广播事件
                        $rootScope.$broadcast(APP_AUTH.loginFailed);
                    });
            } else {
                $scope.loginForm.account_user.$dirty = true;
                $scope.loginForm.account_psw.$dirty = true;
            }

    };
}]);