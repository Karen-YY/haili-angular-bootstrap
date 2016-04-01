/**=========================================================
 * Module: src/js/module/controller/sidebar-left-ctrl.js
 * 菜单控制器
 * @author: haili042
 * @time: 2016年4月1日 11:09:41
 =========================================================*/

App.controller('SideBarLeftCtrl', ['$http', '$scope', '$state', function ($http, $scope, $state) {

    var url = '/test/data/menu.json',
        params = {};
    $http.get(url, params)
        .then(function (res) {
            $scope.menuDate = res.data;
        });



}]);