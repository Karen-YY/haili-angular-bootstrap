/**=========================================================
 * Module: src/js/module/controller/sidebar-left-ctrl.js
 * 菜单控制器
 * @author: haili042
 * @time: 2016年4月1日 11:09:41
 =========================================================*/

App.controller('HomeCtrl', ['$http', '$scope', '$state', '$rootScope', '$timeout', 'Utils',
    function ($http, $scope, $state, $rootScope, $timeout, Utils) {
        $scope.rowMessagerData = {
            title: 'row messager title',
            msg: 'row messager msg',
            icon: 'fa fa-cloud'
        };

    }]);