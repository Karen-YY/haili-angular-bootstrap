/**=========================================================
 * Module: src/js/module/service/user-auth.js
 * 用户权限service
 * @author: haili042
 * @time: 2016年4月1日 12:43:51
 =========================================================*/

App.service('UserAuthService', ['$http', 'SessionService', function($http, SessionService) {
    'use strict';

    this.login = function (credentials) {
        var url = '';
        return $http
            .post(url, credentials)
            .then(function(res) {
                //var id = res.data.id,
                //    userId = res.data.user.userId,
                //    userRole = res.data.user.userRole;
                //
                //SessionService.create(id, userId, userRole);
                //return user.data.user;
            })
    };

    // 检查是否有权限登录
    this.isAuthenticated = function () {
        return !!SessionService.userId;
    };

    this.isAuthorized = function (role) {

    };

}]);
