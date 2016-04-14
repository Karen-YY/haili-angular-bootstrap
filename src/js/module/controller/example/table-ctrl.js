/**=========================================================
 * Module: src/js/module/controller/example/table-ctrl.js
 * table控制器
 * @author: haili042
 * @time: 2016年4月10日 22:54:16
 =========================================================*/

App
    .controller('TableCtrl', ['$http', '$scope', '$state', '$rootScope',
    function ($http, $scope, $state, $rootScope) {

        $scope.tableConfig = {
            checkbox: true,
            title: 'test table',
            border: true,
            pagination: true,
            url: '/test/data/table.json',
            queryParams: {
                name: 'xiaoming',
                age: '25'
            },
            columns: [
                {field:'productid',title:'Code',width:100},
                {field:'productname',title:'Name',width:100},
                {field:'unitcost',title:'Name',width:100},
                {field:'status',title:'Name',width:100},
                {field:'listprice',title:'Name',width:100},
                {field:'attr1',title:'Name',width:100},
                {field:'itemid',title:'Price',width:100,align:'right'}
            ],
            onLoadSuccess: function(data) {
            }
        };

    }])
;
