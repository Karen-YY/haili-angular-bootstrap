/**=========================================================
 * Module: src/js/module/controller/example/tree-ctrl.js
 * tree 控制器
 * @author: haili042
 * @time: 2016年4月13日 15:13:46
 =========================================================*/

App
    .controller('TreeCtrl', ['$http', '$scope', '$state', '$rootScope',
    function ($http, $scope, $state, $rootScope) {

        $scope.tableConfig = {
            url: '/test/data/tree.json'
        };


    }])
;
